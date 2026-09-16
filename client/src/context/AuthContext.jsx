import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { if (!localStorage.getItem('fastway_token')) return setLoading(false); api.get('/auth/me').then(({ data }) => setUser(data.user)).catch(() => localStorage.removeItem('fastway_token')).finally(() => setLoading(false)); }, []);
  const login = async (credentials) => { const { data } = await api.post('/auth/login', credentials); localStorage.setItem('fastway_token', data.token); setUser(data.user); return data.user; };
  const register = async (details) => { const { data } = await api.post('/auth/register', details); localStorage.setItem('fastway_token', data.token); setUser(data.user); return data.user; };
  const logout = () => { localStorage.removeItem('fastway_token'); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
