import {useState, useEffect} from 'react'
import conectar from '../helpers/fetch'
import {useNavigate, useLocation} from 'react-router-dom'
import {userAuth }from '../hooks/userAuth'

export const GaleriaArticulos = ({titulo, clearError}) => {
const [articulos, setArticulos] = useState([]);
  const navigate = useNavigate();
  const location = useLocation() //hook para saber la ruta actual.
  const isUserRoute = location.pathname.startsWith('/user') //true si estamos en /user
  const isAdminRoute = location.pathname.startsWith('/admin') //true si estamos en admin
 const urlBase = "http://localhost:7001"
 const {guardarEnFavoritos, token} = userAuth()


 useEffect(() => {
    const fetchArticulos = async () => {
    if (!titulo) return; // evita llamadas innecesarias
      try {
        const data = await conectar(
            `${urlBase}/user/buscar?titulo=${titulo}`,
            'GET',
            null,
            token

        );
        console.log(data)
        setArticulos(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticulos();
  }, [titulo]);

  const irDetalle = (id) => {
    navigate(`/articulo/${id}`);
  };



   const handleFavorito = async (articuloId) => {
    try {
      await guardarEnFavoritos(articuloId);
    } catch (error) {
      console.error(error);
    }
  };

      const handleEditarArticulo = (id) => {
    navigate(`/admin/editarArticulo/${id}`);
  };
  
  const handleEliminarArticulo= async(id) => {
    try {
      const resp = await eliminarArticulo(id)
      if (resp?.ok !== false) {
          setArticulos(prev =>
            prev.filter(art => art.id_articulo !== id)
          );
        }
    } catch (error) {
        console.log(error)
        return error
    }
    
  }



  
  return (
    <div className="articulos-container">
      {articulos.map((articulo) => (
        <div
          key={articulo.id_articulo}
          onClick={() => irDetalle(articulo.id_articulo)}
          className="articulo-card"
        >
          <img
            src={articulo.imagen_url}
            alt={articulo.titulo}
            className="articulo-img"
          />
          <h3 className="articulo-title">{articulo.titulo}</h3>
          {/* Render condicional si estamos en /user */}
          {isUserRoute && (
            <button 
              onClick={(ev) => { 
                ev.stopPropagation(); // evita que se active el navigate
                handleFavorito(articulo.id_articulo);
              }}
            >
              Guardar en Favoritos
            </button>
          )}

          {/* Botones editar y eliminar si estamos en /admin */}
          {isAdminRoute && (
            <>
            <button 
              onClick={(ev) => { 
                ev.stopPropagation(); // evita que se active el navigate
                handleEditarArticulo(articulo.id_articulo);
              }}
            >
              Editar
            </button>
            <button 
              onClick={(ev) => { 
                ev.stopPropagation(); // evita que se active el navigate
                handleEliminarArticulo(articulo.id_articulo);
              }}
            >
              Eliminar
            </button>
          </>
          )}
                </div>
              ))}
    </div>
  )
}
