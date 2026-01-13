import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { userAuth } from '../hooks/userAuth'
import conectar from '../helpers/fetch';
import { UserAction } from '../hooks/userAction';
import { UserContext } from '../contexts/UserContext';

export const RecetasFavoritas = () => {

    const {urlBase} = useContext(UserContext)
    const {token} = userAuth()
    const {eliminarDeFavoritos} = UserAction()
    const[favoritos, setFavoritos] = useState([])
    const navigate = useNavigate()
    const[error, setError] = useState('null')
    const id_articulo = null
    
    useEffect(() => {
        const fetchFavoritos = async () => {
        
            try {
                const data = await conectar(
                    `${urlBase}/user/favoritos/receta`,
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

    const irDetalle = (id) => {
    navigate(`/detalleReceta/${id}`);
  };

  const handleFavorito = async(id_articulo, id_receta) => {
    try {
        const resp = await eliminarDeFavoritos(id_articulo, id_receta)

        if (resp?.ok !== false) {
          setFavoritos(prev => //prev es la versión már reciente del estado
            prev.filter(fav => fav.id_receta !== id_receta)
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

   console.log(favoritos)

  return (
    <>
    <p className='pcrear'>Mis Recetas Favoritas</p>
    <div className="articulos-container">
      {favoritos.map((favorito) => (
        <div
          key={favorito.id_receta}
          onClick={() => irDetalle(favorito.id_receta)}
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
                handleFavorito(favorito.id_receta);
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
