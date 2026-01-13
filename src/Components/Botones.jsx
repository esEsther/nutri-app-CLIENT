import { adminActions } from '../hooks/adminActions';
import { UserAction } from '../hooks/userAction';
import {useNavigate} from 'react-router-dom'
// import './Css/Botones.css'
import { useState } from 'react';

export const Botones = ({ rol, id_articulo, id_receta, onFavorito, onEditar, onEliminar }) => {
    const {guardarEnFavoritos, guardarRecetaEnBd,} = UserAction()
      const navigate = useNavigate()
      const {eliminarArticulo} = adminActions()
      const[error, setError] = useState(null)
      const[articulos, setArticulos] = useState([])

  const handleFavorito = async (articuloId, idReceta) => {
    console.log(articuloId, idReceta)
    try {
      await guardarEnFavoritos(articuloId, idReceta);
      if(idReceta) {
        // const resp = await spooncular(`/${id}/information`);
        // const titulo = await traducir(receta.title, "EN", "ES")
        // const contenido = await traducir(receta.instructions, "EN", "ES")
        // setReceta({ 
        //             id_receta: id,
        //             titulo: resp.title,
        //             imagen_url: resp.image,
        //             contenido
        //         })
        // await guardarRecetaEnBd(idReceta)
      }
    } catch (error) {
      console.log(error);
    }
  };

    const handleEditarArticulo = (id) => {
    navigate(`/admin/editarArticulo/${id}`);
  };
  
  const handleEliminarArticulo= async(id) => {
    try {
      const resp = await eliminarArticulo(id)
      if (resp?.ok) {
      onEliminar(id); // aquí le avisamos al padre
    }
        
    } catch (error) {
        console.log(error)
        setError(error)
    }
    
  }

  
   return (
    <div className='botones-container'>{/* Botón favoritos si estamos en /user */}
          {rol === 1&& (
            <button
              onClick={(ev) => { 
                ev.stopPropagation(); // evita que se active el navigate
                handleFavorito(id_articulo, id_receta);
              }}
            >
              Guardar en Favoritos
            </button>
          )}

          {/* Botones editar y eliminar si estamos en /admin */}
          {rol === 2 && (
            <>
            <button 
              onClick={(ev) => { 
                ev.stopPropagation(); // evita que se active el navigate
                handleEditarArticulo(id_articulo);
              }}
            >
              Editar
            </button>
            <button 
              onClick={(ev) => { 
                ev.stopPropagation(); // evita que se active el navigate
                handleEliminarArticulo(id_articulo);
              }}
            >
              Eliminar
            </button>
          </>
          )}</div>
  )

// return (
//     <div className="articulo-actions">
//       {/* Botón favoritos si rol es usuario */}
//       {rol === 1 && (
//         <button
//           onClick={(ev) => {
//             ev.stopPropagation();
//             onFavorito(id_articulo);
//           }}
//         >
//           Guardar en Favoritos
//         </button>
//       )}

//       {/* Botones editar y eliminar si rol es admin */}
//       {rol === 2 && (
//         <>
//           <button
//             onClick={(ev) => {
//               ev.stopPropagation();
//               onEditar(id_articulo);
//             }}
//           >
//             Editar
//           </button>
//           <button
//             onClick={(ev) => {
//               ev.stopPropagation();
//               onEliminar(id_articulo);
//             }}
//           >
//             Eliminar
//           </button>
//         </>
//       )}
//     </div>
//   );
}
