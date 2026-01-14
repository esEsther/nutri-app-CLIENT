import { AppRoutes } from "./routes/AppRoutes";
import { Layout } from "./routes/Layout";

/**
 * Componente principal de la aplicación.
 * * Actúa como el punto de entrada de la jerarquía de componentes,
 * estableciendo la estructura global mediante el componente {@link Layout}
 * y gestionando la navegación a través de {@link AppRoutes}.
 *
 * @component
 * @returns {JSX.Element} El árbol de componentes de la aplicación.
 */
function App() {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}



export default App