import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import conectar from "../helpers/fetch";
import { adminActions } from "../hooks/adminActions";

export const AdminEditarUsuario = () => {
  const { id } = useParams(); // id_usuario
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    id_rol: ""
  });

  const [error, setError] = useState(null);

  const { editarUsuario, token } = adminActions();
  const urlBase = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const resp = await conectar(
          `${urlBase}/admin/usuario/${id}`,
          "GET",
          null,
          token
        );

        if (!resp) {
          setError("Error al cargar el usuario");
          return;
        }
        setUsuario({
          nombre: resp.usuario.nombre ?? '',
          email: resp.usuario.email ?? '',
          id_rol: resp.usuario.id_rol.toString()  ?? ''
        });

      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsuario();
  }, [id, token, urlBase]);

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
        id,
        nombre: usuario.nombre,
        email: usuario.email,
        id_rol: Number(usuario.id_rol)
      }
      await editarUsuario(datos);

      navigate("/admin/todosLosUsuarios");
    } catch (error) {
      setError(error.message || "Error al editar usuario");
    }
  };

  if (error) return <p className="error">{error}</p>;

  return (
    <main className="containerEditar">
      <p className="tituloWeb">Editar usuario</p>

      <form className="formEditar" onSubmit={handleSubmit}>
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
    </main>
  );
};
