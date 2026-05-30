import React, { useContext, Suspense, lazy } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const List = lazy(() => import('./pages/List'));
const Details = lazy(() => import('./pages/Details'));
const About = lazy(() => import('./pages/About'));
const Favorites = lazy(() => import('./pages/Favorites'));

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <nav>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        <NavLink to="/list" className={({ isActive }) => (isActive ? 'active' : '')}>List</NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>
        <NavLink to="/favourites" className={({ isActive }) => (isActive ? 'active' : '')}>Favorites</NavLink>
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'dark' : 'light'} theme
        </button>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/list/:id" element={<Details />} />
          <Route path="/about" element={<About />} />
          <Route path="/favourites" element={<Favorites />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;