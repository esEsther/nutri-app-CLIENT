import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import conectar from '../helpers/fetch';
import './css/MostrarArticulos.css';
import {userAuth} from '../hooks/userAuth'
import {adminActions} from '../hooks/adminActions'

export const MostrarArticulos = () => {
  const [articulos, setArticulos] = useState([]);
  // const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();
  const location = useLocation() //hook para saber la ruta actual.
  const isUserRoute = location.pathname.startsWith('/user') //true si estamos en /user
  const isAdminRoute = location.pathname.startsWith('/admin') //true si estamos en admin
  const {guardarEnFavoritos} = userAuth()
  const {eliminarArticulo} = adminActions()


  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const data = await conectar('http://localhost:7001/inicio');
        setArticulos(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticulos();
  }, []);

   const handleFavorito = async (articuloId) => {
    try {
      await guardarEnFavoritos(articuloId);
    } catch (error) {
      console.error(error);
    }
  };




  const irDetalle = (id) => {
    navigate(`/articulo/${id}`);
  };

    const handleEditarArticulo = (id) => {
    navigate(`/admin/editarArticulo/${id}`);
  };
  
  const handleEliminarArticulo= async(id) => {
    try {
      const resp = await eliminarArticulo(id)
      if (resp?.ok !== false) {
          setArticulos(prev =>
            prev.filter(art => art.id_articulo !== id)
          );
        }
    } catch (error) {
        console.log(error)
        return error
    }
    
  }

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

          {/* Botón favoritos si estamos en /user */}
          {isUserRoute && (
            <button 
              onClick={(ev) => { 
                ev.stopPropagation(); // evita que se active el navigate
                handleFavorito(articulo.id_articulo);
              }}
            >
              Guardar en Favoritos
            </button>
          )}

          {/* Botones editar y eliminar si estamos en /admin */}
          {isAdminRoute && (
            <>
            <button 
              onClick={(ev) => { 
                ev.stopPropagation(); // evita que se active el navigate
                handleEditarArticulo(articulo.id_articulo);
              }}
            >
              Editar
            </button>
            <button 
              onClick={(ev) => { 
                ev.stopPropagation(); // evita que se active el navigate
                handleEliminarArticulo(articulo.id_articulo);
              }}
            >
              Eliminar
            </button>
          </>
          )}
                </div>
              ))}
    </div>
  );
};

