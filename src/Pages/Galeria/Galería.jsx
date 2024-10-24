import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/GlobalContext';
import { IoHeart, IoChatbubble, IoShareSocial, IoBookmark } from "react-icons/io5";
import { Navigate, useNavigate } from 'react-router-dom';
import Titulo from './Titulo';
import Descripcion from './Descripcion';
import Spinner from './Spinner';

// Contenedor principal con grid layout para las secciones
const GalleryContainer = styled.div`
padding: 150px 20px 50px 20px;
    width: 100%;
    display: grid;
    grid-template-rows: auto auto 200px; 
    grid-template-columns: 1fr 2fr 1fr; // Tres columnas para la galería principal y secciones
    gap: 20px;

    @media (max-width: 1024px) {
        display: flex;
        flex-direction: column;

    }   

    @media (max-width: 768px) {
        padding: 150px 0px 50px 0px;
    }
`;

// Sección para el título y descripción
const HeaderSection = styled.div`
    grid-column: 1 / span 3; // El título y descripción ocuparán todas las columnas
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
    margin-bottom: 100px;

    @media (max-width: 768px) {
        padding: 0 20px;
    }
`;



// Sección para las imágenes "Me gusta" y "Guardadas"
const LikedSavedSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    @media (max-width: 1024px) {
       display: none;
    } 
`;

// Contenedor para la galería principal
const GallerySection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    @media (max-width: 768px) { // Cambia a móviles
        h3{
            font-size: 4vw;
        }
  
    }
`;

// Estilo de cada imagen de la galería
const GalleryItem = styled.div`
    position: relative; // Necesario para el efecto de hover
    overflow: hidden;
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 100%;
    cursor: pointer;

    &:hover img {
        transform: scale(1.05);
    }
`;

const Image = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: transform 0.3s ease;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; // Cubrir toda la imagen
    background-color: rgba(0, 0, 0, 0.6); // Fondo negro con transparencia
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0; // Comienza oculto
    transition: opacity 0.3s ease;
    
    ${GalleryItem}:hover & {
        opacity: 1; // Aparece al hacer hover
    }

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

const ItemTitle = styled.h3`
    font-size: 1.5rem;
    margin: 10px 0;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 2vw;
    }
`;

const ItemDescription = styled.p`
    font-size: 1rem;
    margin: 10px;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 2.5vw;
    }
`;

const ButtonContainer = styled.div`
    position: absolute; // Colocar los botones sobre el overlay
    bottom: 0; // Ajustar según sea necesario
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-evenly;
    padding: 10px;
    z-index: 0;
    background-color: black;
`;

const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 1.5rem;
    transition: transform 0.2s ease;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &:hover {
        color: white;
        transform: scale(1.2);
    }
`;

const ImageContainer = styled.div``;

const ItemDescription__liked = styled.p`
    font-size: 10px;
    margin: 10px;
    text-align: center;
  
`;

const ItemDescription__saved = styled.p`
    font-size: 10px;
    margin: 10px;
    text-align: center;
`;

const LikesStyled = styled.p`
    font-size: 15px;

    @media (max-width: 768px) { // Cambia a móviles
    font-size: 3.5vw;
    }
`

const RegresarBoton = styled.button`
  grid-column: 2 / 3;
  grid-row: 3;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #0a6ad8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 200px;
  height: auto;

  /* Centrado en la celda */
  justify-self: center; /* Centra horizontalmente */
  align-self: center;   /* Centra verticalmente */

  &:hover {
    background-color: #0056b3;
  }
