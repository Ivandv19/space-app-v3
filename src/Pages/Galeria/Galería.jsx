import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/GlobalContext';


const GalleryContainer = styled.div`
    padding: 50px 20px;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
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
    max-width: 800px; /* Limita el ancho de la descripción */
`;

const GalleryItem = styled.div`
    display: flex;
    flex-direction: column; /* Organiza en columna */
    align-items: center; /* Centra el contenido */
    margin-bottom: 20px; /* Espaciado entre elementos */
    border: 1px solid #ccc; /* Añade un borde */
    border-radius: 10px; /* Bordes redondeados */
    overflow: hidden; /* Oculta el desbordamiento */
    width: 50vw;
    height: auto;
    gap: 10px;

    cursor: pointer;

    &:hover img {
        transform: scale(1.05); /* Aumenta el tamaño menos */
    }

    img {
        width: 100%;
        height: auto;
        object-fit: cover;
        transition: transform 0.3s ease;
    }
`;

const Image = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
`;

const ItemTitle = styled.h3`
    font-size: 1.5rem;
    margin: 10px 0;
`;

const ItemDate = styled.p`
    font-size: 0.9rem;
    color: #555;
`;

const ItemDescription = styled.p`
    font-size: 1rem;
    margin: 10px;
    text-align: center; /* Centra la descripción */
`;

const Galeria = () => {
    const { imagesGaleria } = useGlobalContext();

    return (
        <GalleryContainer>
            <PageTitle>Galería Espacial</PageTitle>
            <PageDescription>
                Explora una colección impresionante de imágenes del espacio. Desde nebulosas hasta planetas, cada imagen cuenta una historia sobre el universo que nos rodea.
            </PageDescription>
            {imagesGaleria.map((image) => (
                <GalleryItem key={image.date}>
                    <Image src={image.url} alt={image.title} />
                    <ItemTitle>{image.title}</ItemTitle>
                    <ItemDate>{new Date(image.date).toLocaleDateString()}</ItemDate>
                    <ItemDescription>{image.explanation}</ItemDescription>
                </GalleryItem>
            ))}
        </GalleryContainer>
    );
};

export default Galeria;