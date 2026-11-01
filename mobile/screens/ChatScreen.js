import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../AuthContext';
import { api } from '../api';

export default function ChatScreen({ route }) {
  const { user } = useAuth();
  const { other, label } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const pollRef = useRef(null);

  const load = useCallback(async () => {
    if (!user) return;
    try {
      const data = await api(`/api/chat?me=${encodeURIComponent(user.id)}&other=${encodeURIComponent(other)}`);
      setMessages(data?.messages || []);
    } catch (e) {
      console.warn(e.message);
    }
  }, [user, other]);

  useEffect(() => {
    load();
    pollRef.current = setInterval(load, 3000);
    return () => clearInterval(pollRef.current);
  }, [load]);

  const send = async () => {
    if (!text.trim() || sending) return;
    setSending(true);
    try {
      await api('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ fromId: user.id, toId: other, text: text.trim() }),
      });
      setText('');
      await load();
    } catch (e) {
      console.warn(e.message);
    } finally {
      setSending(false);
    }
  };

  const renderItem = ({ item }) => {
    const mine = item.fromId === user.id;
    return (
      <View style={[styles.bubble, mine ? styles.mine : styles.theirs]}>
        <Text style={mine ? styles.mineText : styles.theirsText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
      <View style={styles.header}>
        <Text style={styles.title}>{label || other}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={renderItem}
        inverted={false}
        contentContainerStyle={{ padding: 12 }}
      />
      <View style={styles.inputRow}>
        <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="Сообщение" />
        <TouchableOpacity style={styles.sendBtn} onPress={send} disabled={sending}>
          <Text style={styles.sendText}>{sending ? '...' : '➤'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontSize: 18, fontWeight: 'bold' },
  bubble: { maxWidth: '75%', padding: 10, borderRadius: 12, marginVertical: 4 },
  mine: { alignSelf: 'flex-end', backgroundColor: '#007aff' },
  theirs: { alignSelf: 'flex-start', backgroundColor: '#e5e5ea' },
  mineText: { color: '#fff' },
  theirsText: { color: '#000' },
  inputRow: { flexDirection: 'row', padding: 8, borderTopWidth: 1, borderColor: '#eee' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8 },
  sendBtn: { marginLeft: 8, justifyContent: 'center', paddingHorizontal: 12 },
  sendText: { fontSize: 22, color: '#007aff' },
});