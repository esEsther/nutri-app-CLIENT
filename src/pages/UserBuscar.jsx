import React, { useEffect, useState } from 'react'
import { Formulario } from '../Components/Formulario'
import { MostrarArticulos } from '../Components/MostrarArticulos'
import { GaleriaArticulos } from '../Components/GaleriaArticulos'
import { Errores } from '../Components/Errores'
  


/**
 * @typedef {Object} CustomError
 * @property {string} mensaje - Título o descripción corta del error.
 * @property {string} [detalles] - Información adicional sobre cómo solucionar el error.
 */

/**
 * Componente de búsqueda y visualización de artículos.
 * * Este componente actúa como controlador de la vista de búsqueda. Gestiona el término
 * de búsqueda ingresado y decide si mostrar una galería de resultados específicos
 * o una vista de artículos generales (por defecto).
 *
 * @component
 * @example
 * return (
 * <BuscarArticulo />
 * )
 */
export const BuscarArticulo = () => {
   
    const [titulo, setTitulo] = useState(null)
    const [error, setError] = useState(null)

    /**
     * Valida y actualiza el término de búsqueda.
     * Se pasa como prop al componente `Formulario`.
     * * @param {string} busqueda - El texto ingresado por el usuario en el buscador.
     * @returns {void}
     */
    const handleTitulo = (busqueda) => {
        setError(null)
        if (!busqueda) {
            setError({ mensaje: 'La búsqueda está vacía', detalles: 'Escribe un artículo que te pueda interesar.' })
            return //para no ejecutar el resto del codigo
        }
        setTitulo(busqueda)
    }

    /**
     * Valida y actualiza el término de búsqueda.
     * Se pasa como prop al componente `Formulario`.
     * * @param {string} busqueda - El texto ingresado por el usuario en el buscador.
     * @returns {void}
     */
    const borrarError = () =>{
        setError(null)
    }

  return (
    <div className='buscarContainer'>
        <Formulario className='formulario' buscador={handleTitulo}/>

        {error && (
            <Errores mensaje={error.mensaje} />
        )}

        {titulo
            ? (<GaleriaArticulos titulo={titulo} clearError = {borrarError}/>)
            : (<MostrarArticulos/>)
         }

    </div>
  )
}
