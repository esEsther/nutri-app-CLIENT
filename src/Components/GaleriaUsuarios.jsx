
import {useState, useEffect} from 'react'
import conectar from '../helpers/fetch'
import {useNavigate} from 'react-router-dom'
import {userAuth }from '../hooks/userAuth'

export const GaleriaUsuarios = ({usuario}) => {
const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();
  
 const urlBase = "http://localhost:7001"
 const {token} = userAuth()
 console.log('este es el token', token)


 useEffect(() => {
    const fetchArticulos = async () => {
    if (!usuario) return; // evita llamadas innecesarias
      try {
        const data = await conectar(
            // `${urlBase}/admin/buscarUsuario?usuario=${usuario}`,
            `${urlBase}/admin/buscarUsuario/:usuario?usuario=${usuario}`,
            'GET',
            null,
            token

        );
        console.log(data)
        setUsuarios(data?.data ?? [])
      } catch (error) {
        console.error(error)
        setUsuarios([])
      }
    };
    fetchArticulos();
  }, [usuario, token]);

  // const irDetalle = (id) => {
  //   navigate(`/articulo/${id}`);
  // };



      const handleEditarUsuario = (id) => {
    navigate(`/admin/editarUsuario/${id}`);
  };
  
  const handleEliminarUsuario= async(id) => {
    try {
      const resp = await eliminarUsuario(id)
      if (resp?.ok !== false) {
          setUsuarios(prev =>
            prev.filter(usuario => usuario.id_usuario !== id)
          );
        }
    } catch (error) {
        console.log(error)
        return error
    }
    
  }



  
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
}
