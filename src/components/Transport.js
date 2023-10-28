import React, {useState,useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Icon } from 'react-leaflet';
import SelectorRuta from './SelectorRuta';
import {  FaClock,FaBus, FaHeart} from 'react-icons/fa';
import { BsHeartFill, BsHeart } from "react-icons/bs";
import L from 'leaflet';

function Transport({ ruta }) {
  const [transportData, setTransportData] = useState([]);

  const CLIENT_ID = 'cb6b18c84b3b484d98018a791577af52';
  const CLIENT_SECRET = '3e3DB105Fbf642Bf88d5eeB8783EE1E6';
  const ROUTE_ID = '1468';

  const fetchTransportData = () => {
    fetch(
      `https://apitransporte.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?route_id=${ruta}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    )
      .then((response) => response.json())
      .then((datat) => {
        setTransportData(datat);
        console.log('datat ' + datat[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchTransportData();

    const interval = setInterval(() => {
      fetchTransportData();
    },31000);

    return () => {
      clearInterval(interval);
    };
  }, [ruta]);

   const busIcon = new L.divIcon({
    className: 'custom-icon',
    html: `<div>${<BsHeart />}</div>`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <MapContainer center={[-34.60376, -58.38162]} zoom={10} scrollWheelZoom={false} style={{ height: '90vh', margin: '2px' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {transportData.map((data, index) => (
        <Marker 
     key={index} position={[data.latitude, data.longitude]} >
          <Popup>
            {/* Puedes personalizar la información del marcador aquí utilizando los datos */}
            <div>
              <p>Información adicional:</p>
              <p>Ruta: {data.route_short_name}</p>
              <p>Velocidad: {data.speed}</p>
              <p>IDA 1 / VUELTA 0: {data.direction}</p>
              <p> Empresa: {data.agency_name}</p>
              <p>Destino: {data.trip_headsign}</p>
              <p>ID: {data.id}</p>
              {[data.latitude, data.longitude]}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Transport;