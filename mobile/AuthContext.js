import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, setToken, setUser, getUser, clearSession } from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const storedUser = await getUser();
        if (storedUser) setUserState(storedUser);
      } catch (e) {}
      setLoading(false);
    })();
  }, []);

  const login = async (id, password) => {
    const data = await api('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ id, password }),
    });
    await setToken(data.token);
    await setUser(data.user);
    setUserState(data.user);
    return data.user;
  };

  const register = async (id, label, password) => {
    const data = await api('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ id, label, password }),
    });
    await setToken(data.token);
    await setUser(data.user);
    setUserState(data.user);
    return data.user;
  };

  const logout = async () => {
    await clearSession();
    setUserState(null);
  };

  const updateProfile = async (label, about, avatarData) => {
    const data = await api('/api/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify({ label, about, avatarData }),
    });
    await setUser(data.user);
    setUserState(data.user);
    return data.user;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
}