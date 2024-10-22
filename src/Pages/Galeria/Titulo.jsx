import React from 'react'
import styled from 'styled-components';

const PageTitle = styled.h2`
    font-size: 2.5rem;
    color: #333;

    @media (max-width: 768px) { // Cambia a móviles
    font-size: 7vw;
    
    }
`;

function Titulo({titulo}) {
    return (
        <PageTitle>{titulo}</PageTitle>
    )
}

export default Titulo