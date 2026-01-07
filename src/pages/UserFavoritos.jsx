import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { userAuth } from '../hooks/userAuth'
import conectar from '../helpers/fetch';

export const Favoritos = () => {
    const {token, eliminarDeFavoritos} = userAuth()
    const[favoritos, setFavoritos] = useState([])
    const navigate = useNavigate()
    const urlBase = "http://localhost:7001"
    
    useEffect(() => {
        const fetchFavoritos = async () => {
        
            try {
                const data = await conectar(
                    `${urlBase}/user/favoritos`,
                    'GET',
                    null,
                    token
                );
                setFavoritos(data.data);
            } catch (error) {
                console.error(error);
                return error
            }
        };
        fetchFavoritos();
    }, []);

    const irDetalle = (id) => {
    navigate(`/articulo/${id}`);
  };

  const handleFavorito = async(id) => {
    try {
        const resp = await eliminarDeFavoritos(id)

        if (resp?.ok !== false) {
          setFavoritos(prev =>
            prev.filter(fav => fav.id_articulo !== id)
          );
        }

    } catch (error) {
        console.log(error);
        return error
    }
  }


  return (
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
          {/* Render condicional si estamos en /user */}
          
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
  )
  
}
