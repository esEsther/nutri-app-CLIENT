

import handleSubmit from '../Hooks/form';

export const Formulario = ({ buscador }) => {
    

  return (
        <form className='formulario' onSubmit={handleSubmit(buscador)}>
          <input type='text' id='busqueda' name='busqueda' placeholder='Qué quieres buscar?'/> 
          <input type = 'submit' />
        </form>
      
  )
}
