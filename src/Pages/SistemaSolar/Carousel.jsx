import React, { useEffect, useState } from "react";
import styled from "styled-components";

/* ─── Contenedor Principal ──────────────────────────────── */
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`;

const CategoryTitle = styled.h2`
  font-size: 1.8rem;
  color: #1a1a2e;
  margin: 0;
  text-transform: capitalize;
`;

/* ─── Layout del Carrusel ───────────────────────────────── */
const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const CarouselContent = styled.div`
  flex: 1;
  background-color: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 400px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 260px;
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: fadeIn 0.4s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const TextContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
`;

const ItemTitle = styled.h3`
  font-size: 1.4rem;
  color: #1a1a2e;
  margin: 0;
`;

const ItemExplanation = styled.p`
  font-size: 0.95rem;
  color: #555;
  line-height: 1.6;
  margin: 0;
`;

/* ─── Controles ─────────────────────────────────────────── */
const NavButton = styled.button`
  background: #1a1a2e;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: #2d2d5e;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const Dot = styled.button`
  height: 10px;
  width: 10px;
  border: none;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? "#1a1a2e" : "#d0d0d0")};
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  padding: 0;

  &:hover {
    background-color: ${({ $active }) => ($active ? "#1a1a2e" : "#a0a0a0")};
    transform: scale(1.2);
  }
`;

/* ─── Componente ────────────────────────────────────────── */
const Carousel = ({ categoriaSeleccionada, datos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [categoriaSeleccionada]);

  if (!datos || datos.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? datos.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === datos.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const currentItem = datos[currentIndex];

  return (
    <MainContainer>
      <CategoryTitle>{categoriaSeleccionada}</CategoryTitle>

      <CarouselWrapper>
        <NavButton onClick={handlePrev} aria-label="Anterior">◀</NavButton>

        <CarouselContent>
          {currentItem ? (
            <>
              <ImageContainer>
                <CarouselImage
                  key={currentItem.title} // Fuerzo re-render para la animación fadeIn
                  src={currentItem.url}
                  alt={currentItem.title}
                />
              </ImageContainer>
              <TextContent>
                <ItemTitle>{currentItem.title}</ItemTitle>
                <ItemExplanation>{currentItem.explanation}</ItemExplanation>
              </TextContent>
            </>
          ) : (
            <TextContent>
              <p>No hay datos disponibles.</p>
            </TextContent>
          )}
        </CarouselContent>

        <NavButton onClick={handleNext} aria-label="Siguiente">▶</NavButton>
      </CarouselWrapper>

      <DotsContainer>
        {datos.map((_, index) => (
          <Dot
            key={index}
            $active={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </DotsContainer>
    </MainContainer>
  );
};

export default Carousel;
