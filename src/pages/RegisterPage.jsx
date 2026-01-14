import { Button } from "../Components/Button"
import { userAuth } from "../hooks/userAuth"
import { NavLink, useNavigate } from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import { Errores } from "../Components/Errores"
import { useState } from "react"


/**
 * @typedef {Object} DecodedToken
 * @property {number} rol - El nivel de acceso del usuario (1 para Usuario, 2 para Admin).
 * @property {string} nombre - Nombre de usuario extraído del token.
 * @property {number} exp - Fecha de expiración del token.
 */

/**
 * Página de Registro de usuarios.
 * * Gestiona la creación de nuevas cuentas, la obtención del token JWT
 * y la redirección automática según el rol decodificado del token.
 * * @component
 * @returns {JSX.Element} Formulario de registro con manejo de errores.
 */
export const RegisterPage = () => {
    const { registerUser, getRol } = userAuth();
    const navigate = useNavigate()
    const [error, setError] = useState()

    /**
     * Procesa el envío del formulario de registro.
     * 1. Valida campos vacíos.
     * 2. Envía datos al servicio de registro.
     * 3. Decodifica el token JWT para determinar el rol.
     * 4. Redirige al dashboard correspondiente.
     * * @async
     * @param {React.FormEvent<HTMLFormElement>} ev - Evento de envío del formulario.
     */
    const handleSubmit = async(ev) => {
        ev.preventDefault()

        const formulario = ev.target;
        const nombre = ev.target.name.value
        const email = ev.target.email.value
        const contra = ev.target.password.value

        if (!nombre || !email || !contra) {
            setError("Completa todos los campos")
            return
        }
        const datos = { "nombre_usuario": nombre , "email": email, "password": contra }


        //al usar esa funcion que tiene tambien userContext
        //cambia el estado del token lo que hace que usando publicRoutes se redirija segun el rol
        const {token} = await registerUser(datos); 

        // Si el login fue exitoso, redirige según rol
        if (token) { // token se setea en el Provider
            // console.log(token)
            const rol = jwtDecode(token).rol;
            // const rol = getRol();
            if (rol === 2) {
              navigate("/admin/verTodosLosArticulos");
            } else if (rol === 1) {
              navigate("/user/buscarArticulo");
            }
        } 
         
        if(!token) setError('Parece que este usuario ya ha sido registrado')
           
    }

  return (
    <>
            {error && (
                <Errores mensaje={error}/>
            )}
        <form className="auth-form" onSubmit={handleSubmit}>

            <input type="text" name="name" placeholder="Nombre" />
            {error?.nombre_usuario && (
                <p className="error">{error.nombre_usuario.msg}</p>
            )}
            <input type="text" name="email" placeholder="Email" />
            {error?.email && (
                <p className="error">{error.email.msg}</p>
            )}
            <input type="text" name="password" placeholder="Contraseña" />
            {error?.contrasena && (
                <p className="error">{error.contrasena.msg}</p>
            )}
            {
                error &&(
                <p className="error">{error.msg}</p>
                )
            }
            <Button text="Registrarse" type="submit" />
        </form>
        <p>
            ¿Ya tienes cuenta? <NavLink to="/login">Inicia Session</NavLink>
        </p>
    </>
    
  )
}