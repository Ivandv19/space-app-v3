import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import { useGlobalContext } from "../../context/GlobalContext";
import Titulo from "../Galeria/Titulo";

/* ─── Layout ────────────────────────────────────────────── */
const PageWrapper = styled(motion.div)`
  padding: 100px 40px 60px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 768px) {
    padding: 90px 16px 40px;
  }
`;

const HeaderSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #666;
  max-width: 680px;
  line-height: 1.6;
`;

/* ─── Filtros ───────────────────────────────────────────── */
const SearchWrapper = styled.div`
  flex: 1 1 260px;
  max-width: 320px;
  position: relative;
  display: flex;
  align-items: center;

  > svg {
    position: absolute;
    left: 12px;
    color: #999;
    pointer-events: none;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  color: #1a1a2e;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;

  &:hover {
    color: #0d0d1a;
  }
`;

const FiltersBar = styled(motion.section)`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 36px 10px 36px;
  border: 1px solid #1a1a2e;
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: inherit;
  background: #ffffff;
  color: #1a1a2e;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: #999;
  }

  &:focus {
    border-color: #0d0d1a;
    box-shadow: 0 0 0 3px rgba(26, 26, 46, 0.15);
  }
`;

const SelectWrapper = styled.div`
  flex: 1 1 180px;
  max-width: 240px;
  position: relative;
  display: flex;
  align-items: center;

  > svg {
    position: absolute;
    right: 12px;
    color: #000000;
    pointer-events: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 36px 10px 16px;
  border: 1px solid #1a1a2e;
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: inherit;
  background-color: #ffffff;
  color: #1a1a2e;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  
  /* Eliminar la flecha nativa */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:focus {
    border-color: #0d0d1a;
    box-shadow: 0 0 0 3px rgba(26, 26, 46, 0.15);
  }

  option {
    background: #ffffff;
    color: #1a1a2e;
    padding: 6px 14px;
  }

  option:checked {
    background: #f0f0f5;
  }
`;

const ClearAllBtn = styled.button`
  background: none;
  border: none;
  color: #1a1a2e;
  cursor: pointer;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  &:hover {
    color: #0d0d1a;
  }
`;

/* ─── Grid de noticias ──────────────────────────────────── */
const NoticiasGrid = styled(motion.section)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

/* ─── Tarjeta ───────────────────────────────────────────── */
const Card = styled(motion.div)`
  border: 1px solid #e8e8e8;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.25s ease, transform 0.25s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const CardTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.4;
  margin: 0;
`;

const CardExplanation = styled.p`
  font-size: 0.85rem;
  color: #555;
  line-height: 1.5;
  flex: 1;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  color: #999;
`;

const TagsRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled(motion.button)`
  background: ${({ $active }) => ($active ? "#1a1a2e" : "#f0f0f5")};
  color: ${({ $active }) => ($active ? "#fff" : "#555")};
  border: none;
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 0.72rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #1a1a2e;
    color: #fff;
  }
`;

/* ─── Empty state ───────────────────────────────────────── */
const EmptyState = styled(motion.p)`
  color: #999;
  font-style: italic;
  text-align: center;
  padding: 40px 0;
