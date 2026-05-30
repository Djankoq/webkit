import React, { useContext, Suspense, lazy } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';
import { AuthContext } from './context/AuthContext';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const List = lazy(() => import('./pages/List'));
const Details = lazy(() => import('./pages/Details'));
const About = lazy(() => import('./pages/About'));
const Favorites = lazy(() => import('./pages/Favorites'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`App ${theme}`}>
      {!isOnline && <div className="offline-status">You are offline</div>}
      <nav>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        <NavLink to="/list" className={({ isActive }) => (isActive ? 'active' : '')}>List</NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>
        {isAuthenticated && (
          <NavLink to="/favourites" className={({ isActive }) => (isActive ? 'active' : '')}>Favorites</NavLink>
        )}
        
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          {isAuthenticated ? (
            <>
              <span style={{ marginRight: '1rem' }}>Welcome, {user?.name}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink>
          )}
          <button onClick={toggleTheme} style={{ marginLeft: '1rem' }}>
            Switch to {theme === 'light' ? 'dark' : 'light'} theme
          </button>
        </div>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/about" element={<About />} />
          <Route path="/list/:id" element={
            <ProtectedRoute>
              <Details />
            </ProtectedRoute>
          } />
          <Route path="/favourites" element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          } />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;