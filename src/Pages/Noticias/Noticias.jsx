import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import Titulo from "../Galeria/Titulo";

/* ─── Layout ────────────────────────────────────────────── */
const PageWrapper = styled.div`
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

const HeaderSection = styled.div`
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
const FiltersBar = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
`;

const Input = styled.input`
  flex: 1 1 220px;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;

  &:focus {
    border-color: #1a1a2e;
  }
`;

const Select = styled.select`
  flex: 1 1 160px;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  background: #fff;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #1a1a2e;
  }
`;

/* ─── Grid de noticias ──────────────────────────────────── */
const NoticiasGrid = styled.section`
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
const Card = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 12px;
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

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.button`
  background: ${({ $active }) => ($active ? "#1a1a2e" : "#f0f0f5")};
  color: ${({ $active }) => ($active ? "#fff" : "#555")};
  border: none;
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 0.72rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #1a1a2e;
    color: #fff;
  }
`;

const VerMasLink = styled(Link)`
  display: inline-block;
  margin-top: 12px;
  padding: 8px 16px;
  background-color: #1a1a2e;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
  transition: background-color 0.25s;

  &:hover {
    background-color: #2d2d5e;
  }
`;

/* ─── Empty state ───────────────────────────────────────── */
const EmptyState = styled.p`
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

/* ─── Componente ────────────────────────────────────────── */
const Noticias = () => {
	const { noticias } = useGlobalContext();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedAuthor, setSelectedAuthor] = useState("");
	const [selectedTag, setSelectedTag] = useState("");
	const [orderBy, setOrderBy] = useState("");
	const [orderDirection, setOrderDirection] = useState("reciente");
	const [showViewsSlider, setShowViewsSlider] = useState(false);
	const [viewsLimit, setViewsLimit] = useState(0);

	const categories = [...new Set(noticias.map((n) => n.categoria))];
	const authors = [...new Set(noticias.map((n) => n.author))];
	const allTags = [...new Set(noticias.flatMap((n) => n.keywords))];

	const filtered = noticias
		.filter((n) => {
			const matchTitle = n.title.toLowerCase().includes(searchTerm.toLowerCase());
			const matchCat = selectedCategory ? n.categoria === selectedCategory : true;
			const matchAuthor = selectedAuthor ? n.author === selectedAuthor : true;
			const matchTag = selectedTag ? n.keywords.includes(selectedTag) : true;
			const matchViews = n.views >= viewsLimit;
			return matchTitle && matchCat && matchAuthor && matchTag && matchViews;
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
		setShowViewsSlider(val === "relevancia");
		if (val !== "relevancia") setOrderDirection("reciente");
	};

	return (
		<PageWrapper>
			{/* Cabecera */}
			<HeaderSection>
				<Titulo titulo="Últimas Noticias" />
				<Subtitle>
					Las noticias más recientes sobre exploración espacial, astronomía y
					tecnología. Mantente al día con los descubrimientos más emocionantes.
				</Subtitle>
			</HeaderSection>

			{/* Filtros */}
			<FiltersBar>
				<Input
					placeholder="Buscar por título..."
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Select onChange={(e) => setSelectedCategory(e.target.value)}>
					<option value="">Todas las categorías</option>
					{categories.map((c) => (
						<option key={c} value={c}>{c}</option>
					))}
				</Select>
				<Select onChange={(e) => setSelectedAuthor(e.target.value)}>
					<option value="">Todos los autores</option>
					{authors.map((a) => (
						<option key={a} value={a}>{a}</option>
					))}
				</Select>
				<Select onChange={handleOrderByChange}>
					<option value="">Ordenar por</option>
					<option value="fecha">Fecha</option>
					<option value="relevancia">Relevancia</option>
				</Select>
				{orderBy === "fecha" && (
					<Select onChange={(e) => setOrderDirection(e.target.value)}>
						<option value="reciente">Más reciente</option>
						<option value="antigua">Más antigua</option>
					</Select>
				)}
				{showViewsSlider && (
					<Select onChange={(e) => setOrderDirection(e.target.value)}>
						<option value="masVistas">Más vistas</option>
						<option value="menosVistas">Menos vistas</option>
					</Select>
				)}
			</FiltersBar>

			{/* Tags */}
			<TagsRow>
				<Tag
					$active={selectedTag === ""}
					onClick={() => setSelectedTag("")}
				>
					Todos los tags
				</Tag>
				{allTags.map((tag) => (
					<Tag
						key={tag}
						$active={selectedTag === tag}
						onClick={() => setSelectedTag(tag)}
					>
						{tag}
					</Tag>
				))}
			</TagsRow>

			{/* Grid */}
			{filtered.length === 0 ? (
				<EmptyState>No se encontraron noticias con esos filtros.</EmptyState>
			) : (
				<NoticiasGrid>
					{filtered.map((noticia) => (
						<Card key={noticia.id}>
							<CardImage src={noticia.url} alt={noticia.title} />
							<CardBody>
								<CardTitle>{noticia.title}</CardTitle>
								<CardExplanation>{noticia.explanation}</CardExplanation>
								<CardMeta>
									<span>Por: {noticia.author}</span>
									<span>{new Date(noticia.date).toLocaleDateString()}</span>
								</CardMeta>
								<VerMasLink
									to={`/noticias/${generarSlug(noticia.title)}`}
									state={{ id: noticia.id }}
								>
									Ver más →
								</VerMasLink>
							</CardBody>
						</Card>
					))}
				</NoticiasGrid>
			)}
		</PageWrapper>
	);
};

export default Noticias;
