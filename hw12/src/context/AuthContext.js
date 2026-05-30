import React, { createContext, useState, useCallback, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const login = useCallback(async (email, password) => {
    // Имитация запроса к API
    if (email === 'test@example.com' && password === 'password') {
      const fakeToken = 'jwt-token-string-12345';
      const fakeUser = { email: 'test@example.com', name: 'Test User' };
      
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user', JSON.stringify(fakeUser));
      setToken(fakeToken);
      setUser(fakeUser);
      return Promise.resolve();
    }
    return Promise.reject(new Error('Invalid email or password'));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }, []);

  // Проверка токена при загрузке (в реальном приложении здесь была бы валидация на сервере)
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  const value = { token, user, login, logout, isAuthenticated: !!token };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};