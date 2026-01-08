
import { NavLink, useLocation } from 'react-router-dom';
import { userAuth } from '../hooks/userAuth';
import { useState } from 'react';

export const Header = () => {

  const location = useLocation();
  const {logoutUser} = userAuth()

  console.log({location})
  
  let menu = 'public'
  
  if (location.pathname.startsWith('/user')) {
    menu = 'user';
  } else if (location.pathname.startsWith('/admin')) {
    menu = 'admin'
  }  


  const handleLogOut = () => {
    logoutUser()
    
  }
  

  return (
    <header>
      <nav>
      

        { menu === 'user' && (
          <>
            <NavLink to="/user/buscarArticulo">Buscar Artículo</NavLink>
            <NavLink to="/user/favoritos">Favoritos</NavLink>
            <NavLink to="/" onClick={handleLogOut}>Log Out</NavLink>
          </>
        )}
        
        {menu === 'admin' && (
          <>
            <NavLink to="/admin/todosLosArticulos">Todos los artículos</NavLink>
            <NavLink to="/admin/anadirArticulo">Crear Artículo</NavLink>
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
