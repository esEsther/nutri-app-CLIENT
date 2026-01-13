import { useContext, useState } from 'react'
import { Formulario } from '../Components/Formulario'
import { Errores } from '../Components/Errores'
import { MostrarUsuarios } from '../Components/MostrarUsuarios'
import { GaleriaUsuarios } from '../Components/GaleriaUsuarios'
import { UserContext } from '../contexts/UserContext'
  
export const AdminBuscar = () => {
    const [nombre, setNombre ] = useState(null)
    const [error, setError] = useState(null)
    

    const handleNombre = (usuario) => {
        setError(null)
        //si nuevaCategoria es null, undefined o false
        if (!usuario) {
            setError({ mensaje: 'La búsqueda está vacía', detalles: 'Escribe un nombre de usuario.' })
            return //para no ejecutar el resto del codigo
        }
        setNombre(usuario)
    }

    const borrarError = () =>{
        setError(null)
    }

    // console.log(nombre)

  return (
    <div>
        <Formulario className='formulario' buscador={handleNombre}/>

        {error && (
            <Errores mensaje={error.mensaje} detalles={error.detalles} />
        )}

        {nombre
            ? (<GaleriaUsuarios usuario={nombre} clearError = {borrarError}/>)
            : (<MostrarUsuarios/>)
         }


    </div>
  )
}
