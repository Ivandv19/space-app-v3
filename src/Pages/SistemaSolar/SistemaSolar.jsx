import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import Descripcion from "../Galeria/Descripcion";
import Titulo from "../Galeria/Titulo";
import Carousel from "./Carousel";
import Navbar from "./Navbar";

const Container = styled(motion.div)`
  text-align: center;
  padding: 100px 20px 60px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;

  @media (max-width: 1024px) {
    padding: 90px 16px 40px;
  }
`;

const ContentWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;

// Variantes de animación
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: "easeOut" },
	},
};

const SistemaSolar = () => {
	const _navigate = useNavigate(); // Inicializa el hook de navegación
	const { sistemaSolar } = useGlobalContext();
	const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

	useEffect(() => {
		if (sistemaSolar && Object.keys(sistemaSolar).length > 0) {
			setCategoriaSeleccionada(Object.keys(sistemaSolar)[0]);
		}
	}, [sistemaSolar]);

	return (
		<Container initial="hidden" animate="visible" variants={containerVariants}>
			{!categoriaSeleccionada ? (
				<motion.p variants={itemVariants}>
					No hay categorías disponibles.
				</motion.p>
			) : (
				<>
					<motion.div
						variants={itemVariants}
						style={{ width: "100%", display: "flex", justifyContent: "center" }}
					>
						<Titulo titulo="Sistema solar" />
					</motion.div>

					<motion.div
						variants={itemVariants}
						style={{ width: "100%", display: "flex", justifyContent: "center" }}
					>
						<Descripcion descripcion="Explora el Sistema Solar a través de diversas categorías, donde puedes ver información sobre planetas, lunas y más. Navega fácilmente entre los elementos utilizando la barra de navegación y el carrusel interactivo." />
					</motion.div>

					<motion.div
						variants={itemVariants}
						style={{ width: "100%", display: "flex", justifyContent: "center" }}
					>
						<Navbar
							categorias={Object.keys(sistemaSolar)}
							categoriaSeleccionada={categoriaSeleccionada}
							setCategoriaSeleccionada={setCategoriaSeleccionada}
						/>
					</motion.div>

					<AnimatePresence mode="wait">
						<ContentWrapper
							key={categoriaSeleccionada}
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							transition={{ duration: 0.4 }}
						>
							<Carousel
								categoriaSeleccionada={categoriaSeleccionada}
								datos={sistemaSolar[categoriaSeleccionada]}
							/>
						</ContentWrapper>
					</AnimatePresence>
				</>
			)}
		</Container>
	);
};

export default SistemaSolar; // Exporta el componente SistemaSolar
