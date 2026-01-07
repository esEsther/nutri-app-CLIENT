import React, { useState } from 'react'
import { Formulario } from '../Components/Formulario'
import { MostrarArticulos } from '../Components/MostrarArticulos'
import { GaleriaArticulos } from '../Components/GaleriaArticulos'
import { Errores } from '../Components/Errores'
  
export const BuscarArticulo = () => {
    const [titulo, setTitulo] = useState(null)
    const [error, setError] = useState(null)

    const handleTitulo = (busqueda) => {
        setError(null)
        //si nuevaCategoria es null, undefined o false
        if (!busqueda) {
            setError({ mensaje: 'La búsqueda está vacía', detalles: 'Escribe un artículo que te pueda interesar.' })
            return //para no ejecutar el resto del codigo
        }
        setTitulo(busqueda)
    }

    const borrarError = () =>{
        setError(null)
    }

    // console.log(titulo)

  return (
    <div>
        <Formulario className='formulario' buscador={handleTitulo}/>

        {error && (
            <Errores mensaje={error.mensaje} detalles={error.detalles} />
        )}

        {titulo
            ? (<GaleriaArticulos titulo={titulo} clearError = {borrarError}/>)
            : (<MostrarArticulos/>)
         }


    </div>
  )
}
