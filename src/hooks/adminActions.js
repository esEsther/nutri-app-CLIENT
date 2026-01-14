import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"
import conectar from "../helpers/fetch"

const urlBase = import.meta.env.VITE_BACKEND_URL

/**
 * Hook personalizado que centraliza las acciones de administración.
 * * Proporciona métodos para la gestión de artículos (CRUD) y usuarios, 
 * manejando la lógica de multipart/form-data para imágenes y la 
 * comunicación con los endpoints protegidos del backend.
 * * @kind function
 * @returns {Object} Un objeto con estados y métodos administrativos.
 */
export const adminActions = () => {

    const { user, token } = useContext(UserContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    /**
     * Crea un nuevo artículo enviando datos e imagen al servidor.
     * * Utiliza `FormData` para permitir la subida de archivos binarios.
     * @async
     * @param {Object} params - Datos del artículo.
     * @param {string} params.titulo - Título del artículo.
     * @param {string} params.contenido - Cuerpo del artículo (HTML).
     * @param {File} params.imagen - Archivo de imagen desde un input file.
     * @returns {Promise<void>}
     */
    const crearArticulo = async ({ titulo, contenido, imagen }) => {
        try {
            const formData = new FormData();
            formData.append("titulo", titulo);
            formData.append("imagen", imagen);
            formData.append("contenido", contenido);

            const resp = await fetch(`${urlBase}/admin/crearArticulo`, {
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
        } catch (error) {
            console.error("Error al crear artículo:", error);
            setError("Error interno del servidor al procesar la subida.");
        }
    };

    /**
     * Actualiza un artículo existente.
     * * Si se proporciona una nueva imagen (instancia de File), se añade al FormData.
     * Redirige a la vista del artículo tras el éxito.
     * @async
     * @param {Object} params - Datos a actualizar.
     * @param {string|number} params.id - ID del artículo.
     * @param {string} params.titulo - Nuevo título.
     * @param {string} params.contenido - Nuevo contenido.
     * @param {File|string} params.imagen - Nueva imagen o URL de la actual.
     */
    const editarArticulo = async ({ id, titulo, contenido, imagen }) => {
        try {
            const formData = new FormData();
            formData.append("titulo", titulo);
            formData.append("contenido", contenido);
            
            if (imagen instanceof File) {
                formData.append("imagen", imagen);
            }

            const resp = await fetch(`${urlBase}/admin/editarArticulo/${id}`, {
                method: "PUT",
                body: formData,
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
            });

            if (!resp.ok) {
                const errorData = await resp.json();
                throw new Error(errorData.msg || "Error al actualizar el artículo");
            }

            navigate(`/articulo/${id}`);
            return resp;
        } catch (error) {
            setError(error.message);
        }
    };

    /**
     * Elimina un artículo de la base de datos.
     * @async
     * @param {string|number} id - ID del artículo a eliminar.
     * @returns {Promise<Object>} Respuesta del servidor.
     */
    const eliminarArticulo = async (id) => {
        try {
            return await conectar(`${urlBase}/admin/eliminarArticulo/${id}`, 'DELETE', null, token);
        } catch (error) {
            console.error(error, 'Error al eliminar el artículo');
            return error;
        }
    };

    /**
     * Elimina un usuario del sistema.
     * @async
     * @param {string|number} id - ID del usuario.
     * @returns {Promise<Object>} Respuesta del servidor.
     */
    const eliminarUsuario = async (id) => {
        try {
            return await conectar(`${urlBase}/admin/eliminarUsuario/${id}`, 'DELETE', null, token);
        } catch (error) {
            console.error(error, 'Error al eliminar usuario');
            return error;
        }
    };

    /**
     * Actualiza la información de un usuario.
     * @async
     * @param {Object} datos - Objeto con ID y campos a actualizar.
     * @returns {Promise<Object>} Respuesta del servidor.
     */
    const editarUsuario = async (datos) => {
        try {
            const { id, ...body } = datos;
            return await conectar(`${urlBase}/admin/editarUsuario/${id}`, 'PUT', body, token);
        } catch (error) {
            console.error(error, 'Error al actualizar el usuario');
            setError(error);
        }
    };

    /**
     * Registra un nuevo usuario desde el panel de administración.
     * @async
     * @param {Object} datos - Datos del nuevo usuario.
     * @returns {Promise<Object>} Respuesta del servidor.
     */
    const crearUsuario = async (datos) => {
        try {
            return await conectar(`${urlBase}/admin/crearUsuario`, 'POST', datos, token);
        } catch (error) {
            console.error(error, 'Error al crear usuario');
            setError(error);
        }
    };

    return {
        user,
        error,
        token,
        crearArticulo,
        editarArticulo,
        eliminarArticulo,
        eliminarUsuario,
        editarUsuario,
        crearUsuario
    };
};