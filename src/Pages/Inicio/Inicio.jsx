import styled from "styled-components";
import { motion } from "framer-motion";
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
		</MainContainer>
	);
}

export default Inicio;
