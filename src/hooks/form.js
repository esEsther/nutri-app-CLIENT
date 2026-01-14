/**
 * Generador de manejadores para el envío de formularios de búsqueda.
 * * * Esta es una función de orden superior (Currying) que recibe una función de callback 
 * y retorna el manejador de eventos `onSubmit`.
 * * * Proceso de los datos:
 * 1. Previene el refresco de la página.
 * 2. Extrae los datos mediante `FormData`.
 * 3. Normaliza el texto (quita espacios y convierte a minúsculas).
 * 4. Ejecuta el callback con el término limpio.
 * 5. Resetea el formulario.
 * * @param {Function} buscador - Función callback que recibirá el término de búsqueda procesado.
 * @returns {Function} Una función que acepta un evento de React/DOM (`ev`) como argumento.
 * * @example
 * const onSearch = (termino) => console.log(termino);
 * <form onSubmit={handleSubmit(onSearch)}> ... </form>
 */
const handleSubmit = (buscador) => (ev) => {
    ev.preventDefault();//prevenimos envio del formulario
    const datos = new FormData(ev.currentTarget);// crear un Nuevo From data con los datos cuando hay un evento
    //console.log('datos Formulario',datos)
    //separamos todo en calve valor usando el entri y luego lo converticos ne objeto para sacar el valor de categoria
    const dato  = Object.fromEntries(datos.entries())
    
    const busqueda = dato.busqueda
   
    const sinEspacios = (busqueda).trim();//le quito los espacios

    const nuevaBusqueda = sinEspacios.toLowerCase();//lo pongo en minusculas

    //const nuevaBusqueda = ev.target.titulo.value //Otra forma de coger el dato del formulario

    buscador(nuevaBusqueda)
    
    ev.currentTarget.reset();//luego reseteamos al formulario
}
export default handleSubmit;