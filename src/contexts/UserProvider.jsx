import { useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'
import {useNavigate} from 'react-router-dom'

/**
 * Proveedor de contexto para la gestión global del usuario y autenticación.
 * * Este componente envuelve la aplicación y proporciona un estado centralizado
 * para el token de sesión y los datos del usuario, manejando la persistencia
 * mediante cookies y la validación de expiración del token JWT.
 * * @component
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto.
 */
export const UserProvider = ({ children }) => {
    const [token, setToken] = useState( Cookies.get('miCookie') || null);
    const [user, setUser] = useState(null);
    const urlBase = import.meta.env.VITE_BACKEND_URL
   
    /**
     * Efecto para la validación automática de la sesión al cargar la app.
     * * Si existe un token pero no hay usuario en el estado:
     * 1. Decodifica el token.
     * 2. Comprueba si el token ha expirado.
     * 3. Si es válido, reconstruye el estado del usuario.
     * 4. Si ha expirado, cierra la sesión automáticamente.
     */
    useEffect(() => {
      if (token && !user) { // solo decodifica si user es null
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser(decoded);
        }
      }
    }, [token, user]);

    const login = (userDatos, token) =>{
      console.log(userDatos)
      //console.log(token)
      setUser(userDatos);
      setToken(token);
      Cookies.set('miCookie', token, { expires: 1, path: '/' });
    };

    const register = (userDatos, token) =>{
      setUser(userDatos);
      setToken(token);
      Cookies.set('miCookie', token, { expires: 1, path: '/' });
    }
    const logout = () =>{
      setUser(null)
      setToken(null)
      Cookies.remove('miCookie');
    }

  return (
    
    <UserContext.Provider value={{user, token, login, register, logout, urlBase}}>
        {children}
    </UserContext.Provider>
  )
}
