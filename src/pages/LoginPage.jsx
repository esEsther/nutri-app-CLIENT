import React from 'react';
import { NavLink , useNavigate} from 'react-router-dom';
import { userAuth } from '../hooks/userAuth';
import {jwtDecode} from "jwt-decode"

/**
 * @typedef {Object} LoginResponse
 * @property {Object} usuario - Datos del usuario autenticado.
 * @property {string} tokenRecibido - El token JWT devuelto por el servidor.
 */

/**
 * @typedef {Object} JWTPayload
 * @property {number} rol - El identificador de rol (1: Usuario, 2: Admin).
 */

/**
 * Página de Inicio de Sesión (Login).
 * * Gestiona la autenticación de usuarios, la validación de credenciales
 * y la redirección basada en roles mediante la decodificación del token JWT.
 * * @component
 */
export const LoginPage = () => {
  /** * Hook de autenticación personalizado.
   * Contiene métodos para loguear y el estado de error global de auth.
   */
  const { loginUser, error, getRol, token  } = userAuth();
  
  const navigate = useNavigate()

  /**
   * Maneja el envío del formulario de inicio de sesión.
   * * Realiza las siguientes acciones:
   * 1. Captura los datos del formulario.
   * 2. Llama al servicio de login.
   * 3. Si obtiene un token, lo decodifica para obtener el rol.
   * 4. Redirige al usuario según su nivel de acceso.
   * * @async
   * @param {React.FormEvent<HTMLFormElement>} ev - Evento de formulario.
   */
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const email = ev.target.email.value;
    const contrasenia = ev.target.password.value;
    // Validación de seguridad antes de la petición
    if (!email || !contrasenia) return;

    const datos = { email, contrasenia };
   try {
      /** @type {LoginResponse} */
      const { usuario, token: tokenRecibido } = await loginUser(datos);

      if (tokenRecibido) {
        /** @type {JWTPayload} */
        const decoded = jwtDecode(tokenRecibido);
        const rol = decoded.rol;

        // Lógica de redirección por roles
        // Rol 2: Administrador -> Gestión de artículos
        // Rol 1: Usuario -> Búsqueda de contenido
        if (rol === 2) {
          navigate("/admin/todosLosArticulos");
        } else if (rol === 1) {
          navigate("/user/buscarArticulo");
        }
      }
    } catch (err) {
      console.error("Error durante el proceso de login:", err);
    }
  };
  

  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="Email" />
        {error?.email && <p className="error">{error.email.msg}</p>}

        <input type="password" name="password" placeholder="Contraseña" />
        {error?.contrasenia && <p className="error">{error.contrasenia.msg}</p>}

        {error?.msg && <p className="error">{error.msg}</p>}

        <input text="Iniciar Sesión" type="submit" />
      </form>

      <p>
        ¿No tienes cuenta? <NavLink to="/register">Regístrate aquí</NavLink>
      </p>
    </>
  );
};
