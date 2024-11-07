import React from 'react'
import styled from 'styled-components';

// Contenedor principal del spinner, ubicado en la segunda columna y fila de una cuadrícula
const SpinnerContainer = styled.section`
    grid-column: 2; // Define que el contenedor ocupe la segunda columna en un layout de grid
    grid-row: 2; // Define que el contenedor esté en la segunda fila de la grid
    display: flex;
    flex-direction: column; // Organiza sus hijos en una columna (verticalmente)
    justify-content: center; // Centra el contenido verticalmente
    align-items: center; // Centra el contenido horizontalmente
`;

// Estilos para el círculo del spinner que gira
const SpinnerFigure = styled.div`
    border: 8px solid #f3f3f3; // Borde claro para el fondo del spinner
    border-top: 8px solid #3498db; // Borde superior de color azul que da la ilusión de giro
    border-radius: 50%; // Hace que el elemento sea un círculo
    width: 50px; // Ancho del spinner
    height: 50px; // Alto del spinner
    animation: spin 1s linear infinite; // Animación de rotación continua

    // Animación de rotación (gira el spinner 360 grados)
    @keyframes spin {
        0% { transform: rotate(0deg); } // Comienza desde 0 grados
        100% { transform: rotate(360deg); } // Gira hasta 360 grados
    }
`;

// Componente funcional que muestra el spinner y el mensaje de carga
function Spinner() {
    return (
        <SpinnerContainer>
            <SpinnerFigure /> {/* Elemento visual del spinner */}
            <p>Cargando imágenes...</p> {/* Mensaje de carga debajo del spinner */}
        </SpinnerContainer>
    )
}

export default Spinner;