`;

/* ─── Utils ─────────────────────────────────────────────── */
const generarSlug = (title) =>
	title
		.toLowerCase()
		.replace(/[^a-z0-9áéíóúüñ\s]+/g, "")
		.replace(/\s+/g, "-");

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
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

/* ─── Componente ────────────────────────────────────────── */
const Noticias = () => {
	const { noticias } = useGlobalContext();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedAuthor, setSelectedAuthor] = useState("");
	const [selectedTag, setSelectedTag] = useState("");
	const [orderBy, setOrderBy] = useState("");
	const [orderDirection, setOrderDirection] = useState("reciente");

	const categories = [...new Set(noticias.map((n) => n.categoria))];
	const authors = [...new Set(noticias.map((n) => n.author))];
	const allTags = [...new Set(noticias.flatMap((n) => n.keywords))];

	const filtered = noticias
		.filter((n) => {
			const matchTitle = n.title
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
			const matchCat = selectedCategory
				? n.categoria === selectedCategory
				: true;
			const matchAuthor = selectedAuthor ? n.author === selectedAuthor : true;
			const matchTag = selectedTag ? n.keywords.includes(selectedTag) : true;
			return matchTitle && matchCat && matchAuthor && matchTag;
		})
		.sort((a, b) => {
			if (orderBy === "fecha")
				return orderDirection === "reciente"
					? new Date(b.date) - new Date(a.date)
					: new Date(a.date) - new Date(b.date);
			if (orderBy === "relevancia")
				return orderDirection === "masVistas"
					? b.views - a.views
					: a.views - b.views;
			return 0;
		});

	const handleOrderByChange = (e) => {
		const val = e.target.value;
		setOrderBy(val);
		if (val !== "fecha") setOrderDirection("masVistas");
		else setOrderDirection("reciente");
	};

	const clearAllFilters = () => {
		setSearchTerm("");
		setSelectedCategory("");
		setSelectedAuthor("");
		setSelectedTag("");
		setOrderBy("");
		setOrderDirection("reciente");
	};

	const hasActiveFilters =
		searchTerm || selectedCategory || selectedAuthor || selectedTag || orderBy;

	return (
		<PageWrapper
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			{/* Cabecera */}
			<HeaderSection variants={itemVariants}>
				<Titulo titulo="Últimas Noticias" />
				<Subtitle>
					Las noticias más recientes sobre exploración espacial, astronomía y
					tecnología. Mantente al día con los descubrimientos más emocionantes.
				</Subtitle>
			</HeaderSection>

			{/* Filtros */}
			<FiltersBar variants={itemVariants}>
				<SearchWrapper>
					<Icon icon="lucide:search" width="16" />
					<Input
						placeholder="Buscar por título..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					{searchTerm && (
						<ClearButton
							onClick={() => setSearchTerm("")}
							aria-label="Limpiar búsqueda"
						>
							<Icon icon="lucide:x" width="16" />
						</ClearButton>
					)}
				</SearchWrapper>
				<SelectWrapper>
					<Select
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
					>
						<option value="">Todas las categorías</option>
						{categories.map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</Select>
					<Icon icon="lucide:chevron-down" width="16" />
				</SelectWrapper>
				<SelectWrapper>
					<Select
						value={selectedAuthor}
						onChange={(e) => setSelectedAuthor(e.target.value)}
					>
						<option value="">Todos los autores</option>
						{authors.map((a) => (
							<option key={a} value={a}>
								{a}
							</option>
						))}
					</Select>
					<Icon icon="lucide:chevron-down" width="16" />
				</SelectWrapper>
				<SelectWrapper>
					<Select value={orderBy} onChange={handleOrderByChange}>
						<option value="">Ordenar por</option>
						<option value="fecha">Fecha</option>
						<option value="relevancia">Relevancia</option>
					</Select>
					<Icon icon="lucide:chevron-down" width="16" />
				</SelectWrapper>
				{orderBy === "fecha" && (
					<SelectWrapper>
						<Select
							value={orderDirection}
							onChange={(e) => setOrderDirection(e.target.value)}
						>
							<option value="reciente">Más reciente</option>
							<option value="antigua">Más antigua</option>
						</Select>
						<Icon icon="lucide:chevron-down" width="16" />
					</SelectWrapper>
				)}
				{orderBy === "relevancia" && (
					<SelectWrapper>
						<Select
							value={orderDirection}
							onChange={(e) => setOrderDirection(e.target.value)}
						>
							<option value="masVistas">Más vistas</option>
							<option value="menosVistas">Menos vistas</option>
						</Select>
						<Icon icon="lucide:chevron-down" width="16" />
					</SelectWrapper>
				)}
				{hasActiveFilters && (
					<ClearAllBtn onClick={clearAllFilters} aria-label="Limpiar filtros">
						<Icon icon="lucide:x-circle" width="18" />
					</ClearAllBtn>
				)}
			</FiltersBar>

			{/* Tags */}
			<TagsRow variants={itemVariants}>
				<Tag
					$active={selectedTag === ""}
					onClick={() => setSelectedTag("")}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					Todos los tags
				</Tag>
				{allTags.map((tag) => (
					<Tag
						key={tag}
						$active={selectedTag === tag}
						onClick={() => setSelectedTag(tag)}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						{tag}
					</Tag>
				))}
			</TagsRow>

			{/* Grid */}
			<AnimatePresence mode="popLayout">
				{filtered.length === 0 ? (
					<EmptyState
						key="empty"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						No se encontraron noticias con esos filtros.
					</EmptyState>
				) : (
					<NoticiasGrid
						key="grid"
						initial="hidden"
						animate="visible"
						variants={containerVariants}
					>
						{filtered.map((noticia) => (
							<Card key={noticia.id} variants={itemVariants} layout>
								<CardImage src={noticia.url} alt={noticia.title} />
								<CardBody>
									<CardTitle>{noticia.title}</CardTitle>
									<CardExplanation>{noticia.explanation}</CardExplanation>
									<CardMeta>
										<span>Por: {noticia.author}</span>
										<span>{new Date(noticia.date).toLocaleDateString()}</span>
									</CardMeta>
									<Button
										as={Link}
										to={`/noticias/${generarSlug(noticia.title)}`}
										state={{ id: noticia.id }}
										$variant="filled"
										$size="sm"
										style={{ marginTop: 12 }}
									>
										Ver más
									</Button>
								</CardBody>
							</Card>
						))}
					</NoticiasGrid>
				)}
			</AnimatePresence>
		</PageWrapper>
	);
};

export default Noticias;
