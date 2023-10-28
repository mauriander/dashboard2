import React, { useState, useEffect } from 'react';
import styled from "styled-components";
function SelectorRuta({ onRouteChange }) {
  const [transportData, setTransportData] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [loading, setLoading] = useState(true);

  const CLIENT_ID = 'cb6b18c84b3b484d98018a791577af52';
  const CLIENT_SECRET = '3e3DB105Fbf642Bf88d5eeB8783EE1E6';

const Divisor = styled.div`
margin-top:6px
  
`;
  useEffect(() => {
    setLoading(true); // Set loading to true while waiting for data

    fetch(`https://datosabiertos-transporte-apis.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`)
      .then((response) => response.json())
      .then((data) => {
        setTransportData(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); 
      });
  }, []);

   const handleRouteChange = (event) => {
    const selectedRouteID = transportData.find((item) => item.route_short_name === event.target.value)?.route_id;
    setSelectedRoute({ name: event.target.value, id: selectedRouteID });
    onRouteChange(selectedRouteID); // Pass the selected route ID to the parent component
  }; 


  return (
    
    <Divisor>
  <select id="routeSelector" onChange={handleRouteChange} style={{ background: 'gray' }}>
    <option value="">Selecciona una ruta</option>
    {loading ? (
      <option value="" disabled>
        LOADING...
      </option>
    ) : (
      [...new Set(transportData.map(item => item.route_short_name))].sort().map((routeName, index) => (
        <option key={index} value={routeName}>
          {routeName} {transportData.find(item => item.route_short_name === routeName)?.trip_headsign}
        </option>
      ))
    )}
  </select>
  {selectedRoute && (
    <p>
      Ruta seleccionada: {selectedRoute.name}
    </p>
  )}
</Divisor>

      
 
  );
}

export default SelectorRuta;
