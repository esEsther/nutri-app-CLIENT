

import React from 'react';
import { Header } from '../Components/Header';
import { MostrarArticulos } from '../Components/MostrarArticulos';
import { ArtculosHome } from '../Components/ArtculosHome';
import { RecetasHome} from '../Components/RecetasHome';
// import './css/HomePage.css'

export const HomePage = () => {

  return (
    <>
    <p>Bienvenido al Home page</p>
      <div className="home-container">
        {/* <img alt="baner" class="" src="http://localhost:7001/upload/5b74d460-abf6-424d-9410-c0fe31535eb0.png"></img> */}
        
        {/* <MostrarArticulos /> */}
        
        <ArtculosHome/>
        <RecetasHome/>
        
      </div>
    </>
   
  );
};
