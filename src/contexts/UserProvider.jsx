import { useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState( Cookies.get('miCookie') || null);
    const [user, setUser] = useState(null);
    
    // useEffect(() => {
    //   if (token) {
    //     const decoded = jwtDecode(token);

    //     if (decoded.exp * 1000 < Date.now()) {
    //       logout();
    //     } else {
    //       setUser(decoded);
    //     }
    //   }
    // }, [token]);
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
      //localStorage.setItem("token", token);
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
    
    <UserContext.Provider value={{user, token, login, register, logout}}>
        {children}
    </UserContext.Provider>
  )
}
