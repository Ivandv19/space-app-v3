import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import { useEffect } from 'react';
import Spinner from '../Galeria/Spinner';
import Titulo from '../Galeria/Titulo';
import Descripcion from '../Galeria/Descripcion';


// Contenedor principal para las noticias, con padding y disposición en columna
const NoticiasContainer = styled.div`
    padding: 150px 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;

    @media (max-width: 1024px) {
        // Ajuste del padding para pantallas de tamaño medio
        padding: 15vh 1vw 10vh 1vw;
    }

    @media (max-width: 768px) {
        // Ajuste del padding para pantallas pequeñas (móviles)
        padding: 15vh 1vw 10vh 1vw;
    }
`;

// Estilo para el input de búsqueda, con padding y ajuste de tamaño en móviles
const SearchInput = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;

    @media (max-width: 768px) {
        // Ajuste del tamaño de la fuente en móviles
        font-size: 4vw;
    }
`;

// Estilo para el select de filtros, con padding y ajuste de tamaño en móviles
const FilterSelect = styled.select`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px 0;

    @media (max-width: 768px) {
        // Ajuste del tamaño de la fuente en móviles
        font-size: 4vw;
    }
`;

// Estilo para el select de orden, con padding y ajuste de tamaño en móviles
const OrderSelect = styled.select`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px 0;

    @media (max-width: 768px) {
        // Ajuste del tamaño de la fuente en móviles
        font-size: 4vw;
    }
`;

// Contenedor para cada noticia, con borde, padding, y efectos de hover
const NoticiaItem = styled.div`
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 800px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s; // Transición de escala al hacer hover

    &:hover {
        // Escala el contenedor de la noticia al pasar el mouse
        transform: scale(1.05);
    }
`;

// Estilo para el título de la noticia
const NoticiaTitle = styled.h2`
    font-size: 1.8rem;
    margin: 0;
    display: flex;
    text-align: center;
`;

// Estilo para la descripción de la noticia
const NoticiaDescription = styled.p`
    font-size: 1rem;
    color: #555;
    text-align: center;
`;

// Estilo para el autor de la noticia
const NoticiaAuthor = styled.p`
    font-size: 0.9rem;
    color: #777;
`;

// Estilo para la fecha de la noticia
const NoticiaDate = styled.p`
    font-size: 0.9rem;
    color: #777;
`;

// Contenedor para el slider, con disposición en columna
const SliderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0;
`;

// Estilo para el slider de ajuste
const Slider = styled.input`
    margin: 10px 0;
`;

// Función para generar un slug a partir del título de la noticia
const generarSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9áéíóúüñ\s]+/g, '')  // Elimina caracteres no alfanuméricos
        .replace(/\s+/g, '-');  // Reemplaza espacios por guiones
};

// Estilo para el botón "Ver Más"
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
        // Cambio de color al hacer hover
        background-color: #0056b3;
    }
`;

// Estilo para la imagen de la noticia
const NoticiaImage = styled.img`
    width: 70%;
    height: auto;
    border-radius: 10px;
`

// Contenedor para la búsqueda, con disposición en columna
const BusquedaContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    @media (max-width: 768px) {
        // Ajuste del ancho para pantallas móviles
        width: 100%;
    }
`

// Contenedor para los filtros, con disposición en fila en pantallas grandes y columna en móviles
const FilstrosContainer = styled.section`
    display: flex;
    flex-direction: row;
    gap: 20px;

    @media (max-width: 768px) {
        // Ajuste de disposición para pantallas móviles
        width: 100%;
        flex-direction: column;
    }
`

// Sección de noticias en formato de grid, con 3 columnas en pantallas grandes y adaptabilidad en móviles
const NoticiasSection = styled.section`
    display: grid;
    grid-template-columns: repeat(3, 1fr);  // Establece 3 columnas
    gap: 20px; // Espacio entre elementos del grid
    width: 100%; // Asegura que el grid ocupe todo el ancho disponible

    @media (max-width: 1024px) {
        // Ajuste de columnas para pantallas medianas
        grid-template-columns: repeat(auto-fit, minmax(30vw, 1fr));
    }

    @media (max-width: 768px) {
        // Solo una columna en pantallas móviles
        grid-template-columns: 1fr;
    }
`;

// Estilo para el botón de regresar
const RegresarBoton = styled.button`
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        // Cambio de color al hacer hover
        background-color: #0056b3;
    }
`;

