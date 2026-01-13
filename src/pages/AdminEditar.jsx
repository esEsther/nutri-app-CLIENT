import { useState, useEffect, useRef, forwardRef } from "react"
import { useParams } from "react-router-dom"
import conectar from "../helpers/fetch"
import { adminActions } from "../hooks/adminActions"
import { EditorDetexto } from "../Components/EditorDeTexto"
import { Errores } from "../Components/Errores"

export const AdminEditar = () => {
  const { id } = useParams();
  // console.log(id, ': este el id del artículo que quiero editar')
  const [imagen, setImagen] = useState(null);
  const [articulo, setArticulo] =useState({ titulo: "", contenido: ""})
  const {editarArticulo,token,user } = adminActions()
  const [error, setError] =useState(null)
  const urlBase = import.meta.env.VITE_BACKEND_URL
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const editor = useRef(null);


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
                  
                setImagen(resp.imagen)
                setContenido(resp.contenido)
                
                

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
         const resp =  await editarArticulo({id,
                                titulo: articulo.titulo,
                                contenido: articulo.contenido,
                                imagen})
                       
          
        } catch (error) {
          console.log(error)
          setError({ mensaje: 'Error al editar el artículo, detalles}'})
        }
  }

  // if (error) return <p className="error">{error}</p>;

  return (
    <main className="containerCrear">
      <p className="pcrear">Editar artículo</p>

      {error && (<Errores mensaje={error.mensaje} /> )}

      <form className="formularioCrear" onSubmit={handleSubmit}>
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
            alt={articulo.titulo}
            style={{ maxWidth: "300px" }}
          />
          )}

        <label>Contenido</label>
       
        <EditorDetexto id='editor'
           ref={editor}
           value={articulo.contenido}
           onBlur={(newContent) => setArticulo(prev => ({ ...prev, contenido: newContent }))} // actualizamos el articulo directamente
         />


        <button >
          Guardar Cambios
        </button>
      </form>
    </main>
  )
}
