import React from 'react'
import styled from 'styled-components';

const SpinnerContainer = styled.section`
 grid-column: 2; /* Desde la columna 2 hasta antes de la 4 */
 grid-row: 2;    /* Desde la fila 1 hasta antes de la 3 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
// Estilos del spinner
const SpinnerFigure = styled.div`
    border: 8px solid #f3f3f3; /* Color claro */
    border-top: 8px solid #3498db; /* Color del spinner */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite; /* Animación del spinner */
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

function Spinner() {
    return (
        <SpinnerContainer>
            <SpinnerFigure />
            <p>Cargando imágenes...</p>
        </SpinnerContainer>
    )
}

export default Spinner