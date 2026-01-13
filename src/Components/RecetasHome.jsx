
  import { useEffect, useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import conectar from '../helpers/fetch';
import { Card } from './Card';
// import './css/MostrarArticulos.css';

export const RecetasHome = () => {

  const [recetas, setRecetas] = useState([]);
  // const navigate = useNavigate();
  

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const data = await conectar('http://localhost:7001/inicio/recetas');
        
        setRecetas(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecetas();
  }, []);

  return (
    <section className='home-caja'  id="home-recetas">
        <p>Recetas</p>
        <div className="articulos-container" >
            {recetas.slice(0, 4).map((receta) => (
                <Card key={receta.id_receta}
                recipe={receta}
           
                />
            ))}
                    
        </div>
    </section>
    
  );
};


