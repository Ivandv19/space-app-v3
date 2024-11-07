import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Contenedor principal del carrusel
const CarouselContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto; /* Tres columnas para los elementos del carrusel */
  align-items: center; /* Centra los elementos verticalmente */
  overflow: hidden;
  position: relative;
  padding: 1rem;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Sombra para el contenedor */
  border-radius: 8px; /* Bordes redondeados */
`;

// Elementos individuales dentro del carrusel
const CarouselItem = styled.div`
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  transition: transform 0.5s ease; /* Transición suave para el efecto de movimiento */
  width: 100%;

  img {
    max-width: 600px; /* Asegura que la imagen se ajuste dentro del contenedor */
    height: auto;
    border-radius: 8px; /* Bordes redondeados para la imagen */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra para la imagen */
  }

  // Media query para dispositivos móviles
  @media (max-width: 768px) { 
    img {
      width: 100%; /* Imagen ocupa todo el ancho en móviles */
    }
  }
`;

// Estilo para los botones (anterior y siguiente)
const Button = styled.button`
  background: #ffffff; /* Fondo blanco para los botones */
  border: 1px solid #ccc;
  border-radius: 50%; /* Botón circular */
  padding: 10px;
  cursor: pointer;
  color: #333;
  transition: background 0.3s, transform 0.3s; /* Transiciones suaves para el hover */
  
  &:hover {
    background: #f0f0f0; /* Cambia el fondo al pasar el ratón */
    transform: scale(1.1); /* Aumenta el tamaño del botón al hacer hover */
  }
`;

// Botón para ir al elemento anterior
const PrevButton = styled(Button)`
  justify-self: start; /* Alinea el botón hacia la izquierda */
`;

// Botón para ir al siguiente elemento
const NextButton = styled(Button)`
  justify-self: end; /* Alinea el botón hacia la derecha */
`;

// Contenedor para los puntos de navegación
const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

// Estilo de cada punto de navegación
const Dot = styled.div`
  height: 10px;
  width: 10px;
  margin: 0 5px;
  border-radius: 50%; /* Puntos circulares */
  background-color: ${({ active }) => (active ? 'black' : 'lightgray')}; /* Color dependiendo si está activo */
  cursor: pointer;
  transition: background 0.3s; /* Transición suave para el cambio de color */
  
  &:hover {
    background-color: darkgray; /* Cambia el color cuando el ratón pasa sobre el punto */
  }
`;

// Contenedor principal de la sección con los elementos del carrusel
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 0;
  max-width: 800px;
  height: auto;

  // Media query para dispositivos móviles
  @media (max-width: 768px) { 
    font-size: 3vw; /* Ajuste del tamaño de fuente en móviles */
  }
`;

// Componente Carousel que recibe como props la categoría seleccionada y los datos
const Carousel = ({ categoriaSeleccionada, datos }) => {
  // Estado para el índice del elemento actual mostrado en el carrusel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Efecto que se ejecuta al cambiar la categoría seleccionada
  useEffect(() => {
    setCurrentIndex(0); // Resetea el índice al cambiar de categoría
  }, [categoriaSeleccionada]); // Dependencia: se ejecuta cuando cambia categoriaSeleccionada

  // Retorna null si no hay datos o si el arreglo de datos está vacío
  if (!datos || datos.length === 0) return null;

  // Función para manejar el clic en el botón "Prev" (anterior)
  const handlePrev = () => {
    // Actualiza el índice actual, si es 0 regresa al último elemento
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? datos.length - 1 : prevIndex - 1));
  };

  // Función para manejar el clic en el botón "Next" (siguiente)
  const handleNext = () => {
    // Actualiza el índice actual, si es el último regresa al primer elemento
    setCurrentIndex((prevIndex) => (prevIndex === datos.length - 1 ? 0 : prevIndex + 1));
  };

  // Renderiza el carrusel
  return (
    <MainContainer>
      <h2>{categoriaSeleccionada}</h2> {/* Muestra la categoría seleccionada */}
      <CarouselContainer>
        <PrevButton onClick={handlePrev}>◀</PrevButton> {/* Botón para ir al elemento anterior */}
        <CarouselItem>
          {datos[currentIndex] ? ( // Verifica si hay datos para mostrar
            <>
              <h3>{datos[currentIndex].title}</h3> {/* Muestra el título del elemento actual */}
              <img src={datos[currentIndex].url} alt={datos[currentIndex].title} /> {/* Muestra la imagen del elemento actual */}
              <p>{datos[currentIndex].explanation}</p> {/* Muestra la explicación del elemento actual */}
            </>
          ) : (
            <p>No hay datos disponibles.</p> // Mensaje alternativo en caso de que no haya datos
          )}
        </CarouselItem>
        <NextButton onClick={handleNext}>▶</NextButton> {/* Botón para ir al siguiente elemento */}
      </CarouselContainer>
      <DotsContainer>
        {datos.map((_, index) => ( // Mapea los datos para crear los puntos de navegación
          <Dot key={index} active={index === currentIndex} onClick={() => setCurrentIndex(index)} /> // Cada punto puede ser clickeado para cambiar el elemento mostrado
        ))}
      </DotsContainer>
    </MainContainer>
  );
};

export default Carousel; // Exporta el componente Carousel