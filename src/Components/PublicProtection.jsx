// import React from 'react'
import { userAuth } from '../hooks/userAuth'
import {Navigate} from 'react-router-dom'

/**
 * Componente de Orden Superior (HOC) para la protección de rutas.
 * * Verifica la existencia de una sesión activa (token) y, opcionalmente, 
 * valida si el rol del usuario coincide con el nivel de acceso requerido.
 * * @component
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes o páginas que se desean proteger.
 * @param {string} rol - Rol específico requerido para acceder (ej. 'admin' o 'user').
 * * @example
 * // Protege una ruta para que solo administradores entren
 * <Proteccion rol="admin">
 * <AdminDashboard />
 * </Proteccion>
 */
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
