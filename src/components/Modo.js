import React, {useState} from 'react'
import styled from 'styled-components';

const ToggleButton = styled.button`
  background-color: ${(props) => (props.isDarkMode ? '#333' : '#eee')};
  color: ${(props) => (props.isDarkMode ? '#eee' : '#333')};
  padding: 8px 16px;
  border: none;
  cursor: pointer;
`;
const Modo = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);      };

 return (
    <ToggleButton onClick={toggleDarkMode} isDarkMode={isDarkMode}>
      {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
    </ToggleButton>
  );
}

export default Modo