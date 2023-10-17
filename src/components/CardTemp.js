import React, { useState } from "react";
import styled from "styled-components";

//import  Data  from "../api.json";

const TotalTemp = styled.div`
  width: 200px;
  height: auto;

  margin: 8px;
  display: flex;
  ${
    "" /* background-image: linear-gradient(-220deg, #f83600 0%, #f9d423 100%);  */
  }
    @media (max-width: 480px) {
       margin:32px;
     
    justify-content: center;
    align-items: center;
      }
`;

const LeftColumn = styled.div`
  flex: 0 0 50%;
  
  border-radius: 8px 0 0 36px;
  box-sizing: border-box;
  text-align: center;
  background-image: linear-gradient(90deg, #f83600 0%, #f9d423 100%);
  font-weight: bold;
`;

const Numero = styled.h1`
  font-size:22px;
  height: 48px;
  
  font-weight: bold;
  color: rgba(22, 22, 22, 0.92);
`;

const RightColumn = styled.div`
  flex: 0 0 50%;
  
  text-align: center;
  box-sizing: border-box;
  border-radius: 0 36px 8px 0;

  background-image: linear-gradient(90deg, #f9d423 0%, #30cad7 100%);
  font-weight: bold;
`;

function CardTemp({Data}) {
  //Maximo
 // const maxTemperatura = Math.max(...UserData.map((data) => data.temperatura));
  const [maximo, setMaximo] = useState(Data.daily.temperature_2m_max[0]);
  //Minimo
  //const minTemperatura = Math.min(...UserData.map((data) => data.temperatura));
  const [minimo, setMinimo] = useState(Data.daily.temperature_2m_min[0]);


  return (
    <TotalTemp>
      <LeftColumn>
        Máxima
        <br />
        <Numero> {maximo}{Data.daily_units.temperature_2m_max}</Numero>
      </LeftColumn>
      <RightColumn>
        Mínima
        <br />
        <Numero>{minimo}{Data.daily_units.temperature_2m_min}</Numero>
      </RightColumn>
    </TotalTemp>
  );
}

export default CardTemp;
