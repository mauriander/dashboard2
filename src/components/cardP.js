import React, { Component } from 'react'
import styled from 'styled-components';

const CardPDiv = styled.div`
  margin:8px;
  display: grid;
  grid-template-columns: repeat(10, 1fr); 
  gap: 3px; 
   background-image: linear-gradient(135deg, #f83600 0%, #f9d423 100%); 
`;

const TempColumn = styled.div`
  text-align: center;
  padding: 8px;
  background-color: transparent;
color:white;
`;

const TempRow = styled.div`
  text-align: center;
  padding: 8px;
  background-color: transparent;
  color:white;
  
`;
const HourColumn = styled.div`
  text-align: center;
  padding: 8px;
  background-color: transparent;
color:white;
`;

const Barra = styled.div`
   width: 60%;
   padding: 8px;
  height: 70%;
  display: flex;
  justify-content: center; 
  align-items: center; 
  background: white;
  
  
`;
export class CardP extends Component {
  render() {
    return (
      <CardPDiv>
      <TempColumn> 
      <TempRow>40</TempRow>
      <TempRow>20</TempRow>
      <TempRow>0</TempRow>
      Temperaturas
      </TempColumn>
        <HourColumn><Barra></Barra>0</HourColumn>
        <HourColumn><Barra></Barra>3</HourColumn>
        <HourColumn><Barra></Barra>6</HourColumn>
        <HourColumn><Barra></Barra>9</HourColumn>
        <HourColumn><Barra></Barra>12</HourColumn>
        <HourColumn><Barra></Barra>15</HourColumn>
        <HourColumn><Barra></Barra>18</HourColumn>
        <HourColumn><Barra></Barra>21</HourColumn>
        <HourColumn><Barra></Barra>24</HourColumn>
        

      </CardPDiv>
    )
  }
}

export default CardP