import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {adminActions} from '../hooks/adminActions'

export const AdminCrear = () => {
    const navigate = useNavigate()
    const {crearArticulo} = adminActions()

    const [titulo, setTitulo] = useState('')
    const [imagen, setImagen] = useState(null)
    const [contenido, setContenido] = useState('')

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imagen || !titulo || !contenido) {
            setError("Debe rellenar todos los campos");
            return;
        }

        setLoading(true);
        setError(null);

        try {
          await crearArticulo({titulo, contenido, imagen});
        } catch (error) {
          setError(error)
        }
    };
    
  return (
    <main className="containerCrear">
      <p className="tituloWeb">Crear un Artículo</p>

      {error && (
        <p style={{ color: "red", padding: "10px", border: "1px solid red", marginBottom: "15px" }}>
          {error}
        </p>
      )}

      
      <form className="formularioCrear" onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="titulo">Título</label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <label htmlFor="imagen">Imagen del Artículo</label>
        <input
          type="file" //para que se carge
          id="imagen"
          name="imagen"
          accept="image/*" //Limita el selector para que solo muestre imágenes.Incluye .png, .jpg, .jpeg, .gif
          onChange={(e) => setImagen(e.target.files[0])}
          required
        />




        <label htmlFor="contenido">Cuerpo del artículo</label>
        <textarea
          id="contenido"
          rows="20"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          required
        />

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Guardando..." : "Guardar Articulo"}
        </button>
      </form>
    </main>   
  )
}
