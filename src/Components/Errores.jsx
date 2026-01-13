import PropTypes from 'prop-types';
// import './css/Error.css'

export const Errores = ({ mensaje = 'Ha ocurrido un error', detalles }) => {
  return (
    <div className="error-container">
        <h2 className="error-titulo">Error:</h2>
        <p className="error-mensaje">{mensaje}</p>
        {detalles && (
          <p className="error-detalles">{detalles}</p>
        )}
    </div>
  )
}
Errores.propTypes = {
  message: PropTypes.string,
  details: PropTypes.string
}

