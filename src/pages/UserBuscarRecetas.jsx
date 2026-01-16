import React, { useState } from "react";
import {UserAction} from '../hooks/userAction'
import { Card } from "../Components/Card";
import './css/buscarRecetas.css'
import './css/UserRecetas.css'

/**
 * @typedef {Object} OptionItem
 * @property {string} label - Nombre legible para el usuario (en español).
 * @property {string} value - Valor técnico requerido por la API de Spoonacular.
 */
const INTOLERANCES = [
{ label: "Gluten", value: "gluten" },
  { label: "Lácteos", value: "dairy" },
  { label: "Huevo", value: "egg" },
  { label: "Maní", value: "peanut" },
  { label: "Mariscos", value: "seafood" },
  { label: "Sésamo", value: "sesame" },
  { label: "Soja", value: "soy" },
  { label: "Sulfitos", value: "sulfite" },
  { label: "Frutos secos", value: "tree nut" },
  { label: "Trigo", value: "wheat" }
]


const MICRONUTRIENTS = [
  { label: "Magnesio", value: "magnesium" },
  { label: "Vitamina C", value: "vitaminC" },
  { label: "Omega 3", value: "omega3" },
  { label: "Hierro", value: "iron" },
  { label: "Calcio", value: "calcium" },
  { label: "Zinc", value: "zinc" },
  { label: "Vitamina D", value: "vitaminD" }
];



const DIETS = [
  { label: "Vegana", value: "vegan" },
  { label: "Vegetariana", value: "vegetarian" },
  { label: "Halal", value: "halal" },
  { label: "Keto", value: "keto" },
  { label: "Paleo", value: "paleo" },
  { label: "Baja en azúcar", value: "low-sugar" }
];

/**
 * Componente de búsqueda avanzada de recetas.
 * * Permite a los usuarios buscar recetas utilizando la API de Spoonacular,
 * aplicando filtros de dieta, intolerancias, micronutrientes y parámetros nutricionales.
 * Realiza traducciones automáticas de términos de búsqueda (ES -> EN) y de resultados (EN -> ES).
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.onSelectRecipe - Función callback que se dispara al seleccionar una receta de la lista.
 * * @returns {JSX.Element} Interfaz de búsqueda con formulario de filtros y galería de resultados.
 */
