
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/GlobalContext';


const NoticiaContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 20px 20px;
    text-align: center;
    width: 100%;
    height: auto;

`

const ContentDiv = styled.section`
max-width: 80vw;
    
`

const NoticiaTitle = styled.h2`
    font-size: 1.8rem;
    margin: 0;
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

const NoticiaImage = styled.img`
    max-width: 80vw;
    max-height: 50vh;
`

const Noticia = () => {
    const location = useLocation();
    const { id } = location.state || {}; // Obtiene el ID de la noticia desde el estado

    const { noticias } = useGlobalContext();

    // Busca la noticia correspondiente al ID
    const noticia = noticias.find(n => n.id === id);

    return (
        <NoticiaContainer>
            <NoticiaTitle>{noticia.title}</NoticiaTitle>
            <NoticiaDescription>{noticia.explanation}</NoticiaDescription>
            <NoticiaAuthor>Por: {noticia.author}</NoticiaAuthor>
            <NoticiaDate>{new Date(noticia.date).toLocaleDateString()}</NoticiaDate>
            <NoticiaImage src={noticia.url} />
            <ContentDiv>{noticia.content}</ContentDiv>
        </NoticiaContainer>

    );
};

export default Noticia;