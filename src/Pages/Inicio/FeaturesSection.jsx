import { motion } from "framer-motion";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import FeatureCard from "./FeatureCard";

const Section = styled(motion.section)`
  width: 100%;
  padding: 80px 20px;

  @media (max-width: 768px) {
    padding: 40px 10px;
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FullWidthCard = styled(motion.div)`
  grid-column: 1 / -1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

const sectionVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.2 },
	},
};

function FeaturesSection() {
	const { noticias, imagesGaleria, sistemaSolar } = useGlobalContext();
	const planetas = sistemaSolar?.planetas || [];

	const features = [
		{
			titulo: "Galería Espacial",
			descripcion:
				"Descubre la belleza del universo a través de una colección curada de imágenes impresionantes, desde nebulosas brillantes hasta galaxias lejanas.",
			image: imagesGaleria?.[0]?.url,
			to: "/galería-espacial",
		},
		{
			titulo: "Noticias",
			descripcion:
				"Mantente al día con los últimos descubrimientos espaciales, avances científicos y misiones de exploración.",
			image: noticias?.[0]?.url,
			to: "/noticias",
		},
		{
			titulo: "Sistema Solar",
			descripcion:
				"Explora los últimos descubrimientos y avances en nuestro vecindario cósmico. Aprende sobre los planetas, lunas y otros cuerpos celestes.",
			image: planetas?.[0]?.url,
			to: "/sistema-solar",
		},
	];

	return (
		<Section
			id="caracteristicas"
			variants={sectionVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.1 }}
		>
			<Grid>
				{features.slice(0, 2).map((feature) => (
					<FeatureCard key={feature.titulo} {...feature} />
				))}
			</Grid>

			<FullWidthCard>
				<FeatureCard {...features[2]} />
			</FullWidthCard>
		</Section>
	);
}

export default FeaturesSection;
