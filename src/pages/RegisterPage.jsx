import { Button } from "../Components/Button"
// import { FormContainer } from "../components/FormContainer"
import { Input } from "../Components/Input"
import { userAuth } from "../hooks/userAuth"
import { NavLink, useNavigate } from "react-router-dom"
// import "./css/auth.css"
import {jwtDecode} from "jwt-decode"

export const RegisterPage = () => {
    const { registerUser, error,getRol } = userAuth();
    const navigate = useNavigate()

    const handleSubmit = async(ev) => {
        ev.preventDefault()

        const formulario = ev.target;
        const nombre = ev.target.name.value
        const email = ev.target.email.value
        const contra = ev.target.password.value

        if (!nombre || !email || !contra) {
            console.log("Completa todos los campos")
            return
        }
        const datos = { "nombre_usuario": nombre , "email": email, "password": contra }
        //console.log("Register:", datos)

        //al usar esa funcion que tiene tambien userContext
        //cambia el estado del token lo que hace que usando publicRoutes se redirija segun el rol
        const {token} = await registerUser(datos); 
        console.log(token, 'token recibido')   
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
    }
  return (
    // <h1>registro</h1>
    <>
        {/* <FormContainer title="Registro"/> */}
        <form className="auth-form" onSubmit={handleSubmit}>

            <Input type="text" name="name" placeholder="Nombre" />
            {error?.nombre_usuario && (
                <p className="error">{error.nombre_usuario.msg}</p>
            )}
            <Input type="text" name="email" placeholder="Email" />
            {error?.email && (
                <p className="error">{error.email.msg}</p>
            )}
            <Input type="text" name="password" placeholder="Contraseña" />
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