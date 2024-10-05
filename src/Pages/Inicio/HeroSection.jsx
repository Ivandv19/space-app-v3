import styled from 'styled-components';
import { useGlobalContext } from '../../context/GlobalContext';

import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoIosInformationCircle } from "react-icons/io";



const HeroSectionStyled = styled.section`
width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;
  padding: 20px 20px 60px 20px;
  background-color: #282c34;
  color: white;
  text-align: center;
  border-radius: 10px;
  margin-bottom: 50px;
  background-image: ${({ Image }) => Image && Image ? `url(${Image})` : 'none'};
  background-size: cover;
  background-position: center;
  height: 400px;
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

const CTAButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #61dafb;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #21a1f1;
  }
`;

const InfoSection = styled.section`
width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 5px;
`

const TitleImage = styled.p`
font-size: 16px;
  
`





function HeroSection() {
  const { dailyImage } = useGlobalContext(); // Asegúrate de usar el nombre correcto aquí

  return (
    <HeroSectionStyled Image={dailyImage.url}>
      <InfoSection>
        <IoIosInformationCircle />
        <TitleImage>
          {dailyImage.title}
        </TitleImage>
      </InfoSection>
      <HeroTitle>Explora el Universo</HeroTitle>
      <HeroSubtitle>
        Descubre los misterios del espacio con nosotros. Sumérgete en un viaje cósmico donde cada estrella, planeta y galaxia nos revela secretos fascinantes del universo.
      </HeroSubtitle>
      <CTAButton>Comienza Ahora</CTAButton>
    </HeroSectionStyled>
  );
}

export default HeroSection;