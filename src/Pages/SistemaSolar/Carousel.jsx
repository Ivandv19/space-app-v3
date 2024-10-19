import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto; /* Tres columnas */
  align-items: center; /* Centra verticalmente los elementos */
  overflow: hidden;
  position: relative;
  padding: 1rem;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Sombra para el contenedor */
  border-radius: 8px; /* Bordes redondeados */
`;

const CarouselItem = styled.div`
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  transition: transform 0.5s ease; /* Transición suave */
  width: 100%;

  img {
    max-width: 600px; /* Asegura que la imagen se ajuste al contenedor */
    height: auto;
    border-radius: 8px; /* Bordes redondeados para la imagen */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra para la imagen */
  }

  @media (max-width: 768px) { // Cambia a móviles
    img {
      width: 100%;
    }
    }
`;

const Button = styled.button`
  background: #ffffff; /* Fondo blanco para los botones */
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  color: #333;
  transition: background 0.3s, transform 0.3s; /* Transiciones suaves */
  
  &:hover {
    background: #f0f0f0; /* Color de fondo al pasar el ratón */
    transform: scale(1.1); /* Aumentar el tamaño al pasar el ratón */
  }
`;

const PrevButton = styled(Button)`
  justify-self: start; /* Justifica el botón a la izquierda */
`;

const NextButton = styled(Button)`
  justify-self: end; /* Justifica el botón a la derecha */
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
  transition: background 0.3s; /* Transición para el punto */
  
  &:hover {
    background-color: darkgray; /* Color al pasar el ratón */
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 0;
  max-width: 800px;
  height: auto;

  @media (max-width: 768px) { // Cambia a móviles
    font-size: 3vw;
    }
`;

const Carousel = ({ categoriaSeleccionada, datos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Restablecer el índice actual al cambiar de categoría
  useEffect(() => {
    setCurrentIndex(0); // Resetea el índice al cambiar de categoría
  }, [categoriaSeleccionada]); // Este efecto se ejecutará cada vez que categoriaSeleccionada cambie

  if (!datos || datos.length === 0) return null;

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
        <PrevButton onClick={handlePrev}>◀</PrevButton>
        <CarouselItem>
          {datos[currentIndex] ? (
            <>
              <h3>{datos[currentIndex].title}</h3>
              <img src={datos[currentIndex].url} alt={datos[currentIndex].title} />
              <p>{datos[currentIndex].explanation}</p>
            </>
          ) : (
            <p>No hay datos disponibles.</p> // Mensaje alternativo en caso de que no haya datos
          )}
        </CarouselItem>
        <NextButton onClick={handleNext}>▶</NextButton>
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