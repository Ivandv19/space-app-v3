import { keyframes } from "styled-components";
import styled from "styled-components";
import useCarrusel from "../../hooks/useCarousel";

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const AnimatedSlide = styled.div`
  width: 100%;
  animation: ${fadeIn} 0.5s ease;
`;

// Contenedor para las imágenes y el texto, ajusta el diseño en pantallas pequeñas
const CarouselContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 100px;

  // Media query para pantallas más pequeñas (max-width: 1024px)
  @media (max-width: 1024px) {
    padding: 0; // Elimina el padding en pantallas pequeñas
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 280px;
  overflow: hidden;
  border-radius: 10px;
`;

// Estilo para la imagen, cubre el contenedor sin distorsionar
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 1rem;
    color: #282c34;
    text-align: center;
    font-weight: 600;
  }
`;

// Contenedor para los puntos de navegación
const DotsContainer = styled.div`
  text-align: center;
`;

// Punto individual de navegación
const Dot = styled.span`
  height: 10px;
  width: 10px;
  margin: 0 5px;
  background-color: ${({ $active }) =>
    $active
      ? "#61dafb"
      : "#bbb"}; // Color activo (cyan de react) o inactivo (gris)
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.3s;
`;

const Container = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

// Componente Carrusel que recibe un array de imágenes como prop
const Carrusel = ({ images }) => {
  // Usar el hook useCarrusel para obtener el índice de la imagen actual
  const { currentIndex } = useCarrusel(images);

  return (
    <CarouselWrapper>
      <CarouselContainer>
        {/* Solo renderizar si hay imágenes en el array */}
        {images.length > 0 && (
          <AnimatedSlide key={currentIndex}>
            <Container>
              {/* Contenedor para la imagen actual */}
              <ImageContainer>
                {/* Mostrar la imagen actual usando el índice */}
                <Image
                  src={images[currentIndex].url}
                  alt={images[currentIndex].title}
                />
              </ImageContainer>
              {/* Contenedor para el texto asociado a la imagen */}
              <TextContainer>
                <h3>{images[currentIndex].title}</h3>
              </TextContainer>
            </Container>
          </AnimatedSlide>
        )}
      </CarouselContainer>
      {/* Contenedor para los puntos de navegación del carrusel */}
      <DotsContainer>
        {/* Crear un punto por cada imagen, marcando el activo */}
        {images.map((_, index) => (
          <Dot key={index} $active={index === currentIndex} /> // `$active` es true si el índice coincide
        ))}
      </DotsContainer>
    </CarouselWrapper>
  );
};

// Exportar el componente Carrusel
export default Carrusel;
