// src/components/ArticuloCards.jsx
import { useNavigate, useLocation } from 'react-router-dom';
// import './css/MostrarArticulos.css';

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
