// import React from 'react'
import { userAuth } from '../hooks/userAuth'
import {Navigate} from 'react-router-dom'

export const Proteccion = ({children, rol}) => {
    const {token, getRol} = userAuth()
    if (!token) {
       return <Navigate to="/auth/login" replace />;
    }
    
    if (rol) {
    const userRol = getRol(); // 'user' o 'admin'
    if (userRol !== rol) {
      // Opcional: podrías redirigir según rol
      return <Navigate to="/" replace />;
    }
  }

  // si todo va bien, renderiza hijos
  return children;
}
