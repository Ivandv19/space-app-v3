import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";

/* ─── Layout ────────────────────────────────────────────── */
const PageWrapper = styled.div`
  padding: 100px 20px 60px;
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

/* ─── Hero image ────────────────────────────────────────── */
const HeroImage = styled.img`
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  border-radius: 14px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.12);
`;

/* ─── Meta ──────────────────────────────────────────────── */
const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.82rem;
  color: #888;
  flex-wrap: wrap;
`;

const Category = styled.span`
  background: #1a1a2e;
  color: #fff;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
`;

/* ─── Título ────────────────────────────────────────────── */
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #1a1a2e;
  line-height: 1.3;
  margin: 0;

  @media (max-width: 640px) {
    font-size: 1.4rem;
  }
`;

/* ─── Resumen ───────────────────────────────────────────── */
const Explanation = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.7;
  border-left: 4px solid #1a1a2e;
  padding-left: 16px;
  margin: 0;
`;

/* ─── Cuerpo ────────────────────────────────────────────── */
const Content = styled.p`
  font-size: 1rem;
  color: #333;
  line-height: 1.8;
  margin: 0;
`;

/* ─── Tags ──────────────────────────────────────────────── */
const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  background: #f0f0f5;
  color: #555;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 0.78rem;
`;

/* ─── Divider ───────────────────────────────────────────── */
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 0;
`;

/* ─── Back button ───────────────────────────────────────── */
const BackBtn = styled.button`
  align-self: flex-start;
  padding: 10px 20px;
  background: #1a1a2e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s;

  &:hover {
    background: #2d2d5e;
  }
`;

/* ─── Componente ────────────────────────────────────────── */
const Noticia = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  const { noticias } = useGlobalContext();
  const noticia = noticias.find((n) => n.id === id);

  if (!noticia) {
    return (
      <PageWrapper>
        <p>Noticia no encontrada.</p>
        <BackBtn onClick={() => navigate("/noticias")}>← Volver a Noticias</BackBtn>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Imagen principal */}
      <HeroImage src={noticia.url} alt={noticia.title} />

      {/* Meta: categoría + autor + fecha */}
      <Meta>
        <Category>{noticia.categoria}</Category>
        <span>Por {noticia.author}</span>
        <span>{new Date(noticia.date).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}</span>
        <span>👁 {noticia.views.toLocaleString()} vistas</span>
      </Meta>

      {/* Título */}
      <Title>{noticia.title}</Title>

      {/* Resumen destacado */}
      <Explanation>{noticia.explanation}</Explanation>

      <Divider />

      {/* Contenido completo */}
      <Content>{noticia.content}</Content>

      {/* Tags / Keywords */}
      <TagsRow>
        {noticia.keywords.map((kw) => (
          <Tag key={kw}>#{kw}</Tag>
        ))}
      </TagsRow>

      <Divider />

      {/* Regresar */}
      <BackBtn onClick={() => navigate("/noticias")}>← Volver a Noticias</BackBtn>
    </PageWrapper>
  );
};

export default Noticia;
