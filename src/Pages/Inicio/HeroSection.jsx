import { motion } from "framer-motion";
import { useState } from "react";
import { IoIosInformationCircle } from "react-icons/io";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";

// Sección principal del héroe con imagen de fondo y texto centrado
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
  background-image: ${({ $image }) =>
		$image ? `url(${$image})` : "none"}; // Condicional para la imagen de fondo
  background-size: cover;
  background-position: center;
  position: relative;

  @media (max-width: 768px) {
    // Cambia a móviles
    justify-content: flex-start; // Alinea el contenido hacia la parte superior en móviles
  }
`;

// Overlay oscuro para mejorar la visibilidad del texto sobre la imagen
const OverlayStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.589);
  z-index: 1;
`;

// Título principal del héroe
const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 20px;
  z-index: 1; // Asegura que esté por encima del overlay

  @media (max-width: 768px) {
    // Cambia a móviles
    font-size: 8vw;
  }
`;

// Subtítulo del héroe
const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 30px;
  padding: 0 50px;
  z-index: 2; // Asegura que el subtítulo esté por encima del overlay
  @media (max-width: 768px) {
    padding: 0;
    font-size: 4vw;
  }
`;

// Botón de llamada a la acción
const CTAButton = styled(motion.a)`
  display: inline-block;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #0a6ad8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
  z-index: 2;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    // Cambia a móviles
    font-size: 3vw;
  }
`;

// Sección de información con posición absoluta para superponerse sobre el héroe
const InfoSection = styled(motion.section)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  position: absolute;
  top: 120px;
  left: 10px;
  z-index: 1;

  @media (max-width: 768px) {
    top: auto;
    left: 5px;
    bottom: 10px;
  }
`;

// Imagen o texto para el título en la sección de información
const TitleImage = styled.p`
  font-size: 15px;

  @media (max-width: 768px) {
    // Cambia a móviles
    font-size: 3vw;
  }
`;

// Tooltip con información adicional, visible cuando se activa
const Tooltip = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  top: 30px;
  left: 10px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.2s ease;
  pointer-events: none;
  width: 50vw;
  height: auto;
  font-size: 13px;

  @media (max-width: 768px) {
    top: auto;
    bottom: 20px;
    width: 90vw;
    z-index: 1001;
    font-size: 2.5vw;
  }
`;

// Icono de información que cambia de color según estado activo
const InfoIcon = styled(IoIosInformationCircle)`
  color: ${({ $isActive }) => ($isActive ? "black" : "white")};
  transition: color 0.2s ease;
  width: 20px;
  height: auto;
`;

// Sección principal de la información con padding dinámico para pantallas móviles
const InfoMainSection = styled(motion.section)`
  z-index: 100;
  width: 100%;
  height: auto;

  @media (max-width: 768px) {
    padding: 20vh 1vw 10vh 1vw; // Padding relativo al tamaño de la pantalla
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
	// Obtener la imagen diaria del contexto global
	const { dailyImage } = useGlobalContext();
	// Estado para controlar la visibilidad del tooltip
	const [tooltipVisible, setTooltipVisible] = useState(false);

	return (
		<HeroSectionStyled
			$image={dailyImage.url}
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			<OverlayStyled />

			<InfoSection
				variants={{
					hidden: { opacity: 0, x: -20 },
					visible: {
						opacity: 1,
						x: 0,
						transition: { delay: 1, duration: 0.5 },
					},
				}}
				onMouseEnter={() => setTooltipVisible(true)}
				onMouseLeave={() => setTooltipVisible(false)}
			>
				<InfoIcon $isActive={tooltipVisible} size={24} />
				<TitleImage>{dailyImage.title}</TitleImage>
				<Tooltip $visible={tooltipVisible}>
					<p>{dailyImage.explanation}</p>
				</Tooltip>
			</InfoSection>

			<InfoMainSection variants={containerVariants}>
				<HeroTitle variants={itemVariants}>Explora el Universo</HeroTitle>
				<HeroSubtitle variants={itemVariants}>
					Descubre los misterios del espacio con nosotros. Sumérgete en un viaje
					cósmico donde cada estrella, planeta y galaxia nos revela secretos
					fascinantes del universo.
				</HeroSubtitle>
				<CTAButton
					href="#caracteristicas"
					variants={itemVariants}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					Comienza Ahora
				</CTAButton>
			</InfoMainSection>
		</HeroSectionStyled>
	);
}

export default HeroSection;
