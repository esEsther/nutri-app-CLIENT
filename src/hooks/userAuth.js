import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import conectar from "../helpers/fetch"
import {jwtDecode} from "jwt-decode"
import { useNavigate } from "react-router-dom"

/**
 * Hook personalizado para gestionar la lógica de autenticación.
 * * Este hook actúa como intermediario entre los componentes y el {@link UserContext}.
 * Centraliza las llamadas a la API para login, registro y la gestión del token JWT.
 * * @kind function
 * @returns {Object} Un objeto con métodos y estados de autenticación.
 * @property {Function} loginUser - Función para iniciar sesión.
 * @property {Function} registerUser - Función para registrar un nuevo usuario.
 * @property {Function} logoutUser - Función para cerrar la sesión.
 * @property {Function} getRol - Obtiene el rol decodificado del token actual.
 * @property {Object|null} user - Datos del usuario autenticado.
 * @property {string|null} token - Token JWT de la sesión activa.
 * @property {Object|string|null} error - Estado de errores de las peticiones.
 */
export const userAuth = () => {

    const {login, register, logout, user, token, urlBase} = useContext(UserContext)
    const [error, setError] =useState(null)
    const navigate = useNavigate()
    
    /**
     * Realiza la petición de inicio de sesión.
     * * @async
     * @param {Object} datos - Credenciales del usuario (email y contrasenia).
     * @returns {Promise<Object>} Resultado de la operación con el usuario, token y estado 'ok'.
     */
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

    /**
     * Registra un nuevo usuario en el sistema.
     * * @async
     * @param {Object} datos - Datos del nuevo usuario (nombre, email, password).
     * @returns {Promise<Object|void>} El token generado si el registro es exitoso.
     */
    const registerUser = async(datos) => {
        // console.log(datos, 'datos desde registerUser en el hook user Auth')
        const usuario = await conectar(`${urlBase}/signup`, 'POST', datos)
        console.log(usuario, 'usuario desde register hook')
        const {user, token, ok} = usuario

        if (ok) {
            register(user,token)
            return {token}
        } else {
            const errors = usuario.msg || 'Parece que este usuario ya ha sido registrado'
            setError(errors)
        }
        }
    

    /**
     * Finaliza la sesión del usuario eliminando los datos del Context y Storage.
     */
    const logoutUser = () =>{
        logout()
        navigate('/')
        
    }

    /**
     * Decodifica el token almacenado para extraer el rol del usuario.
     * * Utiliza la librería `jwt-decode`. Si no hay token o es inválido, retorna null.
     * * @returns {number|null} El ID del rol (ej. 1 para Usuario, 2 para Admin) o null.
     */
    const getRol = () =>{
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


   