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


  // useEffect(()=>{
  //   const fetchArticulo = async () => {
  //           try {
  //               const resp = await conectar(`${urlBase}/admin/articulo/${id}`,
  //                   'GET',
  //                   null,
  //                   token
  //               )

  //               if (!resp.ok) {
  //                   return setError("error al cargar el artículo")
  //               }

  //               const data = await resp.json()
  //                setArticulo({
  //                   titulo: data.titulo,
  //                   contenido: data.contenido,
  //                   });
  //          } catch (error) {
  //              setError(error.message);
  //       };

  //       } 
  //   fetchArticulo();
  // }, [id]);

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
        setError(null);
        try {
          await editarArticulo({titulo: articulo.titulo,
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
