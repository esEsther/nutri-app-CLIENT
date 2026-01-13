import { Header } from "../Components/Header";
import {Footer } from "../Components/Footer"

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="app-container">
        {children}
      </main>
      < Footer/>
    </>
  );
};
