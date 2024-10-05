import React, { useState } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Oculta el desbordamiento */
  position: relative; /* Permite la posición absoluta de los botones */
  padding: 1rem;
 width: 100%;
`;

const CarouselItem = styled.div`
  min-width: 800px;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  text-align: center;

  img{
    max-width: 800px;
    height: auto;
    background-color: yellow;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%); /* Centra verticalmente */
  background: none;
  border: none;
  font-size: 24px; /* Tamaño de la flecha */
  cursor: pointer;
  color: #333; /* Color de la flecha */
  z-index: 10; /* Asegura que los botones estén por encima */
  
  &:hover {
    color: #000; /* Color al pasar el ratón */
  }
`;

const PrevButton = styled(Button)`
  left: 10px; /* Posiciona a la izquierda */
`;

const NextButton = styled(Button)`
  right: 10px; /* Posiciona a la derecha */
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Dot = styled.div`
  height: 10px;
  width: 10px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? 'black' : 'lightgray')};
  cursor: pointer;
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px 0;
    width: 100%;
`

const Carousel = ({ categoriaSeleccionada, datos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!datos || datos.length === 0) return null; // Verifica si hay datos para mostrar

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? datos.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === datos.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <MainContainer>
      <h2>{categoriaSeleccionada}</h2>
      <CarouselContainer>
        <CarouselItem>
          <h3>{datos[currentIndex].title}</h3>
          <img src={datos[currentIndex].url} alt={datos[currentIndex].title} />
          <p>{datos[currentIndex].explanation}</p>
        </CarouselItem>
        {/* Botones de navegación */}
        <PrevButton onClick={handlePrev}>◀</PrevButton> {/* Flecha izquierda */}
        <NextButton onClick={handleNext}>▶</NextButton> {/* Flecha derecha */}
      </CarouselContainer>
      <DotsContainer>
        {datos.map((_, index) => (
          <Dot key={index} active={index === currentIndex} onClick={() => setCurrentIndex(index)} />
        ))}
      </DotsContainer>

    </MainContainer>
  );
};

export default Carousel;