import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import conectar from '../helpers/fetch';
import './css/MostrarArticulos.css';
import {userAuth} from '../hooks/userAuth'
import {adminActions} from '../hooks/adminActions'
import { UserAction } from '../hooks/userAction';
import { Botones } from './Botones';
import { UserContext } from '../contexts/UserContext';

export const MostrarArticulos = () => {
  const [articulos, setArticulos] = useState([]);
  const[error, setError] = useState(null)
  const navigate = useNavigate();
  const location = useLocation() //hook para saber la ruta actual.
  const isUserRoute = location.pathname.startsWith('/user') //true si estamos en /user
  const isAdminRoute = location.pathname.startsWith('/admin') //true si estamos en admin
  const {guardarEnFavoritos, guardarRecetaEnBd,} = UserAction()
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

  //  const handleFavorito = async (articuloId, idReceta) => {
  //   try {
  //     await guardarEnFavoritos(articuloId, idReceta);
  //     if(idReceta) {
  //       await guardarRecetaEnBd(idReceta)
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
