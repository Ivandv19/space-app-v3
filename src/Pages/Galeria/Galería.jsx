import React, { useEffect, useState } from "react";
import { IoBookmark, IoClose, IoHeart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import useOrderByLikes from "../../hooks/useOrderByLikes";
import useRandomLikes from "../../hooks/useRandomLikes";
import Titulo from "./Titulo";

/* ─── Layout principal ─────────────────────────────────── */
const PageWrapper = styled.div`
  padding: 100px 20px 60px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

/* ─── Cabecera ─────────────────────────────────────────── */
const HeaderSection = styled.div`
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
`;

/* ─── Sección con título + fila horizontal ─────────────── */
const Section = styled.section`
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
const ScrollRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 12px;

  &::-webkit-scrollbar { height: 6px; }
  &::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
  &::-webkit-scrollbar-thumb { background: #c0c0c0; border-radius: 10px; }
`;

/* ─── Tarjeta de imagen ────────────────────────────────── */
const Card = styled.div`
  position: relative;
  flex: 0 0 260px;
  height: 200px;
  border-radius: 12px;
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
const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  max-width: 860px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.25s ease;

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
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

/* ─── Componente principal ─────────────────────────────── */
const Galeria = () => {
	const navigate = useNavigate();
	const { imagesGaleria, state, toggleSave, toggleLike } = useGlobalContext();
	const { savedImages, likedImages } = state;
	const [selectedImage, setSelectedImage] = useState(null);

	const itemsWithLikes = useRandomLikes(imagesGaleria) || [];
	const topFiveItems = useOrderByLikes(itemsWithLikes) || [];

	// Cerrar modal con Escape
	useEffect(() => {
		const onKey = (e) => { if (e.key === "Escape") setSelectedImage(null); };
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	const savedItemsWithLikes = itemsWithLikes.filter((img) =>
		savedImages.some((s) => s.date === img.date),
	);

	return (
		<PageWrapper>
			{/* ── Modal ── */}
			{selectedImage && (
				<ModalBackdrop onClick={() => setSelectedImage(null)}>
					<ModalBox onClick={(e) => e.stopPropagation()}>
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
			{/* Cabecera */}
			<HeaderSection>
				<Titulo titulo="Galería Espacial" />
				<Subtitle>
					Explora una colección impresionante de imágenes del espacio. Desde
					nebulosas hasta planetas, cada imagen cuenta una historia del universo.
				</Subtitle>
			</HeaderSection>

			{/* ── Galería Principal ── */}
			<Section>
				<SectionTitle>Galería Principal</SectionTitle>
				<ScrollRow>
					{itemsWithLikes.map((image) => (
						<Card key={image.date} onClick={() => setSelectedImage(image)}>
							<CardImage src={image.url} alt={image.title} />
							<CardOverlay>
								<CardTitle>{image.title}</CardTitle>
							</CardOverlay>
							<ActionBar>
								<ActionBtn onClick={(e) => { e.stopPropagation(); toggleLike(image); }} title="Me gusta">
									<IoHeart
										color={
											likedImages.some((l) => l.date === image.date)
												? "#ff4d6d"
												: "white"
										}
									/>
								</ActionBtn>
								<ActionBtn onClick={(e) => { e.stopPropagation(); toggleSave(image); }} title="Guardar">
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
			<Section>
				<SectionTitle>⭐ Con más likes</SectionTitle>
				<ScrollRow>
					{topFiveItems.map((image) => (
						<Card key={image.date} onClick={() => setSelectedImage(image)}>
							<CardImage src={image.url} alt={image.title} />
							<CardOverlay>
								<CardTitle>{image.title}</CardTitle>
							</CardOverlay>
						</Card>
					))}
				</ScrollRow>
			</Section>

			{/* ── Guardadas ── */}
			<Section>
				<SectionTitle>🔖 Guardadas</SectionTitle>
				{savedItemsWithLikes.length === 0 ? (
					<EmptyState>Aún no has guardado ninguna imagen.</EmptyState>
				) : (
					<ScrollRow>
						{savedItemsWithLikes.map((image) => (
							<Card key={image.date} onClick={() => setSelectedImage(image)}>
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
