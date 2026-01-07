import React from 'react';
import { NavLink , useNavigate} from 'react-router-dom';
import { userAuth } from '../hooks/userAuth';
import { Input } from './Input';
import { Button } from './Button';
import {jwtDecode} from "jwt-decode"

export const LoginPage = () => {
  const { loginUser, error, getRol, token  } = userAuth();
  
  const navigate = useNavigate()

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const email = ev.target.email.value;
    const contrasenia = ev.target.password.value;
    if (!email || !contrasenia) return;

    const datos = { email, contrasenia };
    // await loginUser(datos);
    const { usuario, token: tokenRecibido} = await loginUser(datos);

    // Si el login fue exitoso, redirige según rol
    if ( tokenRecibido) { // el token se setea en el Provider
      console.log(token)
      const rol = jwtDecode(tokenRecibido).rol;
      console.log('este es el rol en loginpage: ', rol)
      if (rol === 2) {
        navigate("/admin/todosLosArticulos");
      } else if (rol === 1) {
        navigate("/user/buscarArticulo");
      }
    }
};
  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input type="text" name="email" placeholder="Tu correo aquí" />
        {error?.email && <p className="error">{error.email.msg}</p>}

        <Input type="password" name="password" placeholder="Tu contraseña aquí" />
        {error?.contrasenia && <p className="error">{error.contrasenia.msg}</p>}

        {error?.msg && <p className="error">{error.msg}</p>}

        <Button text="Iniciar Sesión" type="submit" />
      </form>

      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        ¿No tienes cuenta? <NavLink to="/auth/register">Regístrate aquí</NavLink>
      </p>
    </>
  );
};
