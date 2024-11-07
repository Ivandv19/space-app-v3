import styled from "styled-components";
import Carousel from "./Carousel";
import { Link } from "react-router-dom";

// Estilo para la tarjeta principal, con diseño flexible y caja con sombra
const Card = styled.div`
  background-color: white;
  width: 70%; 
  height: 700px; 
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); // Sombra sutil para darle profundidad
  text-align: center;
  display: flex;
  flex-direction: column; 
  padding: 20px 20px;

  // Media query para pantallas más pequeñas (max-width: 1024px)
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column; 
    height: auto; 
  }

  // Media query para pantallas móviles (max-width: 768px)
  @media (max-width: 768px) {
    width: 100%; 
    padding: 20px 10px; 
  }
`;

// Estilo para el título de la característica, con tamaño ajustable
const FeatureTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 20px;
  margin-top: 20px;
  color: #282c34;

  // Media query para pantallas móviles (max-width: 768px)
  @media (max-width: 768px) { 
    font-size: 5vw; // Ajusta el tamaño de la fuente en función del ancho de la pantalla
  }
`;

// Estilo para la descripción de la característica
const FeatureDescription = styled.p`
  margin: 20px 20px;
  font-size: 1.2rem;
  color: #555;

  // Media query para pantallas móviles (max-width: 768px)
  @media (max-width: 768px) { 
    font-size: 3.5vw; // Ajusta el tamaño de la fuente en función del ancho de la pantalla
  }
`;

// Estilo para el enlace "Mostrar más", con diseño interactivo
const ShowMoreLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #61dafb;
  color: black;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  max-width: 200px; // Ajusta el ancho máximo según sea necesario

  &:hover {
    background-color: #21a1f1; // Cambio de color en hover
  }

  // Media query para pantallas móviles (max-width: 768px)
  @media (max-width: 768px) { 
    font-size: 4vw; // Ajusta el tamaño de la fuente en función del ancho de la pantalla
  }
`;

// Componente FeatureCard que recibe título, descripción e imágenes como props
function FeatureCard({ titulo, descripcion, images }) {
  return (
    <Card>
      {/* Mostrar el título de la característica */}
      <FeatureTitle>{titulo}</FeatureTitle>
      {/* Mostrar la descripción de la característica */}
      <FeatureDescription>{descripcion}</FeatureDescription>
      {/* Renderizar el carrusel con un máximo de 3 imágenes */}
      <Carousel images={images.slice(0, 3)} />
      {/* Enlace para mostrar más contenido relacionado */}
      <ShowMoreLink to={`/${titulo.toLowerCase().replace(/\s+/g, '-')}`}>Mostrar más</ShowMoreLink>
    </Card>
  );
}

// Exportar el componente FeatureCard
export default FeatureCard;