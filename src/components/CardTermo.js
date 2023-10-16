import React, { useState } from "react";
import styled from "styled-components";

import ReactSpeedometer from "react-d3-speedometer";
import Gauge from "react-canvas-gauge";
//import  Data  from "../api.json";
import { FaClock, FaMapMarked, FaMapMarker, FaMarker, FaRegHeart, FaThermometer, FaThermometerQuarter, FaWind } from 'react-icons/fa';

// import SpeedoButton from "../speedo-button";
// export const ForceRenderTheComponent = () => <SpeedoButton />;



const Termo2 = styled.div`
  width: 20vh;
  height: 25vh;
`;

const Termo = styled.div`
  width: 90%;
  height: auto;
  padding:8px;
  margin:16px;
  justify-content:center;
  box-shadow: 0 2px 30px rgba(0, 0, 0, 0.2);
  font-size: 24px;

  text-align: center;
  background: transparent;
`;




const Temperatura = styled.div`
  ${'' /* position: absolute; */}
  text-align: center;
  
`;

const Imagen = styled.div`
  width: 116px;
  height: 116px;
  position: absolute;
`;

const Ciudad = styled.div`
display:flex;
 text-align: center;
${'' /* align-items:flex-end; */}
 font-weight: bold;
  
`;

function CardTermo({Data}) {
  // const promedioTemperatura =
  //   UserData.reduce((total, data) => total + data.temperatura, 0) /
  //   UserData.length;
  // const [promedio, setPromedio] = useState(promedioTemperatura.toFixed(0));
// de api josn
const temperaturaactual = Data.current_weather.temperature;
// const [tempact, setTempact] = useState(temperaturaactual.toFixed(1));
const [tempact, setTempact] = useState(Data.current_weather.temperature.toFixed(1));
const [wind, setWind] = useState(Data.current_weather.windspeed.toFixed(1));
const [windd, setWindd] = useState(Data.current_weather.winddirection.toFixed(0));
const [hora, setHora] = useState(Data.current_weather.time.slice(11,16));
  return (
 
    <Termo>
     <Gauge

  mode="gauge"
  size={200}
  enableAnimation={true}
  // animationTimeout={250}
  title="Temp."
  unit={decodeURI('%C2%B0C')}
  minValue={-15}  
  value={tempact}
scaleList={[
  { scale: 5, quantity: 4, startColor: '#2e86c1', endColor: '#7dcea0' }, // Azul a Verde
  { scale: 5, quantity: 4, startColor: '#7dcea0', endColor: '#f7dc6f' }, // Verde a Amarillo
  { scale: 5, quantity: 4, startColor: '#f7dc6f', endColor: '#ff4e50' }  // Amarillo a Rojo
]}
/>
<Ciudad><FaMapMarker/>Cordoba</Ciudad>
 <Temperatura> <FaClock />{hora} &nbsp; <FaThermometerQuarter/>{tempact}{Data.hourly_units.temperature_2m}</Temperatura><Temperatura> <FaWind />{wind}{Data.daily_units.windspeed_10m_max}&nbsp;  {windd}{"º"}</Temperatura>
 
      

    </Termo>
  );
}

export default CardTermo;