export const UserBuscarRecetas = ({ onSelectRecipe }) => {
  
  // --- ESTADOS DE FILTRO ---
  const [titulo, setTitulo] = useState("");
  const [incluir, setIncluir] = useState("");
  const [excluir, setExcluir] = useState("");
  const [selectedIntolerances, setSelectedIntolerances] = useState([]);
  const [selectedMicronutrients, setSelectedMicronutrients] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [minNutrients, setMinNutrients] = useState({ protein: "", fiber: "", sugar: "" });
  const [maxGlycemicIndex, setMaxGlycemicIndex] = useState("");
  const [maxTime, setMaxTime] = useState("");

  // --- ESTADOS DE CONTROL ---
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState(null);

  // --- HOOKS Y VARIABLES EXTERNAS ---
  const apiKeySpooncular = import.meta.env.VITE_SPOONCULAR;
  const { spooncular, traducir } = UserAction();

 

  /**
   * Agrega o elimina un ítem de un array de selección (checkboxes).
   * @param {string} item - Valor a conmutar.
   * @param {Function} setter - Función de estado (useState) correspondiente.
   */
  const toggleIntolerance = (item) => {
    setSelectedIntolerances(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  /**
   * Agrega o elimina un ítem de un array de selección (checkboxes).
   * @param {string} item - Valor a conmutar.
   * @param {Function} setter - Función de estado (useState) correspondiente.
   */
  const toggleMicronutrient = (item) => {
    setSelectedMicronutrients(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  /**
   * Agrega o elimina un ítem de un array de selección (checkboxes).
   * @param {string} item - Valor a conmutar.
   * @param {Function} setter - Función de estado (useState) correspondiente.
   */
  const toggleDiet = (item) => {
    setSelectedDiets(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };


 /**
   * Construye la cadena de consulta (query string) para la API de Spoonacular.
   * @param {string} titleEN - Título traducido al inglés.
   * @param {string} aIncluirEN - Ingredientes a incluir traducidos.
   * @param {string} aExcluirEN - Ingredientes a excluir traducidos.
   * @returns {string} Query string formateada para la URL.
   */
  const buildQuery = (titleEN, aIncluirEN, aExcluirEN) => {
    const query = new URLSearchParams();
    if (titleEN) query.append("title", titleEN);
    if (aIncluirEN) query.append("includeIngredients", aIncluirEN)
    if (aExcluirEN) query.append("excludeIngredients", aExcluirEN)

    if (selectedIntolerances.length > 0)
      query.append("intolerances", selectedIntolerances.join(","))

    if (selectedDiets.length > 0)
      query.append("diet", selectedDiets.join(","))

    if (maxTime) query.append("maxReadyTime", maxTime)


    if (maxGlycemicIndex) query.append("maxGlycemicIndex", maxGlycemicIndex)

    // Nutrientes mínimos existentes
    Object.entries(minNutrients).forEach(([key, value]) => {
      if (value) query.append(`min${key.charAt(0).toUpperCase() + key.slice(1)}`, value)
    });

    // Añadir micronutrientes seleccionados con valor mínimo 20
    selectedMicronutrients.forEach(micro => {
      query.append(`min${micro.charAt(0).toUpperCase() + micro.slice(1)}`, 20)
    });
    //  query.append("number", pageSize);
    // query.append("offset", (page - 1) * pageSize);

    if (apiKeySpooncular) query.append("apiKey", apiKeySpooncular)
    return query.toString();
  };


 /**
   * Procesa el formulario de búsqueda.
   * 1. Traduce los términos de búsqueda al inglés.
   * 2. Consulta la API externa.
   * 3. Traduce los títulos de los resultados de vuelta al español.
   * @async
   * @param {React.FormEvent} e - Evento de submit del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {

      const title = titulo? await traducir(titulo) : ''
      const aIncluir = incluir? await traducir(incluir) : ''
      const aExcluir = excluir ? await traducir(excluir) : ''

      //al ser asycrono, no le llegan los estados, le pasamos los valores
      const query = buildQuery( title, aIncluir, aExcluir);
     
      const queryApasar = '/complexSearch?'+query
      console.log(queryApasar)
      const resp = await spooncular(queryApasar)
     
      const recetasTraducidas = await Promise.all(
      resp.results.map(async (receta) => {
        const tituloTraducido = await traducir(receta.title, "EN", "ES");

        return {
          id: receta.id,
          titulo: tituloTraducido,
          imagen_url: receta.image
        };
      })
    );

      setRecetas(recetasTraducidas); // array de recetas
 
    } catch (error) {
      console.log("Error al buscar recetas", error)
      setError(error)
    } finally {
      setLoading(false);
    }
  };



  return (
  <div className="user-buscar-recetas">
    <h2>Buscar Recetas</h2>

    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      {/* BÚSQUEDA PRINCIPAL */}
      <input
        type="text"
        placeholder="Título de la receta"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <div style={{ marginTop: "1rem" }}>
        <button
          type="button"
          onClick={() => setShowFilters(true)}
          style={{ marginRight: "1rem" }}
        >
          Filtros avanzados
        </button>

        <button type="submit">Buscar</button>
      </div>
    </form>

    {/* POPUP DE FILTROS */}
    {showFilters && (
      <div className="modal-overlay">
        <div className="modal">
          <h3>Filtros de búsqueda</h3>

          {/* Ingredientes a incluir */}
          <input
            type="text"
            placeholder="Ingredientes a incluir (separados por coma)"
            value={incluir}
            onChange={(e) => setIncluir(e.target.value)}
          />

          {/* Ingredientes a excluir */}
          <input
            type="text"
            placeholder="Ingredientes a excluir (separados por coma)"
            value={excluir}
            onChange={(e) => setExcluir(e.target.value)}
          />

          {/* Intolerancias */}
          <div>
            <p>Intolerancias / preferencias:</p>
            <div className="toggle">
              
              {INTOLERANCES.map(({ label, value }) => (
                <label key={value} style={{ marginRight: "1rem" }}>
                  <input
                    type="checkbox"
                    checked={selectedIntolerances.includes(value)}
                    onChange={() => toggleIntolerance(value)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Dietas */}
          
          <div>
            <p>Dietas:</p>
            <div className="toggle">
              {DIETS.map(({ label, value }) => (
                <label key={value} style={{ marginRight: "1rem" }}>
                  <input
                    type="checkbox"
                    checked={selectedDiets.includes(value)}
                    onChange={() => toggleDiet(value)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>


          {/* Micronutrientes */}
          
          <div>
            <p>Micronutrientes:</p>
            <div className="toggle">
              {MICRONUTRIENTS.map(({ label, value }) => (
                <label key={value} style={{ marginRight: "1rem" }}>
                  <input
                    type="checkbox"
                    checked={selectedMicronutrients.includes(value)}
                    onChange={() => toggleMicronutrient(value)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>


          {/* Tiempo*/}
          <input
            type="number"
            placeholder="Tiempo máximo (min)"
            value={maxTime}
            onChange={(e) => setMaxTime(e.target.value)}
          />

          {/* Índice glucémico */}
          <input
            type="number"
            placeholder="Índice glucémico máximo"
            value={maxGlycemicIndex}
            onChange={(e) => setMaxGlycemicIndex(e.target.value)}
          />

          {/* Nutrientes */}
          <input
            type="number"
            placeholder="Proteína mínima (g)"
            value={minNutrients.protein}
            onChange={(e) =>
              setMinNutrients({ ...minNutrients, protein: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Fibra mínima (g)"
            value={minNutrients.fiber}
            onChange={(e) =>
              setMinNutrients({ ...minNutrients, fiber: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Azúcar máxima (g)"
            value={minNutrients.sugar}
            onChange={(e) =>
              setMinNutrients({ ...minNutrients, sugar: e.target.value })
            }
          />

          {/* BOTONES MODAL */}
          <div style={{ marginTop: "1rem" }}>
            <button type="button" onClick={() => setShowFilters(false)}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    )}

    {loading && <p>Cargando recetas...</p>}

    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {recetas.map((receta) => (
        <Card
          key={receta.id}
          recipe={receta}
          onSelect={onSelectRecipe}
        />
      ))}
    </div>
  
  </div>
);
}