// Componente Noticias
const Noticias = () => {
    const navigate = useNavigate(); // Inicializa el hook para la navegación

    const handleRegresarClick = () => {
        navigate('/');
    };

    const [orderDirection, setOrderDirection] = useState('reciente'); // Estado para la dirección de orden
    const [orderBy, setOrderBy] = useState(''); // Estado para el criterio de orden
    const [showViewsSlider, setShowViewsSlider] = useState(false); // Estado para mostrar el slider de vistas
    const [viewsLimit, setViewsLimit] = useState(0); // Estado para el límite de vistas
    const { noticias } = useGlobalContext(); // Obtener noticias del contexto global
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
    const [selectedCategory, setSelectedCategory] = useState(''); // Estado para la categoría seleccionada
    const [selectedAuthor, setSelectedAuthor] = useState(''); // Estado para el autor seleccionado
    const [selectedTag, setSelectedTag] = useState(''); // Estado para la etiqueta seleccionada
    const [loading, setLoading] = useState(true); // Estado de carga

    // Obtener categorías y autores únicos
    const categories = [...new Set(noticias.map(noticia => noticia.categoria))];
    const authors = [...new Set(noticias.map(noticia => noticia.author))];

    // Filtrar noticias según el término de búsqueda y otros filtros seleccionados
    const filteredNoticias = noticias.filter((noticia) => {
        const matchesTitle = noticia.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? noticia.categoria === selectedCategory : true;
        const matchesAuthor = selectedAuthor ? noticia.author === selectedAuthor : true;
        const matchesTag = selectedTag ? noticia.keywords.includes(selectedTag) : true;

        return matchesTitle && matchesCategory && matchesAuthor && matchesTag && noticia.views >= viewsLimit; // Filtrar por vistas
    });

    // Ordenar noticias según el criterio y dirección seleccionados
    const sortedNoticias = [...filteredNoticias].sort((a, b) => {
        if (orderBy === 'fecha') {
            return orderDirection === 'reciente'
                ? new Date(b.date) - new Date(a.date) // Más reciente primero
                : new Date(a.date) - new Date(b.date); // Más antiguo primero
        } else if (orderBy === 'relevancia') {
            return orderDirection === 'masVistas'
                ? b.views - a.views // Más vistas primero
                : a.views - b.views; // Menos vistas primero
        }
        return 0; // No se hace nada si no se está ordenando
    });

    // Manejar el cambio en el criterio de orden
    const handleOrderByChange = (e) => {
        const value = e.target.value;
        setOrderBy(value);
        setShowViewsSlider(value === 'relevancia'); // Mostrar el slider solo si se selecciona "relevancia"
        if (value !== 'relevancia') {
            setOrderDirection('reciente'); // Resetear a 'reciente' si se cambia a otro orden
        }
    };

    // Efecto para simular la carga de datos
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Inicia el estado de carga
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simula una llamada a la API
            setLoading(false); // Cambia el estado de carga a false
        };

        fetchData();
    }, [noticias]);

    // Renderizar el componente
    return (
        <NoticiasContainer>
            {loading ? ( // Mostrar spinner si está cargando
                <Spinner />
            ) : (
                <>
                    <Titulo titulo="Últimas Noticias del Mundo Espacial" /> {/* Título de la sección */}
                    <Descripcion descripcion="Aquí encontrarás las noticias más recientes sobre exploración espacial, astronomía, astrofísica y tecnología espacial. Mantente al día con los descubrimientos más emocionantes y eventos importantes en el ámbito de la ciencia." /> {/* Descripción de la sección */}
                    <BusquedaContainer>
                        <SearchInput
                            onChange={(e) => setSearchTerm(e.target.value)} // Manejar el cambio en el input de búsqueda
                            placeholder="Buscar por título"
                        />
                        <FilstrosContainer>
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
                                        step="1000" // Paso de 1000 para cada movimiento del slider
                                        value={viewsLimit}
                                        onChange={(e) => setViewsLimit(e.target.value)} // Manejar el cambio en el slider
                                    />
                                </SliderContainer>
                            )}
                            {orderBy === 'fecha' && (
                                <FilterSelect onChange={(e) => setOrderDirection(e.target.value)}>
                                    <option value="reciente">Más Reciente</option>
                                    <option value="antigua">Más Antigua</option>
                                </FilterSelect>
                            )}
                        </FilstrosContainer>
                    </BusquedaContainer>
                    <NoticiasSection>
                        {sortedNoticias.map((noticia) => ( // Mapear las noticias ordenadas y filtradas
                            <NoticiaItem key={noticia.id}>
                                <NoticiaImage src={noticia.url} /> {/* Imagen de la noticia */}
                                <NoticiaTitle>{noticia.title}</NoticiaTitle> {/* Título de la noticia */}
                                <NoticiaDescription>{noticia.explanation}</NoticiaDescription> {/* Descripción de la noticia */}
                                <NoticiaAuthor>Por: {noticia.author}</NoticiaAuthor> {/* Autor de la noticia */}
                                <NoticiaDate>{new Date(noticia.date).toLocaleDateString()}</NoticiaDate> {/* Fecha de la noticia */}
                                <Link to={`/noticias/${generarSlug(noticia.title)}`} state={{ id: noticia.id }}> {/* Enlace a la página de detalle de la noticia */}
                                    <VerMasButton>Ver Más</VerMasButton> {/* Botón para ver más detalles */}
                                </Link>
                            </NoticiaItem>
                        ))}
                    </NoticiasSection>
                    <RegresarBoton onClick={handleRegresarClick}>Regresar a inicio</RegresarBoton> {/* Botón para regresar a la página de inicio */}
                </>
            )}
        </NoticiasContainer>
    );
};

// Exportar el componente Noticias
export default Noticias;