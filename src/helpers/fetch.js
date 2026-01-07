const conectar = async (urlApi, method = 'GET', body = null, token = null) => { //(ponemos unas variables por defecto)
  try {
    const options = {
      method,
      headers: { // le mandamos al back el content type y esperamos recibir una app/json
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      options.headers.Authorization = `Bearer ${token}`; //añade a los headers la autorización
      options.credentials = 'include'; //  "Para esta solicitud, incluye mis credenciales (como cookies, encabezados de autorización, certificados)"
    }

    if (body && ['POST', 'PUT'].includes(method)) {
      options.body = JSON.stringify(body); //se envía el body hecho cadena
    }

    const resp = await fetch(urlApi, options);
    // const datos = await resp.json();

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
    

    // if (!resp.ok) {
    //   return new Error(datos.message || 'Error en la petición');
    // }

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


