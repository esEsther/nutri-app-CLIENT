import PropTypes from 'prop-types';

export const Paginacion = ({ valorActual, pagina, accion, totalPaginas }) => {

  const cambiarPagina = () => {
    console.log(totalPaginas);
    const calculo = Math.round(parseInt(totalPaginas)/12);
    console.log(calculo);
    if (accion === 'avanzar') {
      if (valorActual < calculo) {
        pagina(valorActual + 1);
        console.log(valorActual);
      }else{
        pagina(valorActual);
      }
    } else if (accion === 'retroceder') {
      if(valorActual > 1  ) {
        pagina(valorActual - 1);
      }
    } else if (accion === 'ultima'){
      if(valorActual <= calculo){
        pagina(calculo);
      }
    } else if (accion === 'primero'){
      if(valorActual > 1){
        pagina(1);
      }
    }
  }
  return (
    <div className='paginacion'>
      <button onClick={cambiarPagina}>{accion}</button>
    </div>
  )
}

Paginacion.propTypes = {
  valorActual: PropTypes.number,
  pagina: PropTypes.func,
  accion: PropTypes.string,
  totalPaginas: PropTypes.number
}




