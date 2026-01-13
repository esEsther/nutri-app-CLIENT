import React from 'react';
import { NavLink , useNavigate} from 'react-router-dom';
import { userAuth } from '../hooks/userAuth';
import { Input } from '../Components/Input';
import { Button } from '../Components/Button';
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

  
    if ( tokenRecibido) { 
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
      <form className="auth-form" onSubmit={handleSubmit}>
        <Input type="text" name="email" placeholder="Email" />
        {error?.email && <p className="error">{error.email.msg}</p>}

        <Input type="password" name="password" placeholder="Contraseña" />
        {error?.contrasenia && <p className="error">{error.contrasenia.msg}</p>}

        {error?.msg && <p className="error">{error.msg}</p>}

        <Button text="Iniciar Sesión" type="submit" />
      </form>

      <p>
        ¿No tienes cuenta? <NavLink to="/register">Regístrate aquí</NavLink>
      </p>
    </>
  );
};
