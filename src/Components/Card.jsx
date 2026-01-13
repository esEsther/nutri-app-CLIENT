
import { UserAction } from "../hooks/userAction";
// import './css/Card.css'; 
import {useNavigate} from 'react-router-dom'

import { userAuth } from "../hooks/userAuth";

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
