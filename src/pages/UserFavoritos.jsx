import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { userAuth } from '../hooks/userAuth'
import conectar from '../helpers/fetch';
import { UserAction } from '../hooks/userAction';
import { UserContext } from '../contexts/UserContext';


/**
 * Componente de la página de Favoritos del usuario.
 * * Gestiona la visualización, navegación y eliminación de artículos marcados como favoritos.
 * Utiliza hooks personalizados para la autenticación y acciones de usuario, y realiza
 * una petición fetch al montar el componente para obtener los datos.
 * @component
 * @returns {JSX.Element} Vista de la galería de artículos favoritos.
 */
export const Favoritos = () => {
    
    const {urlBase} = useContext(UserContext)
    const {token} = userAuth()
    const {eliminarDeFavoritos} = UserAction()
    const[favoritos, setFavoritos] = useState([])
    const navigate = useNavigate()
    const[error, setError] = useState('null')
    const id_receta = null
    
    /**
   * Efecto que dispara la petición inicial para obtener los favoritos del usuario.
   * Se ejecuta solo una vez al montar el componente.
   */
    useEffect(() => {
        /**
     * Realiza la llamada asíncrona a la API para obtener el listado.
     * @async
     */
        const fetchFavoritos = async () => {
        
            try {
                const data = await conectar(
                    `${urlBase}/user/favoritos/articulo`,
                    'GET',
                    null,
                    token
                );
                setFavoritos(data.data);
            } catch (error) {
                console.error(error);
                setError(error)
            }
        };
        fetchFavoritos();
    }, []);

    /**
   * Navega a la vista de detalle de un artículo específico.
   * * @param {number|string} id - ID del artículo a consultar.
   * @returns {void}
   */
    const irDetalle = (id) => {
    navigate(`/articulo/${id}`);
  };

  /**
   * Gestiona la eliminación de un artículo de la lista de favoritos.
   * Actualiza el estado local de forma optimista si la respuesta es exitosa.
   * * @async
   * @param {number|string} id_articulo - ID del artículo a eliminar.
   * @param {number|string|null} [id_receta=null] - ID opcional de la receta asociada.
   * @returns {Promise<void>}
   */
  const handleFavorito = async(id_articulo, id_receta) => {
    try {
        const resp = await eliminarDeFavoritos(id_articulo, id_receta)

        if (resp?.ok !== false) {
          // Filtramos el estado local para reflejar el cambio inmediatamente
          setFavoritos(prev => //prev es la versión már reciente del estado
            prev.filter(fav => fav.id_articulo !== id_articulo)
          );
        }

        if(!resp.ok){
          setError(resp.error)
        }

    } catch (error) {
        console.log(error);
        setError(error)
    }
  }


  return (
    <>
    <p className='pcrear'>Mis artículos favoritos</p>
    <div className="articulos-container">
      {favoritos.map((favorito) => (
        <div
          key={favorito.id_articulo}
          onClick={() => irDetalle(favorito.id_articulo)}
          className="articulo-card"
        >
          <img
            src={favorito.imagen_url}
            alt={favorito.titulo}
            className="articulo-img"
          />
          <h3 className="articulo-title">{favorito.titulo}</h3>
          
          
            <button 
              onClick={(ev) => { 
                ev.stopPropagation(); // evita que se active el navigate
                handleFavorito(favorito.id_articulo);
              }}
            >
              Eliminar de Favoritos
            </button>
          
                </div>
              ))}
    </div>
    </>
   
  )
  
}
