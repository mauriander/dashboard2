import "./App.css";
import React, { useState,useEffect } from "react";
import styled, { keyframes }  from "styled-components";
import CardTemp from "./components/CardTemp";
import CardTermo from "./components/CardTermo";
import imagenClima from "./Clouds.png";

// import  CardP  from './components/CardP';
import CardBox from "./components/CardBox";
import Modo from "./components/Modo";
import BarChart from "./components/BarChart";
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
import Transport from "./components/Transport";
import SelectorRuta from "./components/SelectorRuta";

//import  Data  from "./api.json";

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

const TransportColumn = styled.div`
  width: 50%;
  height: 100vh;

  box-sizing: border-box;
  
  flex-direction: column;
  flex-wrap: wrap;
 

  @media (max-width: 480px) {
    width:100%;

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

const ToggleButtonmc = styled.button`
  background-color: ${(props) => (props.isMap ? "#154360" : "#FCF3CF")};
  color: ${(props) => (props.isMap ? "#FCF3CF" : "#154360")}; 
  border: none;
  cursor: pointer;
  width: 136px;
 position: fixed;
  top: 16px;
  right: 56px;
  transform: translateX(-50%);
  z-index: 999;  
`;
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled component for the loading animation
const LoadingIcon = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: ${rotate} 2s linear infinite;
`;


function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

   const [isMap, setIsMap] = useState(false);
  const toggleMap = () => {
    setIsMap(!isMap);
  };
  
 const [uData, setUData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [Data, setData] = useState(null);
  const [WeatherData, setWeatherData] = useState(null);
  const [city , setCity]= useState(null);
const[latitud,setLatitud]= useState(null);
const [longitud, setLongitud]= useState(null);
const [transportData,  setTransportData] = useState([]); 
  const [selectorDeRuta, setSelectorDeRuta] = useState(''); // Initialize selectedRoute state
   const [loading, setLoading] = useState(false);

  const eleccionRuta = (selectorDeRuta) => {
    setSelectorDeRuta(selectorDeRuta);
  };
  const [rutaid, setRutaId] = useState('');
   const handleRouteChange = (selectedRouteID) => {
    setRutaId(selectedRouteID); // Set the selected route ID as rutaid
  };
  const handleDataLoaded = () => {
    setLoading(false); // Data has been loaded, set loading to false
  };


 //const [transportDatat, setTransportData] = useState(null);
const APP_ID = '4090239d69cdb3874de692fd18539299';

const CLIENT_ID='cb6b18c84b3b484d98018a791577af52';
const CLIENT_SECRET='3e3DB105Fbf642Bf88d5eeB8783EE1E6';
const ROUTE_ID='1703';

 useEffect(() => {


  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    setLatitud(latitude);
    setLongitud(longitude);
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
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}`)
      .then(response => response.json())
      .then(datas => {
        setCity(datas.name);
        console.log('ciudad'+ datas.name);               
      })
      .catch(error => {
        console.error(error); // o mostrar el error en la interfaz de usuario
      });
    
       fetch(`https://datosabiertos-transporte-apis.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?&client_id=cb6b18c84b3b484d98018a791577af52&client_secret=3e3DB105Fbf642Bf88d5eeB8783EE1E6`)
       .then(response => response.json())
        .then(datat => {
           setTransportData(datat);
          console.log('datat '+datat[0]);         
        })
         .catch(error => {
          console.error(error); // o mostrar el error en la interfaz de usuario
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

  if (Data === null || uData === null) {
    return (<div
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
   background: 'linear-gradient(to top, #fef9d7 0%, #a8edea 100%)',
  }}
>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <LoadingIcon />
    </div>
  <div
    style={{
      fontSize: '50px',
    }}
  >
     Loading...
  </div>
</div>)
  }
 ;

  return (
    <AppTotal isDarkMode={isDarkMode} isMap={isMap}>
      
        <LeftColumn>
          <ToggleButton onClick={toggleDarkMode} isDarkMode={isDarkMode}>
          {isDarkMode ? "Modo Claro" : "Modo Oscuro"}  
          </ToggleButton>
        <CardTermo Data={Data} city={city} />
        {/* <Imagen>
          <img src={imagenClima} alt="Clima" style={{ width: "10vh" }} />
         
        </Imagen> */}

        <CardTemp Data={Data} />
        </LeftColumn>
        <RightColumn>
    
        
        <Barrdiv>
          <BarChart chartData={uData} options={uData.options} /> 
        </Barrdiv>
        <CardBox isDarkMode={isDarkMode} Data={Data}  />    
      
      
      </RightColumn>
      <TransportColumn>
       {/* <ToggleButtonmc onClick={toggleMap} isMap={isMap}>
          {isMap ? "Map" : "Calendar"}  
          </ToggleButtonmc> */}
            <SelectorRuta onRouteChange={handleRouteChange} onDataLoaded={handleDataLoaded} />

         {loading ? ( // Check if data is loading
          <p>LOADING...</p>
        ) : (
          <Transport ruta={rutaid} latitud={latitud} longitud={longitud} />
        )}
      
      </TransportColumn>
    </AppTotal>
  );
}

export default App;
