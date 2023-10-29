import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Gauge from "react-canvas-gauge";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaClock,
  FaMapMarked,
  FaMapMarker,
  FaMarker,
  FaRegHeart,
  FaThermometer,
  FaThermometerQuarter,
  FaWind,
} from "react-icons/fa";
import CodigoClima from "../imgclima.json";

const Termo2 = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, 1fr);
  font-size: 12px;
`;

const Termo = styled.div`
  width: 90%;
  height: auto;
  padding: 8px;
  margin: 16px;
  justify-content: center;
  box-shadow: 0 2px 30px rgba(0, 0, 0, 0.2);
  font-size: 24px;

  text-align: center;
  background: transparent;

  @media (max-width: 480px) {
    margin: 32px;
    padding: 16px;
    justify-content: center;
    align-items: center;
  }
`;
const ImagenClima = styled.div`
  width: 15vh;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 32px;
`;

const Temperatura = styled.div`
  ${"" /* position: absolute; */}
  text-align: center;
`;

const Imagen = styled.div`
  width: 116px;
  height: 116px;
  position: absolute;
`;

const Ciudad = styled.div`
  display: flex;
  text-align: center;
  ${"" /* align-items:flex-end; */}
  font-weight: bold;
`;

function CardTermo({ Data, city }) {
  // const promedioTemperatura =
  //   UserData.reduce((total, data) => total + data.temperatura, 0) /
  //   UserData.length;
  // const [promedio, setPromedio] = useState(promedioTemperatura.toFixed(0));
  // de api josn
  const temperaturaactual = Data.current_weather.temperature;
  // const [tempact, setTempact] = useState(temperaturaactual.toFixed(1));
  const [tempact, setTempact] = useState(
    Data.current_weather.temperature.toFixed(1)
  );
  const [wind, setWind] = useState(Data.current_weather.windspeed.toFixed(1));
  const [windd, setWindd] = useState(
    Data.current_weather.winddirection.toFixed(0)
  );
  const [hora, setHora] = useState(Data.current_weather.time.slice(11, 16));
  const [ciudad, setCiudad] = useState(city);
  const EstadoClima = Data.current_weather.weathercode;
  const IconoEstadoClima = CodigoClima[EstadoClima].icons;
  //Maximo y minimo para cada dia
  const setMaximo1 = Data.daily.temperature_2m_max[1].toFixed(0);
  const setMinimo1 = Data.daily.temperature_2m_min[1].toFixed(0);
  const IconoEstadoClima1 = CodigoClima[Data.daily.weathercode[1]].icons;
  const setMaximo2 = Data.daily.temperature_2m_max[2].toFixed(0);
  const setMinimo2 = Data.daily.temperature_2m_min[2].toFixed(0);
  const IconoEstadoClima2 = CodigoClima[Data.daily.weathercode[2]].icons;
  const setMaximo3 = Data.daily.temperature_2m_max[3].toFixed(0);
  const setMinimo3 = Data.daily.temperature_2m_min[3].toFixed(0);
  const IconoEstadoClima3 = CodigoClima[Data.daily.weathercode[3]].icons;
  const setMaximo4 = Data.daily.temperature_2m_max[4].toFixed(0);
  const setMinimo4 = Data.daily.temperature_2m_min[4].toFixed(0);
  const IconoEstadoClima4 = CodigoClima[Data.daily.weathercode[4]].icons;
  const setMaximo5 = Data.daily.temperature_2m_max[5].toFixed(0);
  const setMinimo5 = Data.daily.temperature_2m_min[5].toFixed(0);
  const IconoEstadoClima5 = CodigoClima[Data.daily.weathercode[5]].icons;
  const setMaximo6 = Data.daily.temperature_2m_max[6].toFixed(0);
  const setMinimo6 = Data.daily.temperature_2m_min[6].toFixed(0);
  const IconoEstadoClima6 = CodigoClima[Data.daily.weathercode[6]].icons;

  return (
    <Termo>
      <Gauge
        mode="gauge"
        size={200}
        enableAnimation={true}
        // animationTimeout={250}
        title="Temp."
        unit={decodeURI("%C2%B0C")}
        minValue={-15}
        value={tempact}
        scaleList={[
          { scale: 5, quantity: 4, startColor: "#2e86c1", endColor: "#7dcea0" }, // Azul a Verde
          { scale: 5, quantity: 4, startColor: "#7dcea0", endColor: "#f7dc6f" }, // Verde a Amarillo
          { scale: 5, quantity: 4, startColor: "#f7dc6f", endColor: "#ff4e50" }, // Amarillo a Rojo
        ]}
      />
      <Ciudad>
        <FaMapMarker />
        {ciudad}
      </Ciudad>
      <Temperatura>
        {" "}
        <FaClock />
        {hora} &nbsp; <FaThermometerQuarter />
        {tempact}
        {Data.hourly_units.temperature_2m}
      </Temperatura>
      <Temperatura>
        {" "}
        <FaWind />
        {wind}
        {Data.daily_units.windspeed_10m_max}&nbsp;
        <FaArrowDown style={{ transform: `rotate(${windd}deg)` }} />
      </Temperatura>
      <img
        src={IconoEstadoClima}
        alt="Clima"
        style={{
          width: "10vh",
          background: "rgba(0, 0, 0, 0.3)",
          borderRadius: "10vh",
        }}
      />
      <Termo2>
        <img
          src={IconoEstadoClima1}
          alt="Clima"
          style={{
            width: "5vh",
            background: "rgba(0, 0, 0, 0.2)",
            borderRadius: "5vh",
          }}
        />
        <img
          src={IconoEstadoClima2}
          alt="Clima"
          style={{
            width: "5vh",
            background: "rgba(0, 0, 0, 0.2)",
            borderRadius: "5vh",
          }}
        />
        <img
          src={IconoEstadoClima3}
          alt="Clima"
          style={{
            width: "5vh",
            background: "rgba(0, 0, 0, 0.2)",
            borderRadius: "5vh",
          }}
        />
        <img
          src={IconoEstadoClima4}
          alt="Clima"
          style={{
            width: "5vh",
            background: "rgba(0, 0, 0, 0.2)",
            borderRadius: "5vh",
          }}
        />
        <img
          src={IconoEstadoClima5}
          alt="Clima"
          style={{
            width: "5vh",
            background: "rgba(0, 0, 0, 0.2)",
            borderRadius: "5vh",
          }}
        />
        <img
          src={IconoEstadoClima6}
          alt="Clima"
          style={{
            width: "5vh",
            background: "rgba(0, 0, 0, 0.2)",
            borderRadius: "5vh",
          }}
        />

        <p>{setMaximo1}º</p>
        <p>{setMaximo2}º</p>
        <p>{setMaximo3}º</p>
        <p>{setMaximo4}º</p>
        <p>{setMaximo5}º</p>
        <p>{setMaximo6}º</p>
        <p>{setMinimo1}º</p>
        <p>{setMinimo2}º</p>
        <p>{setMinimo3}º</p>
        <p>{setMinimo4}º</p>
        <p>{setMinimo5}º</p>
        <p>{setMinimo6}º</p>
      </Termo2>
    </Termo>
  );
}

export default CardTermo;
