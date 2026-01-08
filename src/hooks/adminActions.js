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

   
    const editarArticulo = async ({id, titulo, contenido, imagen}) => {
        console.log('hola desde editar artículo hook')
        try {
            const formData = new FormData();
            formData.append("titulo", titulo);
            formData.append("contenido", contenido);
            if (imagen instanceof File) {
                formData.append("imagen", imagen);
            }
            console.log([...formData.entries()]);

            // console.log('formData desde el hook editar: ', formData)
            

            const resp = await fetch(`${urlBase}/admin/editarArticulo/${id}`, {
                                    method: "PUT",
                                    body: formData,
                                    headers: {
                                        ...(token ? { Authorization: `Bearer ${token}` } : {})
                                    },
                                    // headers: token ? { Authorization: `Bearer ${token}` } : {},
                                    });
            console.log('Esta es la resp del fetch', resp)
            // console.log("RESP STATUS", resp.status, resp.ok);

            // try {
            // const data = await resp.json();
            // console.log("RESP JSON", data);
            // } catch(e) {
            // console.log("No hay JSON de respuesta", e);
            // }

            if (!resp.ok) {
                //   const errorData = await resp.json().catch(() => ({}));
                const errorData = await resp.json();
                throw new Error(errorData.msg || "Error al actualizar el artículo");
            }

            navigate("/admin/todosLosArticulos");
        } catch (error) {
            setError(error.message);
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


   