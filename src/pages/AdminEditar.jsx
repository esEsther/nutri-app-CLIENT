import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import conectar from "../helpers/fetch"
import { adminActions } from "../hooks/adminActions"

export const AdminEditar = () => {
  const { id } = useParams();
  // console.log(id, ': este el id del artículo que quiero editar')
  const [imagen, setImagen] = useState(null);
  const [articulo, setArticulo] =useState({ titulo: "", contenido: ""})
  const {editarArticulo,token,user } = adminActions()
  const [error, setError] =useState(null)
  const urlBase = import.meta.env.VITE_BACKEND_URL


  useEffect(()=>{
    const fetchArticulo = async () => {
            try {
                const resp = await conectar(`${urlBase}/admin/articulo/${id}`,
                    'GET',
                    null,
                    token
                )
                console.log(resp, 'resp desde fetch articulo')
                if (!resp) {
                     setError("error al cargar el artículo")
                     return
                }

                
                 setArticulo({
                    titulo: resp.titulo,
                    contenido: resp.contenido,
                    });
                    console.log(resp.imagen)
                setImagen(resp.imagen)
                
                

           } catch (error) {
               setError(error.message);
        };

        } 
    fetchArticulo();
  }, [id,token]);

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleChange = (e) => {
        setArticulo({
        ...articulo,
        [e.target.name]: e.target.value,
        });
    };

  const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('hola desde handleSubmit', articulo, imagen)
        setError(null);
        try {
          await editarArticulo({id,
                                titulo: articulo.titulo,
                                contenido: articulo.contenido,
                                imagen})
          
        } catch (error) {
          console.log(error)
        }
  }

  if (error) return <p className="error">{error}</p>;

  return (
    <main className="containerEditar">
      <p className="tituloWeb">Editar artículo</p>

      {error && <p className="error">{error}</p>}

      <form className="formEditar" onSubmit={handleSubmit}>
        <label>Título</label>
        <input
          type="text"
          name="titulo"
          value={articulo.titulo}
          onChange={handleChange}
          required
        />

        <label>Imagen</label>
        <input type="file" onChange={handleImageChange} />
        {imagen && typeof imagen === "string" && (
            <img
            //   src={imagen}
            //   alt="Imagen actual"
            // />
            src={typeof imagen === "string"
              ? imagen
              : URL.createObjectURL(imagen)}
            alt="Imagen del artículo"
            style={{ maxWidth: "300px" }}
          />
          )}

        <label>Contenido</label>
        <textarea
          name="contenido"
          rows="8"
          value={articulo.contenido}
          onChange={handleChange}
          required
        />

        <button >
          Guardar Cambios
        </button>
      </form>
    </main>
  )
}
