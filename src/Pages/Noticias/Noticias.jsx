import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';


const NoticiasContainer = styled.div`
    padding: 50px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
`;

const SearchInput = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 80vw;
    max-width: 400px;
`;

const FilterSelect = styled.select`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px 0;
`;

const OrderSelect = styled.select`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px 0;
`;

const NoticiaItem = styled.div`
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 80vw;
    max-width: 800px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const NoticiaTitle = styled.h2`
    font-size: 1.8rem;
    margin: 0;
    display: flex;
   
`;

const NoticiaDescription = styled.p`
    font-size: 1rem;
    color: #555;
`;

const NoticiaAuthor = styled.p`
    font-size: 0.9rem;
    color: #777;
`;

const NoticiaDate = styled.p`
    font-size: 0.9rem;
    color: #777;
`;

const SliderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0;
`;

const Slider = styled.input`
    margin: 10px 0;
`;

const PageTitle = styled.h2`
    font-size: 2.5rem;
    color: #333;
    text-align: center;
    
`;

const PageDescription = styled.p`
    font-size: 1.2rem;
    color: #666;
    text-align: center;
    max-width: 800px;
`;

const generarSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9áéíóúüñ\s]+/g, '')
        .replace(/\s+/g, '-');
};

const VerMasButton = styled.a`
    display: inline-block;
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;


const NoticiaImage = styled.img`
    width: 100%;
`

const Noticias = () => {

    const [orderDirection, setOrderDirection] = useState('reciente');
    const [orderBy, setOrderBy] = useState('');
    const [showViewsSlider, setShowViewsSlider] = useState(false); // Nueva state para mostrar el slider
    const [viewsLimit, setViewsLimit] = useState(0); // Estado para el límite de vistas
    const { noticias } = useGlobalContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [selectedTag, setSelectedTag] = useState('');

    // Obtener categorías y autores únicos directamente en el componente
    const categories = [...new Set(noticias.map(noticia => noticia.categoria))];
    const authors = [...new Set(noticias.map(noticia => noticia.author))];

    const filteredNoticias = noticias.filter((noticia) => {
        const matchesTitle = noticia.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? noticia.categoria === selectedCategory : true;
        const matchesAuthor = selectedAuthor ? noticia.author === selectedAuthor : true;
        const matchesTag = selectedTag ? noticia.keywords.includes(selectedTag) : true;

        return matchesTitle && matchesCategory && matchesAuthor && matchesTag && noticia.views >= viewsLimit; // Filtrar por vistas
    });

    const sortedNoticias = [...filteredNoticias].sort((a, b) => {
        if (orderBy === 'fecha') {
            return orderDirection === 'reciente'
                ? new Date(b.date) - new Date(a.date)  // Más reciente primero
                : new Date(a.date) - new Date(b.date); // Más antiguo primero
        } else if (orderBy === 'relevancia') {
            return orderDirection === 'masVistas'
                ? b.views - a.views  // Más vistas primero
                : a.views - b.views; // Menos vistas primero
        }
        return 0; // No se hace nada si no se está ordenando
    });

    const handleOrderByChange = (e) => {
        const value = e.target.value;
        setOrderBy(value);
        setShowViewsSlider(value === 'relevancia'); // Mostrar el slider solo si se selecciona "relevancia"
        if (value !== 'relevancia') {
            setOrderDirection('reciente'); // Resetear a 'reciente' si se cambia a otro orden
        }
    };

    return (
        <NoticiasContainer>
            <PageTitle>Últimas Noticias del Mundo Espacial</PageTitle>
            <PageDescription>Aquí encontrarás las noticias más recientes sobre exploración espacial, astronomía, astrofísica y tecnología espacial. Mantente al día con los descubrimientos más emocionantes y eventos importantes en el ámbito de la ciencia.</PageDescription>

            <SearchInput
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por título"
            />
            <FilterSelect onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">Todas las categorías</option>
                {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </FilterSelect>

            <FilterSelect onChange={(e) => setSelectedAuthor(e.target.value)}>
                <option value="">Todos los autores</option>
                {authors.map((author) => (
                    <option key={author} value={author}>{author}</option>
                ))}
            </FilterSelect>

            <OrderSelect onChange={handleOrderByChange}>
                <option value="">Ordenar por</option>
                <option value="fecha">Fecha</option>
                <option value="relevancia">Relevancia</option>
            </OrderSelect>

            {showViewsSlider && (
                <SliderContainer>
                    <label htmlFor="viewsRange">Filtrar por vistas: {viewsLimit}</label>
                    <Slider
                        type="range"
                        id="viewsRange"
                        min="1000"
                        max="10000"
                        step="1000"  // Paso de 1000 para cada movimiento del slider
                        value={viewsLimit}
                        onChange={(e) => setViewsLimit(e.target.value)}
                    />
                </SliderContainer>
            )}

            {orderBy === 'fecha' && (
                <FilterSelect onChange={(e) => setOrderDirection(e.target.value)}>
                    <option value="reciente">Más Reciente</option>
                    <option value="antigua">Más Antigua</option>
                </FilterSelect>
            )}



            {sortedNoticias.map((noticia) => (
                <NoticiaItem key={noticia.id}>
                    <NoticiaTitle>{noticia.title}</NoticiaTitle>
                    <NoticiaDescription>{noticia.explanation}</NoticiaDescription>
                    <NoticiaAuthor>Por: {noticia.author}</NoticiaAuthor>
                    <NoticiaDate>{new Date(noticia.date).toLocaleDateString()}</NoticiaDate>
                    <NoticiaImage src={noticia.url} />
                    <Link to={`/noticias/${generarSlug(noticia.title)}`} state={{ id: noticia.id }}>
                        <VerMasButton>Ver Más</VerMasButton>
                    </Link>
                </NoticiaItem>
            ))}
        </NoticiasContainer>
    );
};

export default Noticias;