// src/components/FeaturesSection.js
import styled from "styled-components";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../context/GlobalContext";
import Titulo from "../Galeria/Titulo";
import FeatureCard from "./FeatureCard";

// Sección principal con alineación centrada y separación
const Section = styled(motion.section)`
  width: 100%;
  height: 100%;
  padding: 150px 0; // Espaciado vertical
  display: flex;
  flex-direction: column; // Dirección de los elementos en columna
  align-items: center; // Centrado horizontal
  justify-content: center; // Centrado vertical
  gap: 50px; // Espacio entre elementos
`;

// Contenedor de características con alineación y separación central
const FeaturesContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; // Centrado horizontal
  flex-direction: column; // Elementos en columna
  align-items: center; // Centrado vertical
  gap: 50px; // Espacio entre elementos
`;

// Variantes para las tarjetas
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

function FeaturesSection() {
	const { noticias, imagesGaleria, sistemaSolar } = useGlobalContext();

	// Asegúrate de que los datos sean definidos antes de usarlos
	const planetas = sistemaSolar?.planetas || [];

	return (
		<Section 
			id="caracteristicas"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			variants={{
				hidden: { opacity: 0 },
				visible: {
					opacity: 1,
					transition: { staggerChildren: 0.3 }
				}
			}}
		>
			<motion.div variants={cardVariants} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
				<Titulo titulo="Explora el Universo" />
			</motion.div>
			
			<FeaturesContainer>
				<motion.div variants={cardVariants} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
					<FeatureCard
						titulo={"Galería Espacial"}
						descripcion={
							"Descubre la belleza del universo a través de una colección curada de imágenes impresionantes, desde nebulosas brillantes hasta galaxias lejanas."
						}
						images={imagesGaleria}
					/>
				</motion.div>
				<motion.div variants={cardVariants} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
					<FeatureCard
						titulo={"Noticias"}
						descripcion={
							"Mantente al día con los últimos descubrimientos espaciales, avances científicos y misiones de exploración que están ampliando nuestros horizontes cósmicos."
						}
						images={noticias}
					/>
				</motion.div>
				<motion.div variants={cardVariants} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
					<FeatureCard
						titulo={"Sistema Solar"}
						descripcion={
							"Explora los últimos descubrimientos y avances en nuestro vecindario cósmico. Aprende sobre los planetas, lunas, y otros cuerpos celestes que conforman el sistema solar, junto con las misiones espaciales que los estudian."
						}
						images={planetas}
					/>
				</motion.div>
			</FeaturesContainer>
		</Section>
	);
}

export default FeaturesSection;
