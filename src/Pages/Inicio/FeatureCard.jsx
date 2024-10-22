import styled from "styled-components";
import Carousel from "./Carousel";
import { Link } from "react-router-dom";

const Card = styled.div`
  background-color: white;
  width: 90%; // Ocupa todo el ancho
  height: 700px; // Altura estándar
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column; // Para que el contenido se organice verticalmente
  padding: 20px 20px;

  @media (max-width: 1024px) {

display: flex;
flex-direction: column;
height: auto;


}

@media (max-width: 768px) {
width: 100%;
padding: 20px 10px;
}
 
`;

const FeatureTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 20px;
  margin-top: 20px;
  color: #282c34;

  @media (max-width: 768px) { // Cambia a móviles
    font-size: 5vw;
    
    }
`;

const FeatureDescription = styled.p`
margin: 20px 20px;
  font-size: 1.2rem;
  color: #555;
  @media (max-width: 768px) { // Cambia a móviles
    font-size: 3.5vw;
    
    }
`;

const ShowMoreLink = styled(Link)`
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #61dafb;
    color: black;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
    max-width: 200px; // Ajusta este valor según necesites

    &:hover {
        background-color: #21a1f1;
    }

    @media (max-width: 768px) { // Cambia a móviles
    font-size: 4vw;
    }
`;


function FeatureCard({ titulo, descripcion, images }) {
  return (
    <Card>
      <FeatureTitle>{titulo}</FeatureTitle>
      <FeatureDescription>{descripcion}</FeatureDescription>
      <Carousel images={images.slice(0, 3)} />
      <ShowMoreLink to={`/${titulo.toLowerCase().replace(/\s+/g, '-')}`}>Mostrar más</ShowMoreLink>
    </Card>
  )
}

export default FeatureCard;