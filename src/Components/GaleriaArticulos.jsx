import {useState, useEffect, useContext} from 'react'
import conectar from '../helpers/fetch'
import {useNavigate} from 'react-router-dom'
import {userAuth }from '../hooks/userAuth'
import { Botones } from './Botones'
import { UserContext } from '../contexts/UserContext'

/**
 * Componente que renderiza una galería de artículos filtrada por título.
 * * Realiza peticiones asíncronas al backend cada vez que el término de búsqueda cambia,
 * gestionando la visualización de resultados y las acciones asociadas a cada artículo.
 * * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.titulo - Término de búsqueda (título del artículo) para filtrar los resultados.
 */
export const GaleriaArticulos = ({titulo}) => {
const [articulos, setArticulos] = useState([]);
  const navigate = useNavigate();
 const {token, getRol} = userAuth()
const {urlBase } = useContext(UserContext)

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


