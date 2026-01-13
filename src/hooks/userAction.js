import { UserContext } from "../contexts/UserContext";
import conectar from "../helpers/fetch"
import { useContext, useState } from "react"

const urlbase = import.meta.env.VITE_BACKEND_URL

export const UserAction = () => {

  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, token, urlBase} = useContext(UserContext)

  /**
   * traducir
   * Llama a la API de DeepL para traducir un texto
   *
   * @param {string} text - Texto a traducir
   * @param {string} source - Código del idioma fuente (ES, EN, etc.)
   * @param {string} target - Código del idioma destino (EN, ES, etc.)
   */
  const traducir = async (texto, source = "ES", target = "EN") => {
    if (!texto) return;
    console.log('hola desde traducir, este es el texto: ', texto)
    const body = {
      text: texto,
      source: source,
      target: target,
    }
//  console.log(body)
    setLoading(true);
    setError(null);

    try {
      const resp = await conectar(`${urlbase}/user/traducir`, 'POST', body, token )
    //   const data = await resp.json();
      console.log({resp})
      return resp.data.translations[0].text
    } catch (error) {
      setError(error.message);
      setTranslation("");
    } finally {
      setLoading(false);
    }
}

const spooncular = async (query) => {
    try {
        
        const resp = await conectar(`https://api.spoonacular.com/recipes${query}`)
        return resp
    } catch (error) {
        console.log(error, 'Error al buscar recetas')
    }
}

   const guardarEnFavoritos = async(idAticulo, idReceta)=> {
        try {
            const resp = await conectar(
                `${urlBase}/user/anadirFavoritos`,
                'POST',
                { id_articulo: idAticulo, id_receta: idReceta }, //enviamos el body
                token
            );

            console.log('Guardado en favoritos:', resp);
            return resp;

        } catch (error) {
            console.error('Error al guardar favorito:', error.message);
            return error;
        }
     };

    const eliminarDeFavoritos = async(id_articulo, id_receta) => {
        const id = id_articulo ? id_articulo : id_receta 
        const tipo = id_articulo ? 'articulo' : 'receta'
        // console.log(id, tipo)
        try {
            const resp = await conectar(
               `${urlBase}/user/deleteFavorito/${id}/${tipo}`,
                'DELETE',
                null,
                token 
            )
            return resp
            // console.log('Eliminado de favoritos',  resp)
        } catch (error) {
            console.log(error, 'Ha habido un error al eliminar favoritos')
            return error
        }

    }

    const guardarRecetaEnBd = async(id) => {
        if(!id) return
        try{
            const resp = await spooncular(`/${id}/information`)
            console.log(resp, 'desde el hook guardar')
            const titulo = await traducir(resp.title, "EN", "ES")
            const contenido = await traducir(resp.instructions, "EN", "ES")
            const receta = { 
                                id_receta: id,
                                titulo,
                                imagen_url: resp.image,
                                contenido
                            }
            await conectar(`${urlBase}/user/anadirReceta`,
                'POST',
                receta,
                token
            )
            
        }
        catch(error){
            console.log(error)
        }
    }

    return {
        traducir,
        translation,
        loading,
        error,
        spooncular,
        eliminarDeFavoritos,
        guardarEnFavoritos,
        guardarRecetaEnBd
    }
}