import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"

import {jwtDecode} from "jwt-decode"
import {useNavigate} from "react-router-dom"
import conectar from "../helpers/fetch"


const urlBase = import.meta.env.VITE_BACKEND_URL

export const adminActions = () => {

    const { user, token} = useContext(UserContext)
    const [error, setError] =useState(null)
   
    
    
    const navigate = useNavigate()

    const crearArticulo = async ({titulo, contenido, imagen}) => {
        try {
            const formData = new FormData();
            formData.append("titulo", titulo);
            formData.append("imagen", imagen);
            formData.append("contenido", contenido)
           
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/crearArticulo`, {
                                        method: "POST",
                                        body: formData,
                                        headers: token ? { Authorization: `Bearer ${token}` } : {},
                                     });

            if (!resp.ok) {
                const data = await resp.json();
                const msg = data.errors
                ? Object.values(data.errors).map((e) => e.msg).join("; ")
                : data.msg || "Error al crear el artículo.";
                setError(msg);
                return;
            }

            //   navigate(-1)
            navigate('/admin/todosLosArticulos');

        } catch (error) {
            console.error("Error al crear película:", error);
            setError("Error interno del servidor al procesar la subida.");
        } finally {
            
        }
    }

   
    const editarArticulo = async ({titulo, contenido, imagen}) => {
        try {
            const formData = new FormData();
            formData.append("titulo", titulo);
            formData.append("contenido", contenido);
            formData.append("imagen", imagen);
            

            const resp = await fetch(`${API_BASE_URL}/editArticle/${id}`, {
                                    method: "POST",
                                    body: formData,
                                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                                    });

            if (!resp.ok) {
                const errorData = await resp.json();
                throw new Error(errorData.msg || "Error al actualizar el artículo");
            }

            navigate("/admin/articles");
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    };

    const eliminarArticulo = async(id) => {
        try {
            const resp = await conectar(`${urlBase}/admin/eliminarArticulo/${id}`,
                                        'DELETE',
                                        null,
                                        token
                                        )
             return resp                           
                                        
        } catch (error) {
            console.log(error, 'Ha habido un error al eliminar el artículo'       )
            return error
        }
    }



  return {
    user,
    error,
    token,
    crearArticulo,
    editarArticulo,
    eliminarArticulo
    }
}


   