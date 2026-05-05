import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button/Button";

const Card = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;

  @media (max-width: 768px) {
    height: auto;
    min-height: 220px;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${(props) => props.$image});
  background-size: cover;
  background-position: center;
  transition: transform 0.4s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
  transition: background 0.3s ease;

  ${Card}:hover & {
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 0.2) 100%
    );
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  padding: 24px;
  color: white;
`;

const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const Description = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 16px;
  align-self: flex-start;
`;

function FeatureCard({ titulo, descripcion, image, to }) {
	return (
		<Card
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.3 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
		>
			<BackgroundImage $image={image} />
			<Overlay />
			<Content>
				<Title>{titulo}</Title>
				<Description>{descripcion}</Description>
				<ButtonWrapper>
					<Button as={Link} to={to} $size="sm">
						Mostrar más
					</Button>
				</ButtonWrapper>
			</Content>
		</Card>
	);
}

export default FeatureCard;
