
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminActions } from '../hooks/adminActions';
import JoditEditor from 'jodit-react';

import { EditorDetexto } from '../Components/EditorDeTexto';
import { Input } from '../Components/Input';
import { Errores } from '../Components/Errores';


export const AdminCrear = () => {
    const navigate = useNavigate();
    const { crearArticulo } = adminActions();

    const [titulo, setTitulo] = useState('');
    const [imagen, setImagen] = useState(null);
    const [contenido, setContenido] = useState('');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const editor = useRef(null); // referencia al editor


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imagen || !titulo || !contenido) {
            setError("Debe rellenar todos los campos");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await crearArticulo({ titulo, contenido, imagen });
            navigate(`/admin/todosLosArticulos`)
        } catch (error) {
            setError(error.message || "Error al crear el artículo");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="containerCrear">
            <p className='pcrear'>Crear un Artículo</p>

            {error && (
                <Errores mensaje={error} />
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
                    type="file"
                    id="imagen"
                    name="imagen"
                    accept="image/*"
                    onChange={(e) => setImagen(e.target.files[0])}
                    required
                />

                <label htmlFor="contenido">Cuerpo del artículo</label>
               
                <EditorDetexto id='editor'
                    ref={editor}
                    value={contenido}
                    onBlur={(newContent) => setContenido(newContent)}
                />
               

                <button type="submit" className="btn" disabled={loading}>
                    {loading ? "Guardando..." : "Guardar Artículo"}
                </button>
            </form>
        </main>
    );
};
