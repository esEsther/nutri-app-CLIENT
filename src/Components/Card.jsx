
import { UserAction } from "../hooks/userAction";
import {useNavigate} from 'react-router-dom'
import { userAuth } from "../hooks/userAuth";

/**
 * @typedef {Object} Receta
 * @property {number|string} id_receta - ID de la receta en la BD local.
 * @property {number|string} id - ID de la receta proveniente de API externa (Spoonacular, etc).
 * @property {string} titulo - Nombre de la receta.
 * @property {string} imagen_url - URL de la imagen.
 */

/**
 * Componente de tarjeta para visualización individual de recetas.
 * * Este componente gestiona la navegación al detalle de la receta y la lógica 
 * para añadir recetas externas a la base de datos local al interactuar con ellas.
 * * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Receta} props.recipe - Objeto con la información de la receta.
 * @param {Function} [props.onSelect] - Callback opcional para manejar la selección.
 */
export const Card = ({ recipe,  onSelect }) => {

  const { guardarEnFavoritos, guardarRecetaEnBd } = UserAction();
  const navigate = useNavigate()
  const {getRol}= userAuth()
  const id_articulo =null
  const rol=getRol()
  const id = recipe.id_receta ? recipe.id_receta  : recipe.id

  const handleFavorito = async (articuloId, idReceta) => {
    try {
      await guardarEnFavoritos(articuloId, idReceta);
      if (idReceta) {
        await guardarRecetaEnBd(idReceta);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(recipe)
  const irDetalle = async() => {
    await guardarRecetaEnBd(id)
    navigate(`/detalleReceta/${id}`)
  }


  return (
    <div className="articulo-card" onClick={() => irDetalle()}>
      <img className="articulo-img"
        src={recipe.imagen_url}
        alt={recipe.title}
      />
      <h4 className="articulo-title">{recipe.titulo}</h4>
      {rol &&
      <button
        onClick={(ev) => {
          ev.stopPropagation(); // evita que se active el onClick del div
          handleFavorito(id_articulo, id);
        }}
      >
        Guardar en Favoritos
      </button>
      }
      
    </div>
  );
};
