import { NavLink } from 'react-router-dom';
import { userAuth } from '../hooks/userAuth';
import { useState } from 'react';
import './Css/Header.css';

export const Header = () => {
  const { logoutUser, getRol } = userAuth();
  const rol = getRol();
  const [menuOpen, setMenuOpen] = useState(false);

  let menu = 'public';
  if (rol === 1) menu = 'user';
  if (rol === 2) menu = 'admin';

  const handleLogOut = () => {
    logoutUser()
  }

  return (
    <header className="header">
      <div className="header-logo">Nutri App</div>

      <button
        className="header-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
        {menu === 'user' && (
          <>
            <NavLink to="/user/buscarArticulo">Artículos</NavLink>
            <NavLink to="/user/favoritos">Favoritos Favoritos</NavLink>
            <NavLink to="/user/buscarRecetas">Recetas</NavLink>
            <NavLink to="/user/recetasFavoritas">Recetas Favoritas</NavLink>
            <NavLink to="/" onClick={handleLogOut}>Log Out</NavLink>
          </>
        )}

        {menu === 'admin' && (
          <>
            <NavLink to="/admin/todosLosArticulos">Artículos</NavLink>
            <NavLink to="/admin/anadirArticulo">Crear Artículo</NavLink>
            <NavLink to="/admin/todosLosUsuarios">Usuarios</NavLink>
            <NavLink to="/admin/crearUsuario">Crear Usuario</NavLink>
            <NavLink to="/" onClick={handleLogOut}>Log Out</NavLink>
          </>
        )}

        {menu === 'public' && (
          <>
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Registro</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};
