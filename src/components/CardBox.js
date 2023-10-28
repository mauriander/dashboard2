import React, { useState, useEffect } from "react";
// import  Card  from './Card';
import styled from "styled-components";
import {FaEye, FaWind } from "react-icons/fa";
import BarChart from "./BarChart";
import { Progress } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import sunrise from "../img/sunrise.png";
import sunset from "../img/sunset.png";
//import  Data  from "../api.json";

const CardBoxDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  align-items: center;
  background: transparent;
  background: rgba(255, 255, 255, 0.1);

  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 3fr);
  }
`;
const Card = styled.div`
  width: 20vh;
  height: 25vh;
  border-radius: 5%;
  margin: 2px;
  z-index: 1;
  top: 1em;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(160px);
  @media (max-width: 480px) {
    margin: 6px;
  }
`;
const Barradiv = styled.div`
  place-items: center;
  width: 160px;
  height: 90px;
  border-radius: 5%;
  border-radius: 16px;
`;
const Numero = styled.h3`
  font-weight: bold;
  color: purple;
  font-size: 16px;
`;
const Unidad = styled.h6`
  text-align: center;
  font-size: 10px;
  color: light-purple;
`;
const Columna = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const Parrafo = styled.p`
  font-size: 10px;
  text-align: center;
`;
const Titulo = styled.h3`
  font-size: 16px;
  text-align: center;
