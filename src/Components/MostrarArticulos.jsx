import {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import conectar from '../helpers/fetch';
import './css/MostrarArticulos.css';
import {userAuth} from '../hooks/userAuth'
import {adminActions} from '../hooks/adminActions'
import { Botones } from './Botones';

/**
 * @typedef {Object} Articulo
 * @property {number|string} id_articulo - Identificador único del artículo.
 * @property {string} titulo - Título del artículo.
 * @property {string} imagen_url - URL de la imagen de portada.
 */

/**
 * Componente principal para listar artículos en formato de galería.
 * * Este componente se encarga de:
 * 1. Obtener todos los artículos desde el endpoint de inicio.
 * 2. Gestionar la navegación al detalle del artículo.
 * 3. Proveer una función de actualización local tras la eliminación de un ítem.
 * 4. Adaptar las acciones disponibles delegando en el componente {@link Botones}.
 * * @component
 */
export const MostrarArticulos = () => {
  const [articulos, setArticulos] = useState([]);
  const[error, setError] = useState(null)
  const navigate = useNavigate();
  const {getRol}=userAuth()
  const {eliminarArticulo} = adminActions()
  const idReceta = null
  const rol =getRol()

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const data = await conectar('http://localhost:7001/inicio');
        
        setArticulos(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticulos();
  }, []);


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

          <Botones rol={rol} id_articulo={articulo.id_articulo} onEliminar={handleEliminarArticulo}/>
                </div>
              ))}
              
    </div>
  );
};
