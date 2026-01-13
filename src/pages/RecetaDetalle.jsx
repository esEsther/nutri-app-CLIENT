import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import '../components/css/ArticuloDetalle.css';
import {userAuth} from '../hooks/userAuth'
import {Markup} from 'interweave'
import { UserAction } from '../hooks/userAction';
import { Botones } from '../Components/Botones';
import conectar from '../helpers/fetch';
import { UserContext } from '../contexts/UserContext';


export const RecetaDetalle = () => {
  const { id } = useParams();
  const {urlBase} = useContext(UserContext)
  const [receta, setReceta] = useState({
                    id_receta: '',
                    titulo: '',
                    imagen_url: '',
                    contenido: ''
                })
  const navigate = useNavigate()
  const {getRol} = userAuth()
  const {spooncular, guardarRecetaEnBd} =UserAction()

  const rol = getRol()
  console.log({id})

  useEffect(() => {
    const fetchReceta = async () => {
      try {
        let data = await conectar(`${urlBase}/inicio/receta/${id}`)
        if(data.data) setReceta(data.data[0])

        // if(!data.data) {
        //     // const resp = await spooncular(`/${id}/information`);
        // // const titulo = await traducir(receta.title, "EN", "ES")
        // // const contenido = await traducir(receta.instructions, "EN", "ES")
        // // setReceta({ 
        // //             id_receta: id,
        // //             titulo: resp.title,
        // //             imagen_url: resp.image,
        // //             contenido
        // //         })
        // await  guardarRecetaEnBd(id)
        // const data2 = await conectar(`${urlBase}/inicio/receta/${id}`)
        // if(data2.data) setReceta(data2.data[0])
        // }
                    
      } catch (error) {
        console.error(error);
      }
    };
    fetchReceta();
  }, [id]);

  console.log(receta)

  return (
    <div className="detalle-container">
      <button onClick={() => navigate(-1)} className="back-btn">Volver</button>
      <h1 className="detalle-title">{receta.titulo}</h1>
      <img
        src={receta.imagen_url}
        alt={receta.titulo}
        className="detalle-img"
      />
      <div className="detalle-content">
          <Markup content={receta.contenido} />
      </div>

    <Botones rol={rol} id_receta={id}/>

    </div>
  );
};