`;

function CardBox({Data}) {
  const [userhData, setUserhData] = useState(null);
  const [userwvData, setUserwvData] = useState(null);
  // const [useraqData, setUseraqData] = useState(null);
  const [uservData, setUservData] = useState(null);
  const [useruvData, setUseruvData] = useState(null);
  const [usersriseData, setUsersriseData] = useState(null);
  const [usersrssetData, setUserssetData] = useState(null);
 // const [Data, setData] = useState(null);
  // useEffect(() => {
  //   fetch(
  //     "https://api.open-meteo.com/v1/forecast?latitude=-31.4135&longitude=-64.181&hourly=temperature_2m,relativehumidity_2m,weathercode,visibility,temperature_80m,temperature_120m,temperature_180m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,windspeed_10m_max&current_weather=true&timezone=America%2FSao_Paulo"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data);
  //     })
  //     .catch((ex) => {
  //       console.error(ex);
  //     });
  // }, []);

  useEffect(() => {
     if (Data) {
      const averageRelativeHumidity =
        Data.hourly.relativehumidity_2m.reduce((acc, value) => acc + value, 0) /
        Data.hourly.relativehumidity_2m.length;
      setUserhData(averageRelativeHumidity.toFixed(0));

      //wv wind velocity
      setUserwvData(Data.daily.windspeed_10m_max[0]);

      //v visibility
      const averageVisibility =
        Data.hourly.visibility.reduce((acc, value) => acc + value, 0) /
        Data.hourly.visibility.length;
      setUservData((averageVisibility / 1000).toFixed(1));

      //uv indice uv
      setUseruvData(Data.daily.uv_index_max[0]);

      //sunrise and sunset
      setUsersriseData(Data.daily.sunrise[0].slice(11, 16));
      setUserssetData(Data.daily.sunset[0].slice(11, 16));
     }
   }, [Data]);

   if (Data === null) {
    return <div>Loading...</div>;
   }

  //aq air quality

  // //Valor lo asigno en un calculo promedio
  //  const valor =(Data.hourly.european_aqi.reduce((acc, value) => acc + value, 0) /
  //      Data.hourly.european_aqi.length).toFixed(0);
   const valor = 65;
   const rangeMappings = {
     "0-50": ["Buena", "green"],
     "51-100": ["Moderada", "yellow"],
   "101-150": ["Insalubre para grupos sensibles", "orange"],
   "151-200": ["Insalubre", "red"],
  "201-300": ["Muy insalubre", "gray"],
   "301-500": ["Peligrosa", "black"],
 }
   function codificarCalidadDelAire(valor) {
     for (const rango in rangeMappings) {
       const [descripcion, color] = rangeMappings[rango];
     const [min, max] = rango.split("-").map(Number);
       if (valor >= min && valor <= max) {
         return [valor, descripcion, color];
       }
     }
   }


    const rangeMappingsV = {
     "0-5": ["Brisas suaves","yellow"],
     "5-11": ["Vientos suaves", "yellow"],
   "11-20": ["Vientos leves", "orange"],
   "21-32": ["Vientos Moderados", "orange"],
  "33-50": ["Vientos fuertes", "red"],
   "50-500": ["Vientos muy fuertes", "red"],
 }
   function codificarViento(valor) {
     for (const rango in rangeMappingsV) {
       const [descripcion, color] = rangeMappingsV[rango];
     const [min, max] = rango.split("-").map(Number);
       if (valor >= min && valor <= max) {
         return [valor, descripcion, color];
       }
     }
   }
   

  // setUseraqData(codificarCalidadDelAire(valor));
  //calcular porcentaje para hacer la grafica suponiendo que 300 es lo peor entonces lo divido directamente ene la tabla por osea valor *100/300 seria  1/3

  // Función para obtener la codificación basada en el valor

  return (
    <CardBoxDiv>
      <Card>
        <Titulo>Indice UV</Titulo>
        <Columna>
          <Numero>{useruvData} </Numero>
        </Columna>
        <Progress.Line
          percent={(useruvData * 100) / 15}
          strokeColor={"#f9d423"}
          vertical={false}
          showInfo={false}
          strokeWidth={16}
        />
      </Card>
      <Card>
        <Titulo>Puesta del sol</Titulo>
        <Columna>
          <Numero>{usersriseData} </Numero>
          <Unidad>AM</Unidad>
          <img src={sunrise} alt="Clima" style={{ width: "7vh" }} />
        </Columna>
        <Columna>
          <Numero>{usersrssetData} </Numero>
          <Unidad>PM</Unidad>
          <img src={sunset} alt="Clima" style={{ width: "7vh" }} />
        </Columna>
      </Card>

      <Card>
        <Titulo>VIisibilidad</Titulo>
        <Columna>
          <Numero>{uservData} </Numero>
          <Unidad>km</Unidad>
          </Columna>
          <Parrafo><FaEye style={{ fontSize: '20px' }}/></Parrafo>
        
      </Card>
      <Card>
        <Titulo>Humedad</Titulo>
        <Columna>
          <Numero>{userhData} </Numero>
          <Unidad>{Data.hourly_units.relativehumidity_2m}</Unidad>
          <Progress.Line
            percent={userhData}
            strokeColor={" #f9d423"}
            vertical={true}
            showInfo={false}
            strokeWidth={20}
            style={{ padding: "0px", maxHeight: "18vh" }}
          />
        </Columna>
      </Card>
      <Card>
        <Titulo>Viento</Titulo>
        <Columna>
          <Numero>{userwvData} </Numero>
          <Unidad>{Data.daily_units.windspeed_10m_max}</Unidad>
        </Columna>
        <Parrafo> {codificarViento(userwvData)[1]}   </Parrafo>
         <Parrafo>
    <FaWind style={{ color: codificarViento(userwvData)[2], fontSize: '20px' }} />
  </Parrafo>
      </Card>
      <Card>
        <Titulo>Calidad de aire</Titulo>
        <Columna>
          <Numero>{95} </Numero>
          <Progress.Line
            percent={95/3}
            strokeColor={"orange"}
            vertical={true}
            showInfo={false}
            strokeWidth={16}
            style={{ padding: "0px", maxHeight: "14vh" }}
          />
        </Columna>
        <Parrafo> {"Moderado"}</Parrafo>
      </Card>
    </CardBoxDiv>
  );
}

export default CardBox;
