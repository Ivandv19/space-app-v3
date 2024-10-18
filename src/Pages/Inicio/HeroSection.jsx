import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/GlobalContext';
import { IoIosInformationCircle } from "react-icons/io";

const HeroSectionStyled = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;
  padding: 20px 20px 60px 20px;
  background-color: #282c34;
  color: white;
  text-align: center;
  background-image: ${({ Image }) => Image ? `url(${Image})` : 'none'};
  background-size: cover;
  background-position: center;
  position: relative; /* Cambia aquí para permitir posicionamiento absoluto del overlay */

  @media (max-width: 1024px) {
 
  }

  @media (max-width: 768px) {
  display: flex;
  justify-content:flex-start;

  }

`;

const OverlayStyled = styled.div`
  position: absolute; /* Posiciona el overlay absolutamente */
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.589); /* Ajusta la opacidad según sea necesario */
  z-index: 1; /* Asegúrate de que esté detrás del contenido pero delante de la imagen de fondo */
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  z-index: 1; /* Asegúrate de que el título esté por encima del overlay */
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  padding: 0 50px;
  z-index: 2; /* Asegúrate de que el subtítulo esté por encima del overlay */
  @media (max-width: 768px) {

padding: 0;
}
`;

const CTAButton = styled.a`
 padding: 10px 20px;
    font-size: 1rem;
    background-color: #0a6ad8;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    text-decoration: none;
    z-index: 2; /* Asegúrate de que el botón esté por encima del overlay */

    &:hover {
        background-color: #0056b3;
    }
`;

const InfoSection = styled.section`
  display: flex;
  justify-content:center;
  align-items: center;
  gap: 5px;
  position: absolute;
  top: 125px;
  left: 25px;
  z-index: 1; /* Asegúrate de que la sección de información esté por encima del overlay */

  @media (max-width: 1024px) {
    
  }

  @media (max-width: 768px) {
   top: auto;
   left: 10px;
   bottom: 30px;
  }
`;

const TitleImage = styled.p`
  font-size: 15px;
`;

const Tooltip = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 5px;
  top: 30px;
  left: 10px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.2s ease;
  pointer-events: none;
  width: 500px;
  height: auto;
  font-size: 13px;

  @media (max-width: 1024px) {
 
  }

  @media (max-width: 768px) {
   top: auto;
   bottom: 20px;
   width: 100%;
   height: auto;
   font-size: 11px;
   z-index: 1001;
 

  }
`;

const InfoIcon = styled(IoIosInformationCircle)`
  color: ${({ isActive }) => (isActive ? 'black' : 'white')};
  transition: color 0.2s ease;
  width: 20px;
  height: auto;
`;

const InfoMainSection = styled.section`
z-index: 100;
width: 100%;
height: auto;
 @media (max-width: 1024px) {
 
}

@media (max-width: 768px) {
padding: 200px 0;


}
  
`

function HeroSection() {
  const { dailyImage } = useGlobalContext();
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <HeroSectionStyled Image={dailyImage.url}>
      <OverlayStyled /> {/* Agrega el overlay aquí */}
      <InfoSection
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        <InfoIcon isActive={tooltipVisible} size={24} />
        <TitleImage>
          {dailyImage.title}
        </TitleImage>
        <Tooltip visible={tooltipVisible}>
          <p>{dailyImage.explanation}</p>
        </Tooltip>
      </InfoSection>
      <InfoMainSection>
        <HeroTitle>Explora el Universo</HeroTitle>
        <HeroSubtitle>
          Descubre los misterios del espacio con nosotros. Sumérgete en un viaje cósmico donde cada estrella, planeta y galaxia nos revela secretos fascinantes del universo.
        </HeroSubtitle>
        <CTAButton href="#caracteristicas">Comienza Ahora</CTAButton>
      </InfoMainSection>
    </HeroSectionStyled>
  );
}

export default HeroSection;