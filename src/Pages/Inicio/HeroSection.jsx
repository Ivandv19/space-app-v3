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
  background-image: ${({ Image }) => Image && Image ? `url(${Image})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  padding: 0 50px;
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
  top: 30px;  // Ajusta según sea necesario
  left: 10px; // Ajusta según sea necesario
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.2s ease;
  pointer-events: none; // Evita eventos de mouse en el tooltip
  width: 500px;
  height: auto;
  font-size: 13px;
`;

// Agrega un nuevo componente para el ícono
const InfoIcon = styled(IoIosInformationCircle)`
  color: ${({ isActive }) => (isActive ? 'black' : 'white')}; // Cambia el color del ícono
  transition: color 0.2s ease; // Transición suave para el cambio de color
  width: 20px;
  height: auto;
`;

function HeroSection() {
  const { dailyImage } = useGlobalContext(); // Asegúrate de usar el nombre correcto aquí
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <HeroSectionStyled Image={dailyImage.url}>
      <InfoSection
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        <InfoIcon isActive={tooltipVisible} size={24} /> {/* Usa el nuevo componente aquí */}
        <TitleImage>
          {dailyImage.title}
        </TitleImage>
        <Tooltip visible={tooltipVisible}>
          <p>{dailyImage.explanation}</p>
        </Tooltip>
      </InfoSection>
      <HeroTitle>Explora el Universo</HeroTitle>
      <HeroSubtitle>
        Descubre los misterios del espacio con nosotros. Sumérgete en un viaje cósmico donde cada estrella, planeta y galaxia nos revela secretos fascinantes del universo.
      </HeroSubtitle>
      <CTAButton href="#caracteristicas">Comienza Ahora</CTAButton>
    </HeroSectionStyled>
  );
}

export default HeroSection;