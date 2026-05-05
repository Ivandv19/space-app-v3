import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoIosImages } from "react-icons/io";
import { IoNewspaper, IoPlanet } from "react-icons/io5";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";

const Bar = styled(motion.section)`
  width: 100%;
  padding: ${({ $glass }) => ($glass ? "20px 0" : "80px 20px")};
  background: ${({ $glass }) => ($glass ? "transparent" : "#0d0d1a")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Inner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  max-width: 900px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Badge = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 40px;
  flex: 1;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 16px 20px;
    width: 100%;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    width: 80%;
    height: 1px;
  }
`;

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(124, 106, 247, 0.12);
  color: #7c6af7;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatNumber = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
`;

const StatLabel = styled.span`
  font-size: 0.85rem;
  color: #a0a0b8;
  white-space: nowrap;
`;

function Counter({ target }) {
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (target === 0) return;
		const duration = 2000;
		const start = performance.now();

		let rafId;
		const animate = (now) => {
			const elapsed = now - start;
			const progress = Math.min(elapsed / duration, 1);
			setCount(Math.floor(progress * target));
			if (progress < 1) {
				rafId = requestAnimationFrame(animate);
			}
		};

		rafId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(rafId);
	}, [target]);

	return <StatNumber>{count.toLocaleString()}</StatNumber>;
}

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
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

const stats = [
	{ icon: IoIosImages, label: "Imágenes NASA", key: "images" },
	{ icon: IoNewspaper, label: "Noticias", key: "news" },
	{ icon: IoPlanet, label: "Planetas", key: "planets" },
];

function StatsBar({ $glass }) {
	const { imagesGaleria, noticias, sistemaSolar } = useGlobalContext();
	const counts = {
		images: imagesGaleria?.length || 0,
		news: noticias?.length || 0,
		planets: sistemaSolar?.planetas?.length || 0,
	};

	const motionProps = $glass
		? { animate: "visible", variants: containerVariants }
		: {
				initial: "hidden",
				whileInView: "visible",
				viewport: { once: true, amount: 0.3 },
				variants: containerVariants,
			};

	return (
		<Bar $glass={$glass} {...motionProps}>
			<Inner>
				{stats.map(({ icon: Icon, label, key }, i) => (
					<>
						{i > 0 && <Divider key={`div-${key}`} />}
						<Badge key={key} variants={itemVariants}>
							<IconBox>
								<Icon />
							</IconBox>
							<StatInfo>
								<Counter target={counts[key]} />
								<StatLabel>{label}</StatLabel>
							</StatInfo>
						</Badge>
					</>
				))}
			</Inner>
		</Bar>
	);
}

export default StatsBar;
