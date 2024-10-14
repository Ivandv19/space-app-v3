import { Children, createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    //Llamada a api DailyImage
    const [dailyImage, setDailyImage] = useState([]);
    useEffect(() => {
        fetch('https://api.nasa.gov/planetary/apod?api_key=je5e0Ea2hTgbHjumbfYV7PxzWeGUXdVHntdsJY7G')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setDailyImage(data);
            })
            .catch(err => {
                console.log('Error al obtener datos', err);
            });
    }, []);



    //Llamada a api Galeria de la NASA
    const [imagesGaleria, setImagesGaleria] = useState([]);
    useEffect(() => {
        fetch('https://api.nasa.gov/planetary/apod?api_key=je5e0Ea2hTgbHjumbfYV7PxzWeGUXdVHntdsJY7G&count=15')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar las imágenes');
                }
                return response.json();
            })
            .then(data => {
                setImagesGaleria(data);
            })
            .catch(err => {
                console.log('Error al obtener datos', err);
            });
    }, []); // Solo se ejecuta cuando el componente se monta


    //Llamada a API de Noticias
    const [noticias, setNoticias] = useState([]);
    useEffect(() => {
        fetch('https://my-json-server.typicode.com/ivandevI9/api_info_noticias_spaceappv3/noticias') // Cambia esto a la URL correcta
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar las noticias');
                }
                return response.json(); // Convierte la respuesta a JSON
            })
            .then(data => {
                setNoticias(data); // Guarda el array de noticias en el estado
            })
            .catch(err => {
                console.log('Error al obtener datos', err);
            });
    }, []); // Solo se ejecuta al montar el componente


    //Llamada a api de Sistema Solar
    const [sistemaSolar, setSistemaSolar] = useState({});
    useEffect(() => {
        fetch('https://my-json-server.typicode.com/ivandevI9/api_info_sistemasolar_spaceappv3/sistema-solar')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar el archivo');
                }
                return response.json();
            })
            .then(data => {
                setSistemaSolar(data);
            })
            .catch(err => {
                console.log('Error al obtener datos', err);
            });
    }, []);




    return (
        <GlobalContext.Provider value={{ dailyImage, imagesGaleria, noticias, sistemaSolar }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}