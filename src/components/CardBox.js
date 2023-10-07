import React, { useState } from "react";
// import  Card  from './Card';
import styled from "styled-components";
import { UserData } from "../data";
import BarChart from "./BarChart";
import { Progress } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import sunrise from "../img/sunrise.png";
import sunset from "../img/sunset.png";
import  Data  from "../api.json";

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
 height:25vh;
  border-radius: 5%;
 
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
  border-radius:16px;
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
  text-align:center;
`;
const Titulo = styled.h3`
  
  font-size: 16px;
  text-align:center;
`;
function CardBox() {
  //h humedad
    const averageRelativeHumidity =Data.hourly.relativehumidity_2m.reduce((acc, value) => acc + value, 0) /
    Data.hourly.relativehumidity_2m.length;
  const [userhData, setUserhData] = useState(averageRelativeHumidity.toFixed(0));
  //wv wind velocity
  const [userwvData, setUserwvData] = useState(Data.daily.windspeed_10m_max);
  //aq air quality
  // const [useraqData, setUseraqData] = useState([105, "Unhealtly"]);

  const rangeMappings = {
  "0-50": ["Buena", "green"],
  "51-100": ["Moderada", "yellow"],
  "101-150": ["Insalubre para grupos sensibles", "orange"],
  "151-200": ["Insalubre", "red"],
  "201-300": ["Muy insalubre", "gray"],
  "301-500": ["Peligrosa", "black"],
};

// const valor = 151;
//Valor lo asigno en un calculo promedio
const valor =(Data.hourly.european_aqi.reduce((acc, value) => acc + value, 0) /
    Data.hourly.european_aqi.length).toFixed(0);

// Función para obtener la codificación basada en el valor
function codificarCalidadDelAire(valor) {
  for (const rango in rangeMappings) {
    const [descripcion, color] = rangeMappings[rango];
    const [min, max] = rango.split("-").map(Number);

    if (valor >= min && valor <= max) {
      return [valor, descripcion, color];
    }
  }
}


  const [useraqData, setUseraqData] = useState(codificarCalidadDelAire(valor));

  //calcular porcentaje para hacer la grafica suponiendo que 300 es lo peor entonces lo divido directamente ene la tabla por osea valor *100/300 seria  1/3

  //v visibility
    const averageVisibility =Data.hourly.visibility.reduce((acc, value) => acc + value, 0) /
    Data.hourly.visibility.length;

  const [uservData, setUservData] = useState((averageVisibility/1000).toFixed(1));
  //uv indice uv
  const [useruvData, setUseruvData] = useState(Data.daily.uv_index_max);

const cadena1=Data.daily.sunrise[0].slice(11, 16);
console.log('Estado'+cadena1);
console.log(typeof(cadena1));

const cadena2=-3;
  const [usersriseData, setUsersriseData] = useState((Data.daily.sunrise[0].slice(11, 16)));
  const [usersrssetData,setUserssetData] = useState(Data.daily.sunset[0].slice(11, 16));

  //VISIBILITY EN KM;
  //VIENTO KM/H
  //AIRQUALITY 0-120
  //HUMEDAD DE 0 A 100
  //INDICE UV DE 0 A 15

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
             style={{padding:"0px", maxHeight: "18vh" }} 
          />
        </Columna>
      </Card>
      <Card>
        <Titulo>Viento</Titulo>
        <Columna>
          <Numero>{userwvData} </Numero>
          <Unidad>{Data.daily_units.windspeed_10m_max}</Unidad>
        </Columna>
        <Parrafo> Se esperan vientos fuertes</Parrafo>
      </Card>
      <Card>
        <Titulo>Calidad de aire</Titulo>
        <Columna>
          <Numero>{useraqData[0]} </Numero>
          <Progress.Line
            percent={(useraqData[0])}
            strokeColor={useraqData[2]}
            vertical={true}
            showInfo={false}
            strokeWidth={16}
             style={{ padding:"0px", maxHeight: "14vh" }} 
          />
        </Columna>
        <Parrafo> {useraqData[1]}</Parrafo>
      </Card>
    </CardBoxDiv>
  );
}

export default CardBox;
