  const apiKeySpooncular = import.meta.env.VITE_SPOONCULAR;


  /**
 * Helper universal para realizar peticiones fetch asíncronas.
 * * * Esta función centraliza la lógica de comunicación con la API, manejando
 * automáticamente la serialización de JSON, la configuración de cabeceras
 * de autenticación y la resolución de la respuesta.
 * * @async
 * @function conectar
 * @param {string} url - La URL completa del endpoint al que se realiza la petición.
 * @param {string}  metodo- Método HTTP (GET, POST, PUT, DELETE).
 * @param {Object|null} body - Objeto con los datos a enviar (se convertirá a JSON).
 * @param {string|null} token- Token JWT para cabecera de Authorization.
 * @returns {Promise<Object>} Promesa que resuelve con los datos parseados de la respuesta.
 * @throws {Error} Lanza un error si la respuesta del servidor no es satisfactoria (ok: false).
 */
const conectar = async (urlApi, method = 'GET', body = null, token = null) => { //(ponemos unas variables por defecto)
  try {
    const options = {
      method,
      headers: { // le mandamos al back el content type y esperamos recibir una app/json
        'Content-Type': 'application/json',
      },
    };

    if(urlApi.includes('information')){
      options.headers['x-api-key'] = apiKeySpooncular
    }
    if (token) {
      options.headers.Authorization = `Bearer ${token}`; //añade a los headers la autorización
      options.credentials = 'include'; //  "Para esta solicitud, incluye mis credenciales (como cookies, encabezados de autorización, certificados)"
    }

    if (body && ['POST', 'PUT'].includes(method)) {
      options.body = JSON.stringify(body); //se envía el body hecho cadena
    }
    console.log('antes de hacer fetch')
    const resp = await fetch(urlApi, options);
    console.log({resp}, 'después de hacer fetch')

    //hay acciones que no tiene por que devolver un json
    let datos = null;
    const text = await resp.text(); //pone toda la respuesta como un string 
    if (text) {
      try {
        datos = JSON.parse(text);
        // const datos = await resp.json()
      } catch {
        datos = null;
      }
    }

    if (!resp.ok) {
      return new Error(datos.message || 'Error en la petición');
    }

    return datos;

  } catch (error) {
    console.error('Error de la api: ', error.message);
    return {
      ok: false,
      msg: 'No se pudo conectar con el servidor'
    };
  }
};

export default conectar;


