import React, { useState } from 'react'
import {UserAction} from '../hooks/userAction'

export const PruebaTraducir = () => {
    const[textoAtraducir, setTextoAtraducir] =useState('')
    const [error, setError] = useState(null);
        const [loading, setLoading] = useState(false);
          const [translation, setTranslation] = useState("");
    const {traducir} = UserAction()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await traducir(textoAtraducir);
            setTranslation(data); // ✅ aquí accedemos correctamente
        } catch (error) {
            setError(error.message || "Error al traducir");
            setTranslation("");
        } finally {
            setLoading(false);
        }
    };
  return (
    <>
    <form className='formulario' onSubmit={handleSubmit}>
          <input type='text' onChange={(e) => setTextoAtraducir(e.target.value)} id='busqueda' value={textoAtraducir} name='busqueda' placeholder='Qué quieres traducir?'/> 
          <input type = 'submit' />
        </form>

        <p>Texto traducido</p>:
        <p>{translation}</p>
    </>
  )
}
