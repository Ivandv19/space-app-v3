import { motion } from "framer-motion";
import styled from "styled-components";
import CTABanner from "../../components/CTABanner/CTABanner";
import FeaturedContent from "../../components/FeaturedContent/FeaturedContent";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";

const MainContainer = styled(motion.main)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

function Inicio() {
	return (
		<MainContainer
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<HeroSection />
			<FeaturesSection />
			<FeaturedContent />
			<CTABanner />
		</MainContainer>
	);
}

export default Inicio;
