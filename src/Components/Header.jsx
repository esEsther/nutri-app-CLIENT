
import { NavLink, useLocation } from 'react-router-dom';
import { userAuth } from '../hooks/userAuth';

export const Header = () => {

  const location = useLocation();
  const {logoutUser} = userAuth()
  

  // Determinar tipo de menú
  let menu = 'inicio';
  if (location.pathname.startsWith('inicio')) {
    menu = 'inicio';
  }else if (location.pathname.startsWith('/auth')) {
    menu = 'auth';
  }else if (location.pathname.startsWith('/user')) {
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
        {menu === 'inicio' || menu === 'auth' && (
          <>
            <NavLink to="/inicio">Inicio</NavLink>
            <NavLink to="/auth/login">Login</NavLink>
            <NavLink to="/auth/register">Registro</NavLink>
          </>
        )}

        {menu === 'user' && (
          <>
            <NavLink to="/user/buscarArticulo">Buscar Artículo</NavLink>
            <NavLink to="/user/favoritos">Favoritos</NavLink>
            <NavLink to="/inicio" onClick={handleLogOut}>Log Out</NavLink>
          </>
        )}

        
        {menu === 'admin' && (
          <>
            <NavLink to="/admin/todosLosArticulos">Todos los artículos</NavLink>
            <NavLink to="/admin/anadirArticulo">Crear Artículo</NavLink>
            <NavLink to="/inicio" onClick={handleLogOut}>Log Out</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};
