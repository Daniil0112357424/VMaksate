import React, { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatListScreen from './screens/ChatListScreen';
import ChatScreen from './screens/ChatScreen';

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}

function Root() {
  const { user, loading } = useAuth();
  const [screen, setScreen] = useState('login');
  const [chatParams, setChatParams] = useState(null);

  if (loading) return null;

  if (!user) {
    if (screen === 'register') return <RegisterScreen onBack={() => setScreen('login')} />;
    return <LoginScreen onRegister={() => setScreen('register')} />;
  }

  if (chatParams) {
    return <ChatScreen route={{ params: chatParams }} onBack={() => setChatParams(null)} />;
  }

  return <ChatListScreen onOpenChat={(other, label) => setChatParams({ other, label })} />;
}