`;



const Galeria = () => {
    const navigate = useNavigate();
    const handleRegresarClick = () => {
        navigate('/'); // Cambia '/noticias' a la ruta correcta para regresar a la lista de noticias
    };

    const { imagesGaleria } = useGlobalContext();
    const [likedImages, setLikedImages] = useState(new Set());
    const [savedImages, setSavedImages] = useState(new Set());
    const [imagesWithLikes, setImagesWithLikes] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Inicia el estado de carga
            // Simula una llamada a la API con un retraso de 2 segundos
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Asignar un número de likes aleatorio a cada imagen
            const imagesWithRandomLikes = imagesGaleria.map(image => ({
                ...image,
                likes: Math.floor(Math.random() * 1001) // Número aleatorio entre 0 y 100
            }));

            setImagesWithLikes(imagesWithRandomLikes);
            setLoading(false); // Cambia el estado de carga a false cuando la información esté disponible
        };

        fetchData();
    }, [imagesGaleria]);

    const toggleLike = (image) => {
        setImagesWithLikes((prevImages) =>
            prevImages.map((img) => {
                if (img.date === image.date) {
                    const newLikes = likedImages.has(image.date)
                        ? img.likes - 1 // Decrementar si ya estaba "me gusta"
                        : img.likes + 1; // Incrementar si no estaba "me gusta"
                    setLikedImages((prev) => {
                        const updatedLikes = new Set(prev);
                        if (updatedLikes.has(image.date)) {
                            updatedLikes.delete(image.date);
                        } else {
                            updatedLikes.add(image.date);
                        }
                        return updatedLikes;
                    });
                    return { ...img, likes: newLikes }; // Actualizar likes
                }
                return img;
            })
        );
    };

    const toggleSave = (image) => {
        setSavedImages((prev) => {
            const updatedSaves = new Set(prev);
            if (updatedSaves.has(image.date)) {
                updatedSaves.delete(image.date);
            } else {
                updatedSaves.add(image.date);
            }
            return updatedSaves;
        });
    };

    // Ordenar las imágenes por likes y tomar las 5 primeras
    const topLikedImages = [...imagesWithLikes]
        .sort((a, b) => b.likes - a.likes) // Ordenar de mayor a menor likes
        .slice(0, 5); // Tomar las 5 primeras

    console.log("Top 5 imágenes con más likes:", topLikedImages); // Debugging

    return (
        <GalleryContainer>
            {/* Componente de carga */}
            {loading ? (
                <Spinner/>
            ) : (
                <>
                    {/* Sección del título y la descripción */}
                    <HeaderSection>
                        <Titulo titulo ="Galería"></Titulo>
                        <Descripcion descripcion=" Explora una colección impresionante de imágenes del espacio. Desde nebulosas hasta planetas, cada imagen cuenta una historia sobre el universo que nos rodea." />
                    </HeaderSection>

                    {/* Sección de imágenes con "Me gusta" */}
                    <LikedSavedSection>
                        <h3>Imágenes con más likes</h3>
                        {topLikedImages.length > 0 ? (
                            topLikedImages.map((image) => (
                                <GalleryItem key={image.date}>
                                    <Image src={image.url} alt={image.title} />
                                    <Overlay>
                                        <ItemTitle>{image.title}</ItemTitle>
                                        <ItemDescription__liked>{image.explanation}</ItemDescription__liked>
                                    </Overlay>
                                </GalleryItem>
                            ))
                        ) : (
                            <p>No hay imágenes para mostrar.</p>
                        )}
                    </LikedSavedSection>

                    {/* Sección de la galería principal */}
                    <GallerySection>
                        <h3>Galería Principal</h3>
                        {imagesWithLikes.map((image) => (
                            <GalleryItem key={image.date}>
                                <ImageContainer>
                                    <Image src={image.url} alt={image.title} />
                                    <Overlay>
                                        <ItemTitle>{image.title}</ItemTitle>
                                        <ItemDescription>{image.explanation}</ItemDescription>
                                    </Overlay>
                                </ImageContainer>
                                <ButtonContainer>
                                    <Button onClick={() => toggleLike(image)}>
                                        <IoHeart color={likedImages.has(image.date) ? 'red' : 'white'} />
                                        <LikesStyled>{image.likes}</LikesStyled> {/* Mostrar la cantidad de likes */}
                                    </Button>
                                    <Button>
                                        <IoChatbubble />
                                    </Button>
                                    <Button>
                                        <IoShareSocial />
                                    </Button>
                                    <Button onClick={() => toggleSave(image)}>
                                        <IoBookmark color={savedImages.has(image.date) ? 'blue' : 'white'} />
                                    </Button>
                                </ButtonContainer>
                            </GalleryItem>
                        ))}
                    </GallerySection>

                    {/* Sección de imágenes guardadas */}
                    <LikedSavedSection>
                        <h3>Imágenes guardadas</h3>
                        {imagesGaleria.filter((image) => savedImages.has(image.date)).map((image) => (
                            <GalleryItem key={image.date}>
                                <Image src={image.url} alt={image.title} />
                                <Overlay>
                                    <ItemTitle>{image.title}</ItemTitle>
                                    <ItemDescription__saved>{image.explanation}</ItemDescription__saved>
                                </Overlay>
                            </GalleryItem>
                        ))}
                    </LikedSavedSection>
                    <RegresarBoton onClick={handleRegresarClick}>Regresar a inicio</RegresarBoton>
                </>
            )}
        </GalleryContainer>
    );
};

export default Galeria;