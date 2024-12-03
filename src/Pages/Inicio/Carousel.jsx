import styled from "styled-components";
import useCarrusel from "../../hooks/useCarousel";

// Contenedor principal del carrusel, con diseño en columna en pantallas pequeñas
const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  // Media query para pantallas más pequeñas (max-width: 1024px)
  @media (max-width: 1024px) {
    gap: 50px; // Agrega espacio entre los elementos en pantallas pequeñas
  }
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

// Contenedor de imágenes, ajusta el tamaño en pantallas pequeñas
const ImageContainer = styled.div`
  width: 50%;
  height: 300px;
  overflow: hidden;
  border-radius: 10px;

  // Media query para pantallas más pequeñas (max-width: 1024px)
  @media (max-width: 1024px) {
    width: 100%; // Ocupa el 100% del ancho
    height: auto; // Ajusta la altura automáticamente
  }
`;

// Estilo para la imagen, cubre el contenedor sin distorsionar
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Contenedor para el texto, ajusta el tamaño en pantallas pequeñas
const TextContainer = styled.div`
  width: 50%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  // Media query para pantallas más pequeñas (max-width: 1024px)
  @media (max-width: 1024px) {
    width: 100%; // Ocupa el 100% del ancho
    height: 300px; // Mantiene la altura
  }

  // Media query para pantallas aún más pequeñas (max-width: 768px)
  @media (max-width: 768px) {
    margin: 1.5vh 0; // Ajusta el margen vertical
    h3 {
      font-size: 5vw; // Tamaño de fuente ajustable en función del ancho
    }
    p {
      font-size: 3vw; // Tamaño de fuente ajustable en función del ancho
    }
  }
`;

// Contenedor para los puntos de navegación
const DotsContainer = styled.div`
  text-align: center;
  margin-top: 10px;
`;

// Puntos de navegación que cambian de color según el estado
const Dot = styled.span`
  height: 10px;
  width: 10px;
  margin: 0 2px;
  background-color: ${({ active }) =>
    active ? "#61dafb" : "#ccc"}; // Cambia de color cuando está activo
  border-radius: 50%;
  display: inline-block;
`;

// Contenedor principal del carrusel con disposición en fila por defecto
const Container = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  // Media query para pantallas más pequeñas (max-width: 1024px)
  @media (max-width: 1024px) {
    flex-direction: column; // Cambia a disposición en columna
    padding: 0; // Elimina el padding
  }
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
              <h3>{images[currentIndex].title}</h3> {/* Título de la imagen */}
              <p>{images[currentIndex].explanation}</p>{" "}
              {/* Explicación de la imagen */}
            </TextContainer>
          </Container>
        )}
      </CarouselContainer>
      {/* Contenedor para los puntos de navegación del carrusel */}
      <DotsContainer>
        {/* Crear un punto por cada imagen, marcando el activo */}
        {images.map((_, index) => (
          <Dot key={index} active={index === currentIndex} /> // `active` es true si el índice coincide
        ))}
      </DotsContainer>
    </CarouselWrapper>
  );
};

// Exportar el componente Carrusel
export default Carrusel;
