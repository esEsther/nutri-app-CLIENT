import { Header } from "../Components/Header";
import {Footer } from "../Components/Footer"

/**
 * Componente de estructura principal (Wrapper).
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Elementos o componentes que se renderizarán 
 * dentro del contenedor principal (etiqueta `<main>`).
 * * @returns {JSX.Element} Estructura HTML con Header, Main y Footer.
 */
export const Layout = ({ children }) => {
  return (
    <>
    <div className="layout">
      <Header />
      <main className="app-container">
        {children}
      </main>
      < Footer/>
      </div>
    </>
  );
};
