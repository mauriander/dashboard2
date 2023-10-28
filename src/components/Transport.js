import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Icon } from "react-leaflet";
import SelectorRuta from "./SelectorRuta";
import { FaClock, FaBus, FaHeart, FaInfo, FaRoad, FaMarker, FaDirections, FaTachometerAlt, FaMapMarker, FaMapMarked } from "react-icons/fa";

import L from "leaflet";

function Transport({ ruta }) {
  const [transportData, setTransportData] = useState([]);

  const CLIENT_ID = "cb6b18c84b3b484d98018a791577af52";
  const CLIENT_SECRET = "3e3DB105Fbf642Bf88d5eeB8783EE1E6";
  const ROUTE_ID = "1468";

  const fetchTransportData = () => {
    fetch(
      `https://apitransporte.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?route_id=${ruta}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    )
      .then((response) => response.json())
      .then((datat) => {
        setTransportData(datat);
        console.log("datat " + datat[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchTransportData();

    const interval = setInterval(() => {
      fetchTransportData();
    }, 31000);

    return () => {
      clearInterval(interval);
    };
  }, [ruta]);

  const busIcon = new L.divIcon({
    className: "custom-icon",
    html: `<div>${(<FaBus></FaBus>)}</div>`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <MapContainer
      center={[-34.60376, -58.38162]}
      zoom={10}
      scrollWheelZoom={false}
      style={{ height: "90vh", margin: "2px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {transportData.map((data, index) => (
        <Marker key={index} position={[data.latitude, data.longitude]}>
          <Popup>
          
            {/* Puedes personalizar la información del marcador aquí utilizando los datos */}
            <div>
              <span><FaInfo/> Información:</span>
             <p> <span><FaRoad></FaRoad> Ruta: {data.route_short_name}</span></p>
              <p><FaTachometerAlt></FaTachometerAlt>  Velocidad: {data.speed.toFixed(2)}</p>
              <p><FaDirections></FaDirections> Dirección: {data.direction === "1" ? "IDA" : "VUELTA"}</p>
              <p> <FaBus/> Empresa: {data.agency_name}</p>
              <p> <FaMapMarker/> Destino: {data.trip_headsign}</p>

             <a
  href={`https://www.bing.com/maps?cp=${data.latitude}~${data.longitude}&lvl=17.0`}
  target="_blank"
  rel="noopener noreferrer"
>
<FaMapMarked/>  Abrir Mapa
</a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Transport;
