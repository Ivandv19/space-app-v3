import { motion } from "framer-motion";
import { useState } from "react";
import { IoIosInformationCircle } from "react-icons/io";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import StatsBar from "../../components/StatsBar/StatsBar";
import { useGlobalContext } from "../../context/GlobalContext";

const gradientBg =
	"linear-gradient(135deg, #0d0d1a 0%, #1a1a3e 50%, #0d0d1a 100%)";

const HeroSectionStyled = styled(motion.section)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;
  padding: 20px 20px 60px 20px;
  color: white;
  text-align: center;
  background-image: ${gradientBg};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const BgImage = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-image: url(${({ $image }) => $image});
`;

// Overlay oscuro para mejorar la visibilidad del texto sobre la imagen
const OverlayStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ $loading }) =>
		$loading ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.589)"};
  z-index: 1;
`;

// Título principal del héroe
const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 8vw;
  }
`;

// Subtítulo del héroe
const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  padding: 0 50px;
  z-index: 2;
  @media (max-width: 768px) {
    padding: 0;
    font-size: 4vw;
  }
`;

const ButtonsRow = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: center;
  z-index: 2;
`;

const HeroStatsContainer = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  background: rgba(13, 13, 26, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 2;
`;

const InfoSection = styled(motion.section)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  position: absolute;
  bottom: 20px;
  left: 10px;
  z-index: 2;
  cursor: pointer;

  @media (max-width: 768px) {
    bottom: 10px;
    left: 5px;
  }
`;

const TitleImage = styled.p`
  font-size: 15px;

  @media (max-width: 768px) {
    font-size: 3vw;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  bottom: 30px;
  left: 0;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.2s ease;
  pointer-events: none;
  width: 50vw;
  height: auto;
  font-size: 13px;
  z-index: 3;

  @media (max-width: 768px) {
    bottom: 28px;
    left: 0;
    width: 90vw;
    z-index: 3;
    font-size: 2.5vw;
  }
`;

const InfoIcon = styled(IoIosInformationCircle)`
  color: ${({ $isActive }) => ($isActive ? "black" : "white")};
  transition: color 0.2s ease;
  width: 20px;
  height: auto;
`;

// Sección principal de la información con padding dinámico para pantallas móviles
const InfoMainSection = styled(motion.section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  z-index: 2;
  width: 100%;
  height: auto;

  @media (max-width: 768px) {
    padding: 20vh 1vw 10vh 1vw;
  }
`;

// Variantes para animaciones escalonadas
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.3,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: "easeOut" },
	},
};

// Componente HeroSection
function HeroSection() {
	const { dailyImage } = useGlobalContext();
	const [tooltipVisible, setTooltipVisible] = useState(false);

	const toggleTooltip = () => setTooltipVisible((prev) => !prev);

	const scrollToCaracteristicas = () => {
		document.getElementById("caracteristicas")?.scrollIntoView({
			behavior: "smooth",
		});
	};

	return (
		<HeroSectionStyled
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			<BgImage
				$image={dailyImage?.url}
				initial={{ opacity: 0 }}
				animate={{ opacity: dailyImage?.url ? 1 : 0 }}
				transition={{ duration: 1.2, ease: "easeOut" }}
			/>

			<OverlayStyled $loading={!dailyImage?.url} />

			<InfoSection
				variants={{
					hidden: { opacity: 0, x: -20 },
					visible: {
						opacity: 1,
						x: 0,
						transition: { delay: 1, duration: 0.5 },
					},
				}}
				onClick={toggleTooltip}
				onMouseEnter={() => setTooltipVisible(true)}
				onMouseLeave={() => setTooltipVisible(false)}
			>
				{dailyImage?.title ? (
					<>
						<InfoIcon $isActive={tooltipVisible} size={24} />
						<TitleImage>{dailyImage.title}</TitleImage>
						<Tooltip $visible={tooltipVisible}>
							<p>{dailyImage.explanation}</p>
						</Tooltip>
					</>
				) : (
					<TitleImage>Cargando imagen del día...</TitleImage>
				)}
			</InfoSection>

			<InfoMainSection variants={containerVariants}>
				<HeroTitle variants={itemVariants}>Explora el Universo</HeroTitle>
				<HeroSubtitle variants={itemVariants}>
					Explora el universo desde aquí: imágenes astronómicas diarias, las
					últimas noticias y un viaje por cada planeta.
				</HeroSubtitle>
				<HeroStatsContainer variants={itemVariants}>
					<StatsBar $glass />
				</HeroStatsContainer>
				<ButtonsRow variants={itemVariants}>
					<Button
						$variant="filled"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={scrollToCaracteristicas}
					>
						Explorar
					</Button>
				</ButtonsRow>
			</InfoMainSection>
		</HeroSectionStyled>
	);
}

export default HeroSection;
