import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../AuthContext';

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [id, setId] = useState('');
  const [label, setLabel] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    try {
      await register(id.trim(), label.trim(), password);
    } catch (e) {
      Alert.alert('Ошибка', e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>
      <TextInput style={styles.input} placeholder="User ID (3-20 латиница/цифры)" value={id} onChangeText={setId} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Имя" value={label} onChangeText={setLabel} />
      <TextInput style={styles.input} placeholder="Пароль" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title={busy ? 'Создаём...' : 'Зарегистрироваться'} onPress={submit} disabled={busy} />
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Уже есть аккаунт? Войти</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 },
  link: { color: 'blue', marginTop: 16, textAlign: 'center' },
});
}