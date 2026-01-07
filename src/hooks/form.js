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