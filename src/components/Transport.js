import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Icon } from "react-leaflet";
import SelectorRuta from "./SelectorRuta";
import {
  FaClock,
  FaBus,
  FaHeart,
  FaInfo,
  FaRoad,
  FaMarker,
  FaDirections,
  FaTachometerAlt,
  FaMapMarker,
  FaMapMarked,
} from "react-icons/fa";

import L from "leaflet";

function Transport({ ruta }) {
  const [transportData, setTransportData] = useState([]);
  const [latcenter, setLatCenter] = useState(-34.62344);
  const [longcenter, setLongCenter] = useState(-58.479999);
  const [mapKey, setMapKey] = useState(0);

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
        // console.log("datat " + datat.length);
        // const totalDataPoints = datat.length;
        // let totalLatitude = 0;
        // let totalLongitude = 0;

        // for (const data of datat) {
        //     totalLatitude += data.latitude;

        //     totalLongitude += data.longitude;
        //   }

        // setLatCenter((totalLatitude / totalDataPoints).toFixed(7));
        // setLongCenter((totalLongitude / totalDataPoints).toFixed(7));
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

  useEffect(() => {
    const totalDataPoints = transportData.length;
    let totalLatitude = 0;
    let totalLongitude = 0;

    for (const data of transportData) {
      totalLatitude += data.latitude;
      totalLongitude += data.longitude;
    }
    const newLatCenter = totalLatitude / totalDataPoints;
    const newLongCenter = totalLongitude / totalDataPoints;
    //Agregar validacion sino nan
    if (!isNaN(newLatCenter) && !isNaN(newLongCenter)) {
      setLatCenter(newLatCenter.toFixed(6));
      setLongCenter(newLongCenter.toFixed(6));
    } else {
      setLatCenter(-34.62344);
      setLongCenter(-58.479999);
    }

    //Este mapeo lo sugirio chat gpt para incrementar la key y poder pasarla en el marker    key={mapKey}  center={[latcenter, longcenter]}
    setMapKey((prevKey) => prevKey + 1); // Incrementa la clave
    console.log(
      "dentro use efectlat din " +        latcenter +        " vs lat fijo -34.62344       long dinamico" +        longcenter +        " VS long fijo-58.479999"    );
  }, [transportData]);

  console.log(
    "fuera use efect lat din " +      latcenter +      " vs lat fijo -34.62344       long dinamico" +      longcenter +      " VS long fijo-58.479999"  );

  return (
    <MapContainer
      key={mapKey}
      center={[latcenter, longcenter]}
      zoom={11}
      scrollWheelZoom={true}
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
              <span>
                <FaInfo /> Información:
              </span>
              <p>
                {" "}
                <span>
                  <FaRoad></FaRoad> Ruta: {data.route_short_name}
                </span>
              </p>
              <p>
                <FaTachometerAlt></FaTachometerAlt> Velocidad:{" "}
                {data.speed.toFixed(2)}
              </p>
              <p>
                <FaDirections></FaDirections> Dirección:{" "}
                {data.direction === "1" ? "IDA" : "VUELTA"}
              </p>
              <p>
                {" "}
                <FaBus /> Empresa: {data.agency_name}
              </p>
              <p>
                {" "}
                <FaMapMarker /> Destino: {data.trip_headsign}
              </p>
              <p>
                {latcenter} , {longcenter}
              </p>

              <a
                href={`https://www.bing.com/maps?cp=${data.latitude}~${data.longitude}&lvl=17.0`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaMapMarked /> Abrir Mapa
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Transport;
