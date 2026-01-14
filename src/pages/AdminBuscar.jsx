import { useContext, useState } from 'react'
import { Formulario } from '../Components/Formulario'
import { Errores } from '../Components/Errores'
import { MostrarUsuarios } from '../Components/MostrarUsuarios'
import { GaleriaUsuarios } from '../Components/GaleriaUsuarios'
import { UserContext } from '../contexts/UserContext'
  
/**
 * @typedef {Object} SearchError
 * @property {string} mensaje - Título o resumen corto del error.
 * @property {string} detalles - Explicación detallada de cómo corregir el error.
 */

/**
 * Componente de administración para buscar y gestionar usuarios.
 * * Proporciona una interfaz que alterna entre la visualización de todos los usuarios
 * y los resultados específicos de una búsqueda basada en el nombre.
 * * @component
 */
export const AdminBuscar = () => {
    const [nombre, setNombre ] = useState(null)
    const [error, setError] = useState(null)
    
    /**
     * Procesa el criterio de búsqueda enviado desde el componente Formulario.
     * * Si la búsqueda es válida, actualiza el estado 'nombre'. 
     * Si está vacía, dispara un estado de error.
     * * @param {string} usuario - El nombre del usuario a buscar.
     */
    const handleNombre = (usuario) => {
        setError(null)
        //si nuevaCategoria es null, undefined o false
        if (!usuario) {
            setError({ mensaje: 'La búsqueda está vacía', detalles: 'Escribe un nombre de usuario.' })
            return //para no ejecutar el resto del codigo
        }
        setNombre(usuario)
    }

    /**
     * Limpia el estado de error actual.
     */
    const borrarError = () =>{
        setError(null)
    }

    // console.log(nombre)

  return (
    <div>
        <Formulario className='formulario' buscador={handleNombre}/>

        {/* Visualización de errores de búsqueda */}
            
        {error && (
            <Errores mensaje={error.mensaje} detalles={error.detalles} />
        )}

        {/* Renderizado condicional:
                1. Si hay un 'nombre', se muestra la galería de resultados filtrados.
                2. Si no hay búsqueda, se muestran todos los usuarios por defecto.
            */}
        {nombre
            ? (<GaleriaUsuarios usuario={nombre} clearError = {borrarError}/>)
            : (<MostrarUsuarios/>)
         }


    </div>
  )
}
