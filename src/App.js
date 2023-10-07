import "./App.css";
import React, { useState } from "react";
import styled from "styled-components";
import CardTemp from "./components/CardTemp";
import CardTermo from "./components/CardTermo";
import imagenClima from "./Clouds.png";

// import  CardP  from './components/CardP';
import CardBox from "./components/CardBox";
import Modo from "./components/Modo";
import BarChart from "./components/BarChart";
import { UserData } from "./data";
import  Data  from "./api.json";

import { Bar } from "react-chartjs-2";
const Imagen = styled.div`
  width: 15vh;
  height: 15vh;
   display: flex;
  justify-content: center;
  align-items: center;
  margin-left:32px;
  
`;

const AppTotal = styled.div`
  display: flex;
    margin: 0;
    padding: 0;
     /* Hacemos que la página ocupe toda la altura visible del viewport */
   

  background-color: ${(props) => (props.isDarkMode ? "#154360" : "#FCF3CF")};
  color: ${(props) => (props.isDarkMode ? "#FCF3CF" : "#154360")};
  @media (max-width: 480px) {
    flex: 1; /* Ocupa el 100% del ancho en pantallas pequeñas */
    max-width: 100%;
    height:auto;    
      flex-direction: column;
  flex-wrap: wrap;
  }
`;
const LeftColumn = styled.div`
  width: 50%;
  height: 100vh;
  padding: 16px;
  box-sizing: border-box;
  display: grid;
  flex-direction: column;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex: 1; /* Ocupa el 100% del ancho en pantallas pequeñas */
    max-width: 100%;
  }
`;

const RightColumn = styled.div`
  width: 50%;
 height: 100vh;
  padding: 16px;
  box-sizing: border-box;
  display: grid;
  flex-direction: column;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex: 1; /* Ocupa el 100% del ancho en pantallas pequeñas */
    max-width: 100%;
  }
`;

const Barrdiv = styled.div`
   display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;  
  width: 100%;
  max-height:250px;
 
  @media (max-width: 480px) {
    font-size: 14px; /* Cambia el tamaño de fuente para dispositivos móviles */
    margin: 2px; 
    flex: 1; /* Ocupa el 100% del ancho en pantallas pequeñas */
    width: 100%;        
  
  }
`;
const ToggleButton = styled.button`
  background-color: ${(props) => (props.isDarkMode ? "#154360" : "#FCF3CF")};
  color: ${(props) => (props.isDarkMode ? "#FCF3CF" : "#154360")}; 
  border: none;
  cursor: pointer;
  width: 136px;
 position: fixed;
  top: 16px;
  left: 56px;
  transform: translateX(-50%);
  z-index: 2;  
`;




function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const imagen = "Snow"; // Snow.png haze.png cloud.png
  const direccion = "./img/" + imagen + ".png";
  const [imgclima, setImgClima] = useState(direccion);
  const labels = []; // Reemplaza con tus etiquetas reales
  const data = [];
  const [userData, setUserData] = useState({
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          stacked: true,
          grid: {
            display: true,
            color: "rgba(255,99,132,0.2)",
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
    labels: UserData.map((data) => data.hora),
    datasets: [
      {
        label: "Temperatura/hora",
        data: UserData.map((data) => data.temperatura),
        borderRadius: 16,
        color: "white",
        backgroundColor: "rgba(255,255,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,255,132,0.4)",
      },
    ],
  });

  const [uData, setuData] = useState({
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
         
             stacked: true,
          grid: {
            display: true,
            color: "rgba(255,99,132,0.2)",
          },
                    
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
    // labels: uData.map((data) => data.hourly.time),
    labels: (Data.hourly.time.map((fechaCompleta) => fechaCompleta.slice(11, 16))),
    datasets: [
      {
        label: "Temperatura ºC",
        // data: uData.map((data) => data.hourly.temperature_2m),
         data: (Data.hourly.temperature_2m),
        
        borderRadius: 16,
        color: "white",
        backgroundColor: "rgba(255,255,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,255,132,0.4)",
      },
    ],
  });

  return (
    <AppTotal isDarkMode={isDarkMode}>
      <LeftColumn>
        <ToggleButton onClick={toggleDarkMode} isDarkMode={isDarkMode}>
          {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
        </ToggleButton>
        <CardTermo />

        <Imagen>
          <img src={imagenClima} alt="Clima" style={{ width: "15vh" }} />
        </Imagen>

        <CardTemp />
      </LeftColumn>

      <RightColumn>
        <Barrdiv>
          <BarChart chartData={uData} options={uData.options} />
        </Barrdiv>

        <CardBox isDarkMode={isDarkMode} />
      </RightColumn>
    </AppTotal>
  );
}

export default App;
