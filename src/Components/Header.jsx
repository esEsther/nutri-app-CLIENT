
import { NavLink, useLocation } from 'react-router-dom';
import { userAuth } from '../hooks/userAuth';
import { useState } from 'react';
// import './Css/Header.css'

export const Header = () => {

  const location = useLocation();
  const {logoutUser} = userAuth()
  const {getRol} = userAuth()
  const rol = getRol()
  
  let menu = 'public'
  
  if (rol===1) {
    menu = 'user';
  } else if (rol===2) {
  menu = 'admin'
  }  else if (rol === null) {
    menu = 'public'
  }

  const handleLogOut = () => {
    logoutUser()
  }
  
  return (
    <header>
      <p>Nutri App</p>
      <nav>
      

        { menu === 'user' && (
          <>
            <NavLink to="/user/buscarArticulo">Artículos</NavLink>
            <NavLink to="/user/favoritos">Artículos Favoritos</NavLink>
            <NavLink to="/user/buscarRecetas">Recetas</NavLink>
            <NavLink to="/user/recetasFavoritas">Recetas Favoritas</NavLink>
            <NavLink to="/" onClick={handleLogOut}>Log Out</NavLink>
          </>
        )}
        
        {menu === 'admin' && (
          <>
            <NavLink to="/admin/todosLosArticulos" state={{ reset: true }}>Todos los artículos</NavLink>
            <NavLink to="/admin/anadirArticulo">Crear Artículo</NavLink>
            <NavLink to="/admin/todosLosUsuarios">Todos los Usuarios</NavLink>
            <NavLink to="/admin/crearUsuario">Crear Usuario</NavLink>
            <NavLink to="/" onClick={handleLogOut}>Log Out</NavLink>
            

          </>
        )}
        {menu === 'public' && (
          <>
            <NavLink to="/"end >Inicio</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Registro</NavLink>
          </>
        )}

      </nav>
    </header>

  );
};
