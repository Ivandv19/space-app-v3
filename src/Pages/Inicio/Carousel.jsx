
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
 padding: 20px 100px;
 gap: 50px;

 

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
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 10px;

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

const Carrusel = ({ images }) => {
    const { currentIndex } = useCarrusel(images);


    return (
        <CarouselWrapper>
            <CarouselContainer>
                {images.length > 0 && (
                    <Container>
                        <ImageContainer>
                            <Image src={images[currentIndex].url} alt={images[currentIndex].title} />
                        </ImageContainer>
                        <TextContainer>
                            <h3>{images[currentIndex].title}</h3>
                            <p>{images[currentIndex].explanation}</p>
                        </TextContainer>
                    </Container>
                )}
            </CarouselContainer>
            <DotsContainer>
                {images.map((_, index) => (
                    <Dot key={index} active={index === currentIndex} />
                ))}
            </DotsContainer>
        </CarouselWrapper>
    );
};

export default Carrusel;