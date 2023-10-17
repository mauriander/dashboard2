import "./App.css";
import React, { useState,useEffect } from "react";
import styled from "styled-components";
import CardTemp from "./components/CardTemp";
import CardTermo from "./components/CardTermo";
import imagenClima from "./Clouds.png";

// import  CardP  from './components/CardP';
import CardBox from "./components/CardBox";
import Modo from "./components/Modo";
import BarChart from "./components/BarChart";

//import  Data  from "./api.json";

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
  width: 20%;
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
  width: 30%;
 height: 100vh;
  padding: 12px;
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
  
 const [uData, setUData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [Data, setData] = useState(null);
  const [WeatherData, setWeatherData] = useState(null);
  const [city , setCity]= useState(null);

const APP_ID = '4090239d69cdb3874de692fd18539299';
 useEffect(() => {
navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}`)
      .then(response => response.json())
      .then(datas => {
        setWeatherData(datas);
        setCity(datas.name);
           
        
      })
      .catch(error => {
        console.error(error); // o mostrar el error en la interfaz de usuario
      });
});
}, []);

 useEffect(() => {

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,weathercode,visibility,temperature_80m,temperature_120m,temperature_180m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,windspeed_10m_max&current_weather=true&timezone=America%2FSao_Paulo`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((ex) => {
        console.error(ex);
      });
  });


}, []);



 useEffect(() => {
  // console.log('entro setudata');
  if (Data) {
    //console.log('entro data');
    if (Data.hourly) {
   //   console.log('entro hourly');
      const horas = Data.hourly.time.slice(0,24).map((fechaCompleta) => fechaCompleta.slice(11, 16));
      const temperaturas = Data.hourly.temperature_2m.slice(0,24);
      const uData = {
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
        labels: horas,
        datasets: [
          {
            label: "Temperatura ºC",
            data: temperaturas,
            borderRadius: 16,
            color: "white",
            backgroundColor: "rgba(255,255,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,255,132,0.4)",
          },
        ],
      };

      setUData(uData);
     
      
    }
  }
}, [Data]);

  if (Data === null || uData === null || WeatherData ===null) {
    return <div>Loading...</div>;
  }
 ;

  return (
    <AppTotal isDarkMode={isDarkMode}>
      
        <LeftColumn>
          <ToggleButton onClick={toggleDarkMode} isDarkMode={isDarkMode}>
          {isDarkMode ? "Modo Claro" : "Modo Oscuro"}  
          </ToggleButton>
        <CardTermo Data={Data} city={city} />
        <Imagen>
          <img src={imagenClima} alt="Clima" style={{ width: "10vh" }} />
         
        </Imagen>

        <CardTemp Data={Data} />
        </LeftColumn>
        <RightColumn>
    
        
        <Barrdiv>
          <BarChart chartData={uData} options={uData.options} /> 
        </Barrdiv>
        <CardBox isDarkMode={isDarkMode} Data={Data}  />    
      
    
      </RightColumn>
    </AppTotal>
  );
}

export default App;
