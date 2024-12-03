import React from "react";
import styled from "styled-components";

// Estilo para el título de la página, se adapta según el tamaño de la pantalla
const PageTitle = styled.h2`
  font-size: 2.5rem; // Tamaño de fuente por defecto en pantallas grandes
  color: #333; // Color del texto (gris oscuro)
  text-align: center; // Alineación centrada del texto

  // Estilos para pantallas móviles (con un ancho máximo de 768px)
  @media (max-width: 768px) {
    // Cambia a móviles
    font-size: 7vw; // El tamaño de la fuente se ajusta dinámicamente en base al ancho de la pantalla
  }
`;

// Componente funcional que recibe un título como propiedad y lo muestra
function Titulo({ titulo }) {
  return (
    <PageTitle>{titulo}</PageTitle> // Muestra el título dentro del componente estilizado
  );
}

export default Titulo; // Exporta el componente Titulo
