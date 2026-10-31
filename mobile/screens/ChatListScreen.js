import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { useAuth } from '../AuthContext';
import { api } from '../api';

export default function ChatListScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await api(`/api/users?me=${encodeURIComponent(user.id)}`);
      setChats(data || []);
    } catch (e) {
      console.warn(e.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { load(); }, [load]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Чаты</Text>
        <TouchableOpacity onPress={logout}><Text style={styles.logout}>Выйти</Text></TouchableOpacity>
      </View>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Chat', { other: item.id, label: item.label })}>
            <Text style={styles.name}>{item.label || item.id}</Text>
            {item.lastMessage ? <Text style={styles.preview} numberOfLines={1}>{item.lastMessage.text}</Text> : null}
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Нет диалогов. Найдите пользователей через поиск.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontSize: 20, fontWeight: 'bold' },
  logout: { color: 'red' },
  row: { padding: 16, borderBottomWidth: 1, borderColor: '#f2f2f2' },
  name: { fontSize: 16, fontWeight: '600' },
  preview: { color: '#666', marginTop: 4 },
  empty: { textAlign: 'center', marginTop: 32, color: '#999' },
});
}