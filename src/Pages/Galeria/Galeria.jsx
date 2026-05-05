import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoBookmark, IoClose, IoHeart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import useOrderByLikes from "../../hooks/useOrderByLikes";
import useRandomLikes from "../../hooks/useRandomLikes";
import Titulo from "./Titulo";

/* ─── Layout principal ─────────────────────────────────── */
const PageWrapper = styled(motion.div)`
  padding: 100px 20px 60px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

/* ─── Cabecera ─────────────────────────────────────────── */
const HeaderSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #666;
  max-width: 640px;
  line-height: 1.6;
`;

/* ─── Sección con título + fila horizontal ─────────────── */
const Section = styled(motion.section)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #282c34;
  border-left: 4px solid #1a1a2e;
  padding-left: 12px;
`;

/* ─── Fila scrolleable ─────────────────────────────────── */
const ScrollRow = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 12px;

  &::-webkit-scrollbar { height: 6px; }
  &::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 8px; }
  &::-webkit-scrollbar-thumb { background: #c0c0c0; border-radius: 8px; }
`;

/* ─── Tarjeta de imagen ────────────────────────────────── */
const Card = styled(motion.div)`
  position: relative;
  flex: 0 0 260px;
  height: 200px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #e0e0e0;
 
  &:hover img {
    transform: scale(1.06);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const CardTitle = styled.p`
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.3;
`;

/* ─── Botones de acción ────────────────────────────────── */
const ActionBar = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 6px;
`;

const ActionBtn = styled.button`
  background: rgba(0, 0, 0, 0.55);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 1rem;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.85);
  }
`;

/* ─── Empty state ──────────────────────────────────────── */
const EmptyState = styled.p`
  color: #999;
  font-size: 0.9rem;
  font-style: italic;
`;

/* ─── Modal ────────────────────────────────────────────── */
const ModalBackdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalBox = styled(motion.div)`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  max-width: 860px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

const ModalImage = styled.img`
  width: 100%;
  max-height: 70vh;
  object-fit: contain;
  background: #000;
`;

const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 12px;
`;

const ModalDescription = styled.p`
  font-size: 0.9rem;
  color: #555;
  line-height: 1.7;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0,0,0,0.6);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  color: white;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;

  &:hover { background: rgba(0,0,0,0.9); }
`;

const ModalImageWrapper = styled.div`
  position: relative;
`;

/* ─── Variantes de animación ────────────────────────────── */
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ─── Componente principal ─────────────────────────────── */
const Galeria = () => {
	const _navigate = useNavigate();
	const { imagesGaleria, state, toggleSave, toggleLike } = useGlobalContext();
	const { savedImages, likedImages } = state;
	const [selectedImage, setSelectedImage] = useState(null);

	const itemsWithLikes = useRandomLikes(imagesGaleria) || [];
	const topFiveItems = useOrderByLikes(itemsWithLikes) || [];

	// Cerrar modal con Escape
	useEffect(() => {
		const onKey = (e) => {
			if (e.key === "Escape") setSelectedImage(null);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	const savedItemsWithLikes = itemsWithLikes.filter((img) =>
		savedImages.some((s) => s.date === img.date),
	);

	return (
		<PageWrapper
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			{/* ── Modal ── */}
			<AnimatePresence>
				{selectedImage && (
					<ModalBackdrop
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setSelectedImage(null)}
					>
						<ModalBox
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							onClick={(e) => e.stopPropagation()}
						>
							<ModalImageWrapper>
								<CloseBtn onClick={() => setSelectedImage(null)}>
									<IoClose />
								</CloseBtn>
								<ModalImage src={selectedImage.url} alt={selectedImage.title} />
							</ModalImageWrapper>
							<ModalBody>
								<ModalTitle>{selectedImage.title}</ModalTitle>
								<ModalDescription>{selectedImage.explanation}</ModalDescription>
							</ModalBody>
						</ModalBox>
					</ModalBackdrop>
				)}
			</AnimatePresence>

			{/* Cabecera */}
			<HeaderSection variants={itemVariants}>
				<Titulo titulo="Galería Espacial" />
				<Subtitle>
					Explora una colección impresionante de imágenes del espacio. Desde
					nebulosas hasta planetas, cada imagen cuenta una historia del
					universo.
				</Subtitle>
			</HeaderSection>

			{/* ── Galería Principal ── */}
			<Section variants={itemVariants}>
				<SectionTitle>Galería Principal</SectionTitle>
				<ScrollRow variants={containerVariants}>
					{itemsWithLikes.map((image) => (
						<Card
							key={image.date}
							variants={itemVariants}
							onClick={() => setSelectedImage(image)}
						>
							<CardImage src={image.url} alt={image.title} />
							<CardOverlay>
								<CardTitle>{image.title}</CardTitle>
							</CardOverlay>
							<ActionBar>
								<ActionBtn
									onClick={(e) => {
										e.stopPropagation();
										toggleLike(image);
									}}
									title="Me gusta"
								>
									<IoHeart
										color={
											likedImages.some((l) => l.date === image.date)
												? "#ff4d6d"
												: "white"
										}
									/>
								</ActionBtn>
								<ActionBtn
									onClick={(e) => {
										e.stopPropagation();
										toggleSave(image);
									}}
									title="Guardar"
								>
									<IoBookmark
										color={
											savedImages.some((s) => s.date === image.date)
												? "#5b8dee"
												: "white"
										}
									/>
								</ActionBtn>
							</ActionBar>
						</Card>
					))}
				</ScrollRow>
			</Section>

			{/* ── Top Likes ── */}
			<Section variants={itemVariants}>
				<SectionTitle>Con más likes</SectionTitle>
				<ScrollRow variants={containerVariants}>
					{topFiveItems.map((image) => (
						<Card
							key={image.date}
							variants={itemVariants}
							onClick={() => setSelectedImage(image)}
						>
							<CardImage src={image.url} alt={image.title} />
							<CardOverlay>
								<CardTitle>{image.title}</CardTitle>
							</CardOverlay>
						</Card>
					))}
				</ScrollRow>
			</Section>

			{/* ── Guardadas ── */}
			<Section variants={itemVariants}>
				<SectionTitle>Guardadas</SectionTitle>
				{savedItemsWithLikes.length === 0 ? (
					<EmptyState>Aún no has guardado ninguna imagen.</EmptyState>
				) : (
					<ScrollRow variants={containerVariants}>
						{savedItemsWithLikes.map((image) => (
							<Card
								key={image.date}
								variants={itemVariants}
								onClick={() => setSelectedImage(image)}
							>
								<CardImage src={image.url} alt={image.title} />
								<CardOverlay>
									<CardTitle>{image.title}</CardTitle>
								</CardOverlay>
							</Card>
						))}
					</ScrollRow>
				)}
			</Section>
		</PageWrapper>
	);
};

export default Galeria;
