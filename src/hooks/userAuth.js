import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import conectar from "../helpers/fetch"
import {jwtDecode} from "jwt-decode"




export const userAuth = () => {

    const {login, register, logout, user, token, urlBase} = useContext(UserContext)
    const [error, setError] =useState(null)
    

    const loginUser = async(datos) => {
        console.log(datos)
        const usuario = await conectar(`${urlBase}/login`, 'POST', datos)
        console.log(usuario)
        const {usuario: user, token, ok} = usuario

        if (ok) {
            login(user, token)
            return { usuario: user, token, ok : true };
        } else {
            const errors = usuario.errors || usuario
            setError(errors)
            return { ok: false, errors };
        }

    }

    const registerUser = async(datos) => {
        console.log(datos, 'datos desde registerUser en el hook user Auth')
        const usuario = await conectar(`${urlBase}/signup`, 'POST', datos)
        console.log(usuario, 'usuario desde register hook')
        const {user, token, ok} = usuario

        if (ok) {
            register(user,token)
            return {token}
        } else {
            const errors = usuario.errors || usuario
            setError(errors)
        }
        }
    

    
    const logoutUser = () =>{
        logout();
    }
    const getRol = () =>{
        // const { rol } = jwtDecode(token)
        // console.log('este es el rol:', rol)
        // return rol
         if (!token) return null;
        try {
            const decoded = jwtDecode(token);
            return decoded?.rol || null;
        } catch (error) {
            console.error('Error decodificando token:', error);
            return null;
        }
    }

 
 



  return {
    loginUser,
    registerUser,
    logoutUser,
    user,
    error,
    getRol,
    token
    }
}


   