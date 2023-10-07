import React, { useState } from "react";
import styled from "styled-components";
import { UserData } from "../data";
import  Data  from "../api.json";

const TotalTemp = styled.div`
  width: 300px;
  height: auto;

  margin: 32px;
  display: flex;
  ${
    "" /* background-image: linear-gradient(-220deg, #f83600 0%, #f9d423 100%);  */
  }
`;

const LeftColumn = styled.div`
  flex: 0 0 50%;
  padding: 16px;
  border-radius: 16px 0 0 56px;
  box-sizing: border-box;
  text-align: center;
  background-image: linear-gradient(90deg, #f83600 0%, #f9d423 100%);
  font-weight: bold;
`;

const Numero = styled.h1`
  height: 56px;
  font-weight: bold;
  color: rgba(22, 22, 22, 0.92);
`;

const RightColumn = styled.div`
  flex: 0 0 50%;
  padding: 16px;
  text-align: center;
  box-sizing: border-box;
  border-radius: 0 56px 16px 0;

  background-image: linear-gradient(90deg, #f9d423 0%, #30cad7 100%);
  font-weight: bold;
`;

function CardTemp() {
  //Maximo
 // const maxTemperatura = Math.max(...UserData.map((data) => data.temperatura));
  const [maximo, setMaximo] = useState(Data.daily.temperature_2m_max);
  //Minimo
  //const minTemperatura = Math.min(...UserData.map((data) => data.temperatura));
  const [minimo, setMinimo] = useState(Data.daily.temperature_2m_min);


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
