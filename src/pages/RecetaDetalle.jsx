import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import '../components/css/ArticuloDetalle.css';
import {userAuth} from '../hooks/userAuth'
import {Markup} from 'interweave'
import { UserAction } from '../hooks/userAction';
import { Botones } from '../Components/Botones';
import conectar from '../helpers/fetch';
import { UserContext } from '../contexts/UserContext';

/**
 * @typedef {Object} RecetaDetalleData
 * @property {string|number} id_receta - Identificador único de la receta.
 * @property {string} titulo - El nombre o título de la receta.
 * @property {string} imagen_url - URL de la imagen de cabecera.
 * @property {string} contenido - Cuerpo de la receta en formato HTML/Texto.
 */

/**
 * Componente de vista detallada de una receta.
 * * Extrae el ID de la URL, realiza una petición al backend para obtener los datos
 * y renderiza el contenido procesando etiquetas HTML mediante el componente Markup.
 * * @component
 * @returns {JSX.Element} La vista con la información completa de la receta y acciones disponibles.
 */
export const RecetaDetalle = () => {
  const { id } = useParams();
  const {urlBase} = useContext(UserContext)
  const [receta, setReceta] = useState({
                    id_receta: '',
                    titulo: '',
                    imagen_url: '',
                    contenido: ''
                })
  const navigate = useNavigate()
  const {getRol} = userAuth()
  const {spooncular, guardarRecetaEnBd} =UserAction()

  /** * Rol del usuario obtenido desde el token para control de permisos en botones.
   * @type {number|null} */
  const rol = getRol()
  console.log({id})

  /**
   * Efecto que se dispara al cambiar el ID en la URL para obtener los datos de la receta.
   */
  useEffect(() => {
    /**
     * Realiza la llamada asíncrona al endpoint de recetas.
     * @async
     */
    const fetchReceta = async () => {
      try {
        let data = await conectar(`${urlBase}/inicio/receta/${id}`)
        if(data.data) setReceta(data.data[0])
 
      } catch (error) {
        console.error(error);
      }
    };
    fetchReceta();
  }, [id]);

  console.log(receta)

  return (
    <div className="detalle-container">
      <button onClick={() => navigate(-1)} className="back-btn">Volver</button>
      <h1 className="detalle-title">{receta.titulo}</h1>
      <img
        src={receta.imagen_url}
        alt={receta.titulo}
        className="detalle-img"
      />
      <div className="detalle-content">
        {/* Markup procesa de forma segura el string HTML proveniente del backend */}
          <Markup content={receta.contenido} />
      </div>

    <Botones rol={rol} id_receta={id}/>

    </div>
  );
};
