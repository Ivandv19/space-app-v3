import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/GlobalContext';
import { IoHeart, IoChatbubble, IoShareSocial, IoBookmark } from "react-icons/io5";
import { Navigate, useNavigate } from 'react-router-dom';
import Titulo from './Titulo';
import Descripcion from './Descripcion';
import Spinner from './Spinner';
import useRandomLikes from '../../hooks/useRandomLikes';
import useOrderByLikes from '../../hooks/useOrderByLikes';

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
    padding: 15vh 1vw 10vh 1vw; /* Padding relativo al tamaño de la pantalla */
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

    // Hook de navegación para cambiar de ruta
    const navigate = useNavigate();

    // Función para manejar el clic en el botón "Regresar"
    const handleRegresarClick = () => {
        navigate('/'); // Navega a la ruta raíz
    };

    // Desestructuración del contexto global para acceder a datos y funciones
    const { imagesGaleria, state, toggleSave, toggleLike } = useGlobalContext();
    const { savedImages, likedImages } = state; // Extrae las imágenes guardadas y "liked" del estado global
    const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

    // Custom hooks para asignar likes aleatorios y ordenar las imágenes
    const itemsWithLikes = useRandomLikes(imagesGaleria) || []; // Asigna likes aleatorios a las imágenes
    const topFiveItems = useOrderByLikes(itemsWithLikes) || []; // Ordena las imágenes por la cantidad de likes

    // Efecto que se ejecuta al montar el componente o cambiar imagesGaleria
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Activa el estado de carga
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simula una espera de 1 segundo
            setLoading(false); // Desactiva el estado de carga
        };

        fetchData(); // Llama a la función fetchData
    }, [imagesGaleria]); // Se ejecuta cada vez que imagesGaleria cambia

    console.log('imagenes con likes: ', likedImages);
    console.log('imagenes con guardadas: ', savedImages);


    return (
        (<GalleryContainer>
            {loading ? ( // Verifica si está cargando
                (<Spinner />) // Muestra un spinner mientras se cargan los datos
            ) : (
                <>
                    <HeaderSection>
                        <Titulo titulo="Galería" /> {/* Título de la galería */}
                        <Descripcion descripcion="Explora una colección impresionante de imágenes del espacio. Desde nebulosas hasta planetas, cada imagen cuenta una historia sobre el universo que nos rodea." /> {/* Descripción de la galería */}
                    </HeaderSection>

                    <LikedSavedSection>
                        <h3>Imágenes con más likes</h3> {/* Título de la sección de imágenes más liked */}
                        {topFiveItems.length > 0 ? ( // Verifica si hay imágenes para mostrar
                            (topFiveItems.map((image) => ( // Mapea las imágenes más liked
                                (<GalleryItem key={image.date}>
                                    <Image src={image.url} alt={image.title} /> {/* Muestra la imagen */}
                                    <Overlay> {/* Superposición con información adicional */}
                                        <ItemTitle>{image.title}</ItemTitle> {/* Título de la imagen */}
                                        <ItemDescription__liked>{image.explanation}</ItemDescription__liked> {/* Descripción de la imagen */}
                                    </Overlay>
                                </GalleryItem>)
                            )))
                        ) : (
                            (<p>No hay imágenes para mostrar.</p>) // Mensaje si no hay imágenes
                        )}
                    </LikedSavedSection>

                    <GallerySection>
                        <h3>Galería Principal</h3> {/* Título de la galería principal */}
                        {itemsWithLikes.map((image) => ( // Mapea todas las imágenes con likes
                            (<GalleryItem key={image.date}>
                                <ImageContainer>
                                    <Image src={image.url} alt={image.title} /> {/* Muestra la imagen */}
                                    <Overlay> {/* Superposición con información adicional */}
                                        <ItemTitle>{image.title}</ItemTitle> {/* Título de la imagen */}
                                        <ItemDescription>{image.explanation}</ItemDescription> {/* Descripción de la imagen */}
                                    </Overlay>
                                </ImageContainer>
                                <ButtonContainer> {/* Contenedor de botones para acciones */}
                                    <Button onClick={() => toggleLike(image)}> {/* Botón para dar like */}
                                        <IoHeart color={likedImages.some(likedImage => likedImage.date === image.date) ? 'red' : 'white'} /> {/* Icono de corazón que cambia de color */}
                                        <LikesStyled> {image.likes} {/* Muestra la cantidad de likes */}</LikesStyled>
                                    </Button>
                                    <Button>
                                        <IoChatbubble /> {/* Botón para comentarios */}
                                    </Button>
                                    <Button>
                                        <IoShareSocial /> {/* Botón para compartir */}
                                    </Button>
                                    <Button onClick={() => toggleSave(image)}> {/* Botón para guardar imagen */}
                                        <IoBookmark color={savedImages.some(savedImage => savedImage.date === image.date) ? 'blue' : 'white'} /> {/* Icono de marcador que cambia de color */}
                                    </Button>
                                </ButtonContainer>
                            </GalleryItem>)
                        ))}
                    </GallerySection>

                    <LikedSavedSection>
                        <h3>Imágenes guardadas</h3> {/* Título de la sección de imágenes guardadas */}
                        {itemsWithLikes
                            .filter((image) => savedImages.some(savedImage => savedImage.date === image.date))
                            .map((image) => (
                                <GalleryItem key={image.date}>
                                    <Image src={image.url} alt={image.title} /> {/* Muestra la imagen guardada */}
                                    <Overlay> {/* Superposición con información adicional */}
                                        <ItemTitle>{image.title}</ItemTitle> {/* Título de la imagen guardada */}
                                        <ItemDescription__saved>{image.explanation}</ItemDescription__saved> {/* Descripción de la imagen guardada */}
                                    </Overlay>
                                </GalleryItem>
                            ))
                        }
                    </LikedSavedSection>

                    <RegresarBoton onClick={handleRegresarClick}>Regresar a inicio</RegresarBoton> {/* Botón para regresar a la página de inicio */}
                </>
            )}
        </GalleryContainer>)
    );
};

export default Galeria;