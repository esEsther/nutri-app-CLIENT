import {useState, useEffect, useContext} from 'react'
import conectar from '../helpers/fetch'
import {useNavigate, useLocation} from 'react-router-dom'
import {userAuth }from '../hooks/userAuth'
// import './Css/MostrarArticulos.css'
import { Botones } from './Botones'
import { UserContext } from '../contexts/UserContext'

export const GaleriaArticulos = ({titulo}) => {
const [articulos, setArticulos] = useState([]);
  const navigate = useNavigate();
  const location = useLocation() //hook para saber la ruta actual.
  // const isUserRoute = location.pathname.startsWith('/user') //true si estamos en /user
//   const isAdminRoute = location.pathname.startsWith('/admin') //true si estamos en admin
//  const urlBase = "http://localhost:7001"
 const {token, getRol} = userAuth()
const {urlBase } = useContext(UserContext)
 
  //  const {eliminarArticulo} = adminActions()
   const idReceta = null
   const rol =getRol()


 useEffect(() => {
    const fetchArticulos = async () => {
      console.log(titulo)
    if (!titulo) return; // evita llamadas innecesarias
      try {
        const data = await conectar(
            `${urlBase}/user/buscar?titulo=${titulo}`,
            'GET',
            null,
            token
        )
        console.log('ha hecho el fetch')
        console.log({data})
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
  const handleEliminarArticulo = (id) => {
  setArticulos(prev => prev.filter(art => art.id_articulo !== id));
};



  //  const handleFavorito = async (articuloId) => {
  //   try {
  //     await guardarEnFavoritos(articuloId);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  //     const handleEditarArticulo = (id) => {
  //   navigate(`/admin/editarArticulo/${id}`);
  // };
  
  // const handleEliminarArticulo= async(id) => {
  //   try {
  //     const resp = await eliminarArticulo(id)
  //     if (resp?.ok !== false) {
  //         setArticulos(prev =>
  //           prev.filter(art => art.id_articulo !== id)
  //         );
  //       }
  //   } catch (error) {
  //       console.log(error)
  //       return error
  //   }
    
  // }
  
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
         <Botones rol={rol} id_articulo={articulo.id_articulo} id_receta={null}
         onEliminar={handleEliminarArticulo}/>
                </div>
              ))}
    </div>
  )
}


