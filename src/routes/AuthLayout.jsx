import React from 'react'
import {Outlet} from "react-router-dom"
import { Header } from '../Components/Header'

/**
 * Layout
  ** Utiliza el componente {@link Outlet} 
 * de react-router-dom para renderizar las sub-rutas configuradas.
 * @component
 * @returns {JSX.Element} Un fragmento de React que contiene el Outlet para las rutas hijas.
 */
export const AuthLayout = () => {
  return (
    <>
         <Outlet/>
    </>
    
  )
}
