import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import conectar from '../helpers/fetch';
import './css/ArticuloDetalle.css';
import { userAuth } from '../hooks/userAuth'
import { Botones } from './Botones';
import { Markup } from 'interweave'

export const ArticuloDetalle = () => {

  const { id } = useParams();
  const [articulo, setArticulo] = useState(null);
  const navigate = useNavigate()
  const { getRol } = userAuth()

  const rol = getRol()
  // console.log('Este es el rol: ', rol)

  console.log('Este es el articulo: ', articulo)

  //use effect permite sincronizar un componente con un sistema experno

  const fetchArticulo = async () => {

    console.log('entra en fetch articulo')
    try {
      const data = await conectar('http://localhost:7001/inicio');
      const art = data.data.find((a) => a.id_articulo === parseInt(id));
      setArticulo(art);
      console.log(art)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    console.log(id, 'id en use effect')

    fetchArticulo();
  }, [id]);



  return (
    <div className="detalle-container">
      <button onClick={() => navigate(-1)} className="back-btn">Volver</button>

      {
        !articulo
          ? <h1>'CARGANDO'</h1>
          : <> <h1 className="detalle-title">{articulo.titulo}</h1>
            <img
              src={articulo.imagen_url}
              alt={articulo.titulo}
              className="detalle-img"
            />
            {/* <p className="detalle-content">{articulo.contenido}</p> */}
            <div className="detalle-content">
              <Markup content={articulo.contenido} />
            </div>

            <Botones rol={rol} id_articulo={articulo.id_articulo} />
          </>
      }



    </div>
  );
};
