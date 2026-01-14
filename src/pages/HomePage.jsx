

import React from 'react';
import { Header } from '../Components/Header';
import { MostrarArticulos } from '../Components/MostrarArticulos';
import { ArtculosHome } from '../Components/ArtculosHome';
import { RecetasHome} from '../Components/RecetasHome';


/**
 * Componente principal de la página de inicio (Landing Page).
 * * Este componente organiza la disposición visual de la página de bienvenida, 
 * integrando las secciones destacadas de artículos y recetas. 
 * Actúa como el punto de entrada público de la aplicación.
 * * @component
 * @example
 * return (
 * <HomePage />
 * )
 */
export const HomePage = () => {

  return (
    <>
 <section className="banner">
    <div className="banner-overlay">
      <h1>Nutri App</h1>
      <p>Tu página de nutrición de confianza</p>
    </div>
  </section>
      <div className="home-container">
        {/* <img alt="baner" class="" src="http://localhost:7001/upload/5b74d460-abf6-424d-9410-c0fe31535eb0.png"></img> */}
        
        <ArtculosHome/>
        <RecetasHome/>
        
      </div>
    </>
   
  );
};
