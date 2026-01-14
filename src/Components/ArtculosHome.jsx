
  import {useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import conectar from '../helpers/fetch';

/**
 * Componente que renderiza la sección de noticias o artículos destacados en la Home.
 * * Realiza una petición al endpoint público de inicio y muestra una selección
 * limitada de las publicaciones más recientes para fomentar la lectura.
 * * @component
 */
export const ArtculosHome = () => {

  const [articulos, setArticulos] = useState([]);
  const navigate = useNavigate();
  

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

  const irDetalle = (id) => {
    navigate(`/articulo/${id}`);
  };
// console.log(articulos, 'articulos')
 

  return (
    <section className='home-caja' id="home-articulos" >
        <p>Artículos</p>
        <article className="articulos-container" >
                
            {articulos.slice(0, 4).map((articulo) => (

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


        </div>
            ))}
                     
    </article>

    </section>
    
      );  
  
};


