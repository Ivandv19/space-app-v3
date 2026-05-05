import { motion } from "framer-motion";
import styled from "styled-components";
import useCarrusel from "../../hooks/useCarousel";

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CarouselContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 100px;

  @media (max-width: 1024px) {
    padding: 0;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 280px;
  overflow: hidden;
  border-radius: 16px;
`;

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

const DotsContainer = styled.div`
  text-align: center;
`;

const Dot = styled.button`
  height: 10px;
  width: 10px;
  margin: 0 5px;
  background-color: ${({ $active }) => ($active ? "#7c6af7" : "#bbb")};
  border-radius: 50%;
  display: inline-block;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 0;
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

const slideVariants = {
	enter: { opacity: 0, y: 10 },
	center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
	exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

const Carrusel = ({ images }) => {
	const { currentIndex, setCurrentIndex } = useCarrusel(images);

	return (
		<CarouselWrapper>
			<CarouselContainer>
				{images.length > 0 && (
					<motion.div
						key={currentIndex}
						variants={slideVariants}
						initial="enter"
						animate="center"
						exit="exit"
					>
						<Container>
							<ImageContainer>
								<Image
									src={images[currentIndex].url}
									alt={images[currentIndex].title}
								/>
							</ImageContainer>
							<TextContainer>
								<h3>{images[currentIndex].title}</h3>
							</TextContainer>
						</Container>
					</motion.div>
				)}
			</CarouselContainer>
			<DotsContainer>
				{images.map((image, index) => (
					<Dot
						key={image.url}
						$active={index === currentIndex}
						onClick={() => setCurrentIndex(index)}
						aria-label={`Ir a imagen ${index + 1}`}
					/>
				))}
			</DotsContainer>
		</CarouselWrapper>
	);
};

export default Carrusel;
