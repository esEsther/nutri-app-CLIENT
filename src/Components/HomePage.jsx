// import React from 'react'
// import { Header } from './Header'
// import { MostrarArticulos } from './MostrarArticulos'
// export const HomePage = () => {
//   return (
//     <div>
//         <Header/>
        
//         <h1>Dashboard Home page</h1>
//       <p>Bienvenido al Home page</p>
//       <MostrarArticulos/>
        
//     </div>
//   )
// }

import React from 'react';
import { Header } from './Header';
import { MostrarArticulos } from './MostrarArticulos';
import './css/HomePage.css';

export const HomePage = () => {
  return (
    <div className="home-container">
      
      <h1 className="home-title">Dashboard Home page</h1>
      <p className="home-subtitle">Bienvenido al Home page</p>
      <MostrarArticulos />
    </div>
  );
};
