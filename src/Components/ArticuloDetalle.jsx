import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import conectar from '../helpers/fetch';
import './css/ArticuloDetalle.css';

export const ArticuloDetalle = () => {
  const { id } = useParams();
  const [articulo, setArticulo] = useState(null);
  const navigate = useNavigate();

  //use effect permite sincronizar un componente con un sistema experno
  useEffect(() => {
    const fetchArticulo = async () => {
      try {
        const data = await conectar('http://localhost:7001/inicio');
        const art = data.data.find((a) => a.id_articulo === parseInt(id));
        setArticulo(art);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticulo();
  }, [id]);

  if (!articulo) return <p className="loading">Cargando...</p>;

  return (
    <div className="detalle-container">
      <button onClick={() => navigate(-1)} className="back-btn">Volver</button>
      <h1 className="detalle-title">{articulo.titulo}</h1>
      <img
        src={articulo.imagen_url}
        alt={articulo.titulo}
        className="detalle-img"
      />
      <p className="detalle-content">{articulo.contenido}</p>
    </div>
  );
};
