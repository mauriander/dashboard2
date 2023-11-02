import React, { useState, useEffect } from 'react';

const MiniMap = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]); // Inicializar como un arreglo vacío

  useEffect(() => {
    if (searchTerm) {
      // Función para buscar ciudades desde la API de Open Meteo
      const searchCities = async () => {
        try {
          const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?=name${searchTerm}`
          );
          const data = await response.json();
          setSearchResults(data.features);
        } catch (error) {
          console.error('Error al buscar ciudades:', error);
        }
      };
      searchCities();
    } else {
      setSearchResults([]); // Limpiar los resultados cuando no hay término de búsqueda
    }
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Escribe el nombre de la ciudad..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {searchResults.map((result) => (
          <li key={result.properties.id}>
            {result.properties.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MiniMap;
