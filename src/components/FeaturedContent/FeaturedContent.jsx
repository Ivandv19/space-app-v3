import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";

const Section = styled(motion.section)`
  width: 100%;
  padding: 0px 20px 80px 20px;
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  background: #0d0d1a;
  border-radius: 24px;
  padding: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 24px;
  }
`;

const ImageWrapper = styled.div`
  border-radius: 16px;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  display: block;
  aspect-ratio: 16 / 9;
  object-fit: cover;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MainTitle = styled.h2`
  color: #ffffff;
  font-size: 2rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.h3`
  color: #7c6af7;
  font-size: 1.1rem;
  margin: 0;
`;

const Explanation = styled.p`
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NasaButton = styled.a`
  display: inline-block;
  padding: 12px 24px;
  border: 1px solid #7c6af7;
  color: #7c6af7;
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s;
  cursor: pointer;
  align-self: flex-start;
  margin-top: 8px;

  &:hover {
    background-color: #7c6af7;
    color: #ffffff;
  }
`;

const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

const ShimmerGradient = styled.div`
  background: linear-gradient(-90deg, #2a2a4a 0%, #3a3a5a 50%, #2a2a4a 100%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const ImageSkeleton = styled(ShimmerGradient)`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
`;

const TextSkeleton = styled(ShimmerGradient)`
  height: 20px;
  border-radius: 8px;
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

function FeaturedContent() {
	const { dailyImage } = useGlobalContext();
	const isLoading = !dailyImage?.url;

	return (
		<Section
			initial={{ opacity: 0, y: 60 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.7, ease: "easeOut" }}
		>
			<Container>
				{isLoading ? (
					<>
						<ImageSkeleton />
						<TextBlock>
							<TextSkeleton style={{ height: 32, width: "80%" }} />
							<TextSkeleton style={{ width: "60%" }} />
							<TextSkeleton style={{ width: "45%" }} />
						</TextBlock>
					</>
				) : (
					<>
						<ImageWrapper>
							<StyledImage src={dailyImage.url} alt={dailyImage.title} />
						</ImageWrapper>
						<Content>
							<MainTitle>Imagen Astronómica del Día</MainTitle>
							<Subtitle>{dailyImage.title}</Subtitle>
							<Explanation>{dailyImage.explanation}</Explanation>
							<NasaButton
								href={dailyImage.hdurl}
								target="_blank"
								rel="noopener noreferrer"
							>
								Ver en NASA
							</NasaButton>
						</Content>
					</>
				)}
			</Container>
		</Section>
	);
}

export default FeaturedContent;
