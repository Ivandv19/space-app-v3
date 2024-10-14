import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/GlobalContext';

const NoticiaContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;  // Aumentar el espacio entre elementos
    padding: 150px 20px;  // Ajustar el padding para un mejor espaciado
    text-align: center;
    width: 100%;
    height: auto;
    background-color: #f9f9f9;  // Fondo sutil para resaltar la noticia
    border-radius: 10px;  // Bordes redondeados
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);  // Sombra para dar profundidad
`;

const ContentDiv = styled.section`
    max-width: 80vw;
    font-size: 1rem;  // Ajustar el tamaño de fuente para una mejor legibilidad
    color: #333;  // Color de texto oscuro para el contenido
    line-height: 1.5;  // Aumentar el espacio entre líneas
`;

const NoticiaTitle = styled.h2`
    font-size: 2.2rem;  // Aumentar el tamaño del título
    font-weight: bold;  // Negrita para destacar el título
    margin: 0;
    color: #333;  // Color azul para el título
`;

const NoticiaDescription = styled.p`
    font-size: 1.1rem;  // Tamaño de fuente ligeramente más grande
    color: #555;
    margin: 10px 0;  // Espacio superior e inferior
`;

const NoticiaAuthor = styled.p`
    font-size: 0.9rem;
    color: #777;
    margin: 5px 0;  // Espacio ajustado
`;

const NoticiaDate = styled.p`
    font-size: 0.9rem;
    color: #777;
    margin: 5px 0;  // Espacio ajustado
`;

const NoticiaImage = styled.img`
    max-width: 50%;  // Aumentar el ancho máximo de la imagen
    height: auto;  // Mantener la proporción de la imagen
    border-radius: 10px;  // Bordes redondeados para la imagen
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);  // Sombra sutil para la imagen
`;

const NoticiaCenter = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    max-width: 70%;
`;

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
        background-color: #0056b3;
    }
`;

const Noticia = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Inicializa el hook para la navegación
    const { id } = location.state || {}; // Obtiene el ID de la noticia desde el estado

    const { noticias } = useGlobalContext();

    // Busca la noticia correspondiente al ID
    const noticia = noticias.find(n => n.id === id);

    const handleRegresarClick = () => {
        navigate('/noticias'); // Cambia '/noticias' a la ruta correcta para regresar a la lista de noticias
    };

    return (
        <NoticiaContainer>
            <NoticiaCenter>
                <NoticiaTitle>{noticia.title}</NoticiaTitle>
                <NoticiaDescription>{noticia.explanation}</NoticiaDescription>
                <NoticiaAuthor>Por: {noticia.author}</NoticiaAuthor>
                <NoticiaDate>{new Date(noticia.date).toLocaleDateString()}</NoticiaDate>
                <NoticiaImage src={noticia.url} alt={noticia.title} />
                <ContentDiv>{noticia.content}</ContentDiv>
                <RegresarBoton onClick={handleRegresarClick}>Regresar a Noticias</RegresarBoton>
            </NoticiaCenter>
        </NoticiaContainer>
    );
};

export default Noticia;