import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../Button/Button";

const Section = styled(motion.section)`
  width: 100%;
  padding: 100px 20px;
  background: #0d0d1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  text-align: center;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 7vw;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: #a0a0b8;
  max-width: 600px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 4vw;
    padding: 0 10px;
  }
`;

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.2, delayChildren: 0.2 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: "easeOut" },
	},
};

function CTABanner() {
	return (
		<Section
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.3 }}
			variants={containerVariants}
		>
			<Title variants={itemVariants}>¿Listo para Explorar el Cosmos?</Title>
			<Subtitle variants={itemVariants}>
				Únete a nosotros en este viaje interestelar. Descubre imágenes
				impresionantes, noticias actualizadas y datos fascinantes del sistema
				solar.
			</Subtitle>
			<Link to="/galer%C3%ADa-espacial" style={{ textDecoration: "none" }}>
				<Button
					$variant="filled"
					$size="lg"
					variants={itemVariants}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					Explorar Galería
				</Button>
			</Link>
		</Section>
	);
}

export default CTABanner;
