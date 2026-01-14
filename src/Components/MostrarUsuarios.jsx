import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import conectar from '../helpers/fetch';
// import './css/MostrarArticulos.css';
import {userAuth} from '../hooks/userAuth'
import {adminActions} from '../hooks/adminActions'
import { UserContext } from '../contexts/UserContext';

/**
 * @typedef {Object} Usuario
 * @property {number|string} id_usuario - Identificador único del usuario.
 * @property {string} nombre - Nombre completo o username.
 * @property {string} email - Correo electrónico del usuario.
 * @property {number} id_rol - Identificador del rol (ej: 1 para user, 2 para admin).
 */

/**
 * Componente administrativo para visualizar y gestionar la lista de usuarios.
 * * Este componente permite al administrador:
 * 1. Listar todos los usuarios registrados mediante una petición autenticada.
 * 2. Navegar al formulario de edición de cada usuario.
 * 3. Eliminar usuarios, actualizando el estado local de forma reactiva.
 * * @component
 */
export const MostrarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const[error, setError] = useState(null)
  const navigate = useNavigate();
  const location = useLocation() //hook para saber la ruta actual.
  const {token } = useContext(UserContext)
  const {eliminarUsuario} = adminActions()


  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await conectar('http://localhost:7001/admin/getTodosLosUsuarios',
                                    'GET',
                                    null,
                                    token
        );
        // console.log(data , 'data desde fetch usuarios')
        setUsuarios(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsuarios();
  }, []);

//   const irDetalle = (id) => {
//     navigate(`/articulo/${id}`);
//   };

    const handleEditarUsuario = (id) => {
    navigate(`/admin/editarUsuario/${id}`);
  };
  
  const handleEliminarUsuario= async(id) => {
    try {
      const resp = await eliminarUsuario(id)
      if (resp?.ok !== false) {
          setUsuarios(prev =>
            prev.filter(user => user.id_usuario !== id)
          );
        }
    } catch (error) {
        console.log(error)
        setError(error)
    }
    
  }
  console.log(usuarios)
  return (
    <div className="articulos-container">
      {usuarios.map((usuario) => (
        <div
          key={usuario.id_usuario}
        //   onClick={() => irDetalle(articulo.id_articulo)}
          className="articulo-card"
        >
          
          <h3 className="articulo-title">{usuario.nombre}</h3>
          <p>{usuario.email}</p>
          {/* <p>contraseña: {usuario.contrasenia}</p> */}
          <p>rol: {usuario.id_rol}</p>
            <button 
              onClick={(ev) => { 
                ev.stopPropagation(); // evita que se active el navigate
                handleEditarUsuario(usuario.id_usuario);
              }}
            >
              Editar
            </button>
            <button 
              onClick={(ev) => { 
                ev.stopPropagation(); // evita que se active el navigate
                handleEliminarUsuario(usuario.id_usuario);
              }}
            >
              Eliminar
            </button>
          
                </div>
              ))}
    </div>
  );
};

