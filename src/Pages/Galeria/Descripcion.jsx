import styled from "styled-components";

const PageDescription = styled.p`
  font-size: 1rem;
  color: #666;
  max-width: 800px;
  text-align: center;
  line-height: 1.6;

  @media (max-width: 768px) {
    // Cambia a móviles
    font-size: 4vw;
  }
`;

function Descripcion({ descripcion }) {
	return <PageDescription>{descripcion}</PageDescription>;
}

export default Descripcion;
