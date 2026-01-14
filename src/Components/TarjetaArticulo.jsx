import { useNavigate, useLocation } from 'react-router-dom';

/**
 * @typedef {Object} Articulo
 * @property {number|string} id_articulo - Identificador único del artículo.
 * @property {string} titulo - Título descriptivo.
 * @property {string} imagen_url - URL de la imagen de portada.
 */

/**
 * Componente funcional que renderiza una galería de tarjetas de artículos.
 * * Este componente detecta automáticamente el contexto (Admin o Usuario) mediante la URL
 * para mostrar acciones específicas como editar, eliminar o guardar en favoritos.
 * * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Articulo[]} props.articulos - Array de objetos de artículos a mostrar.
 * @param {Function} [props.onFavorito] - Callback ejecutado al guardar un favorito (Contexto Usuario).
 * @param {Function} [props.onEliminar] - Callback ejecutado al borrar un artículo (Contexto Admin).
 */
export const TarjetaArticulo = ({
  articulos,
  onFavorito,
  onEliminar,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isUserRoute = location.pathname.startsWith('/user');
  const isAdminRoute = location.pathname.startsWith('/admin');

  const irDetalle = (id) => {
    navigate(`/articulo/${id}`);
  };

  const handleEditarArticulo = (id) => {
    navigate(`/admin/editarArticulo/${id}`);
  };

  return (
    <div className="articulos-container">
      {articulos.map((articulo) => (
        <div
          key={articulo.id_articulo}
          className="articulo-card"
          onClick={() => irDetalle(articulo.id_articulo)}
        >
          <img
            src={articulo.imagen_url}
            alt={articulo.titulo}
            className="articulo-img"
          />

          <h3 className="articulo-title">{articulo.titulo}</h3>

          {/* Favoritos */}
          {isUserRoute && (
            <button
              onClick={(ev) => {
                ev.stopPropagation();
                onFavorito(articulo.id_articulo);
              }}
            >
              Guardar en Favoritos
            </button>
          )}

          {/* Admin */}
          {isAdminRoute && (
            <>
              <button
                onClick={(ev) => {
                  ev.stopPropagation();
                  handleEditarArticulo(articulo.id_articulo);
                }}
              >
                Editar
              </button>

              <button
                onClick={(ev) => {
                  ev.stopPropagation();
                  onEliminar(articulo.id_articulo);
                }}
              >
                Eliminar
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
