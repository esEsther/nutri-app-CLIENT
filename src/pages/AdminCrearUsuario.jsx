import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import conectar from "../helpers/fetch";
import { adminActions } from "../hooks/adminActions";
import { UserContext } from "../contexts/UserContext";
import { Input } from "../Components/Input";
import { Errores } from "../Components/Errores";

export const AdminCrearUsuario = () => {
  const { id } = useParams(); // id_usuario
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
                                            nombre: "",
                                            email: "",
                                            id_rol: "",
                                            contrasenia: ""
                                         });

  const [error, setError] = useState(null);
  const { crearUsuario} = adminActions();
  const {urlBase}=useContext(UserContext)

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
    const datos = {
        nombre: usuario.nombre,
        email: usuario.email,
        id_rol: Number(usuario.id_rol),
        contrasenia: usuario.contrasenia
      }
      const resp = await crearUsuario(datos);
    //   console.log({resp})
      navigate("/admin/todosLosUsuarios");
    } catch (error) {
      setError(error.message || "Error al crear usuario");
    }
  };

  return (
    <main className="containerCrear">
      <p className="pcrear">Crear Usuario</p>
      {error && (<Errores mensaje={error}/>)}
      
      <div>
      <form  className="form-crear-usuario" onSubmit={handleSubmit}>
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={usuario.nombre}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={usuario.email}
              onChange={handleChange}
              required
            />

            <label>Contraseña</label>
            <input
              type="text"
              name="contrasenia"
              value={usuario.contrasenia}
              onChange={handleChange}
              required
            />

            <label>Rol</label>
            <select
              name="id_rol"
              value={usuario.id_rol}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un rol</option>
              <option value="1">Usuario</option>
              <option value="2">Admin</option>
            </select>

            <button>Guardar cambios</button>
          </form>
  
      </div>
    
    </main>
  );
};
