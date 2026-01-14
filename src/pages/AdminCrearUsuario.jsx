import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import conectar from "../helpers/fetch";
import { adminActions } from "../hooks/adminActions";
import { UserContext } from "../contexts/UserContext";
import { Errores } from "../Components/Errores";

/**
 * @typedef {Object} NuevoUsuario
 * @property {string} nombre - Nombre completo del usuario.
 * @property {string} email - Dirección de correo electrónico.
 * @property {string} id_rol - El ID del rol seleccionado (como string para el select).
 * @property {string} contrasenia - Contraseña para la nueva cuenta.
 */

/**
 * Componente administrativo para la creación de nuevos usuarios.
 * * Gestiona un formulario controlado para capturar los datos de un nuevo perfil,
 * transforma los tipos de datos necesarios (como el rol a número) y redirige
 * al listado general tras una creación exitosa.
 * * @component
 */
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

  /**
   * Actualiza el estado del usuario conforme se escribe en los inputs.
   * @param {Object} e - Evento de cambio del input.
   */
  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  /**
   * Procesa el envío del formulario.
   * * Realiza la conversión de tipos (id_rol a Number) antes de enviar.
   * @async
   * @param {Object} e - Evento de envío del formulario.
   */
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
