
/**
 * Componente de interfaz para la visualización de errores.
 * * Proporciona una estructura visual estandarizada para informar al usuario 
 * sobre fallos en la aplicación, permitiendo mostrar tanto un mensaje 
 * genérico como detalles técnicos específicos.
 * * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} mensajes - Título o mensaje principal del error.
 * @param {string} detalles - Información adicional o técnica sobre el fallo (opcional).
 * * @example
 * <Errores 
 * mensaje="Error al cargar las recetas" 
 * />
 */
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


