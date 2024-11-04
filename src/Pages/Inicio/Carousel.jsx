
import styled from 'styled-components';
import useCarrusel from '../../hooks/useCarousel';

const CarouselWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;


    @media (max-width: 1024px) {
display: flex;
flex-direction: column;
height: auto;
gap: 50px;


}

@media (max-width: 768px) {

}
 

    
`;

const CarouselContainer = styled.div`
width: 100%;
display: flex;
align-items: center;
flex-direction: column;
justify-content: space-around;
 padding: 20px 100px;


 

 @media (max-width: 1024px) {

    display: flex;
    flex-direction: column;
    height: auto;
    padding: 0;
   
  }

  @media (max-width: 768px) {

 
  }

`;

const ImageContainer = styled.div`
    width: 50%;
    height: 300px;
    overflow: hidden;
    border-radius: 10px;

    @media (max-width: 1024px) {
width: 100%;
height: auto;

}

@media (max-width: 768px) {

}
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const TextContainer = styled.div`
    width: 50%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 1024px) {
    width: 100%;
    height: 300px;

}

@media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin: 1.5vh 0;
  
  

    h3{
        font-size: 5vw;
    }

    p{
        font-size: 3vw;
        margin: 1.5vh 0;
    }
}

 
`;

const DotsContainer = styled.div`
    text-align: center;
    margin-top: 10px;
`;

const Dot = styled.span`
    height: 10px;
    width: 10px;
    margin: 0 2px;
    background-color: ${({ active }) => (active ? '#61dafb' : '#ccc')};
    border-radius: 50%;
    display: inline-block;
`;

const Container = styled.section`
width: 100%;
height: auto;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;


@media (max-width: 1024px) {

display: flex;
flex-direction: column;
height: auto;
justify-content: center;
align-items: center;
padding: 0;


}

@media (max-width: 768px) {

}
    
`

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
                            <Image src={images[currentIndex].url} alt={images[currentIndex].title} />
                        </ImageContainer>
                        {/* Contenedor para el texto asociado a la imagen */}
                        <TextContainer>
                            <h3>{images[currentIndex].title}</h3> {/* Título de la imagen */}
                            <p>{images[currentIndex].explanation}</p> {/* Explicación de la imagen */}
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