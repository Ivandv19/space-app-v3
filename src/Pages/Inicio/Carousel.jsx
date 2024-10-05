
import styled from 'styled-components';
import useCarrusel from '../../hooks/useCarousel';

const CarouselWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const CarouselContainer = styled.div`
width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const ImageContainer = styled.div`
    width: 50%;
    height: 300px;
    overflow: hidden;
    border-radius: 10px;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const TextContainer = styled.div`
    width: 40%;
    padding: 20px;
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

const Carrusel = ({ images }) => {
    const { currentIndex } = useCarrusel(images);


    return (
        <CarouselWrapper>
            <CarouselContainer>
                {images.length > 0 && (
                    <>
                        <ImageContainer>
                            <Image src={images[currentIndex].url} alt={images[currentIndex].title} />
                        </ImageContainer>
                        <TextContainer>
                            <h3>{images[currentIndex].title}</h3>
                            <p>{images[currentIndex].explanation}</p>
                        </TextContainer>
                    </>
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