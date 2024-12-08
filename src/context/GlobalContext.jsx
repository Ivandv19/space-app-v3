import { useReducer } from "react";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Definir los tipos de acción directamente aquí
const actionTypes = {
  TOGGLE_LIKE: "TOGGLE_LIKE",
  TOGGLE_SAVE: "TOGGLE_SAVE",
};

//estado inicial
const initialState = {
  likedImages: [],
  savedImages: [],
};

// Reducer: función que maneja el estado y las acciones
const reducer = (state, action) => {
  // Switch para determinar la acción a realizar
  switch (action.type) {
    case actionTypes.TOGGLE_LIKE: {
      const { image } = action.payload;

      // Manejo del array de likedImages
      let newLikedImages = [...state.likedImages]; // Crea una copia del array de imágenes "liked"

      // Determina si agregar o eliminar la imagen del array
      if (newLikedImages.some((likedImage) => likedImage.date === image.date)) {
        // Elimina la imagen si ya está "liked"
        newLikedImages = newLikedImages.filter(
          (likedImage) => likedImage.date !== image.date
        );
        image.likes -= 1; // Decrementa el número de likes
      } else {
        // Agrega la imagen si no está "liked"
        newLikedImages.push(image);
        image.likes += 1; // Incrementa el número de likes
      }

      return {
        ...state,
        likedImages: newLikedImages, // Actualiza el estado de imágenes "liked"
      };
    }

    case actionTypes.TOGGLE_SAVE: {
      // Manejo de la acción para alternar "guardar"
      const { image } = action.payload; // Recibe el objeto de imagen
      let newSavedImages = [...state.savedImages]; // Crea una copia del array de imágenes guardadas

      // Determina si agregar o eliminar la imagen del array
      if (newSavedImages.some((savedImage) => savedImage.date === image.date)) {
        newSavedImages = newSavedImages.filter(
          (savedImage) => savedImage.date !== image.date
        ); // Elimina si ya está guardada
      } else {
        newSavedImages.push(image); // Agrega si no está guardada
      }

      return {
        ...state,
        savedImages: newSavedImages, // Actualiza el estado de imágenes guardadas
      };
    }

    default:
      return state; // Devuelve el estado actual si no se reconoce la acción
  }
};

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // Usa useReducer para manejar el estado global
  const [state, dispatch] = useReducer(reducer, initialState);

  // Función para alternar el estado de "like" de una imagen
  const toggleLike = (image) => {
    dispatch({
      type: actionTypes.TOGGLE_LIKE, // Tipo de acción
      payload: {
        image, // Pasa el objeto de la imagen
      },
    });
  };

  // Función para alternar el estado de "guardar" de una imagen
  const toggleSave = (image) => {
    // Despacha la acción para alternar el estado de guardado
    dispatch({
      type: actionTypes.TOGGLE_SAVE, // Tipo de acción
      payload: {
        image, // Pasa el objeto de la imagen
      },
    });
  };

  //Llamada a api DailyImage
  const [dailyImage, setDailyImage] = useState([]);

  useEffect(() => {
    // Definir la función asincrónica dentro del useEffect
    const obtenerImagenDiaria = async () => {
      try {
        const response = await fetch(
          "https://api.nasa.gov/planetary/apod?api_key=je5e0Ea2hTgbHjumbfYV7PxzWeGUXdVHntdsJY7G"
        );
        if (!response.ok) {
          throw new Error(
            `error al obtener respuesta de la API ${response.status}`
          );
        }
        const data = await response.json();
        setDailyImage(data);
      } catch (error) {
        console.log("Error al obtener los datos:", error);
      }
    };
    obtenerImagenDiaria(); // Llamamos a la función asincrónica
  }, []);

  //Llamada a api Galeria de la NASA
  const [imagesGaleria, setImagesGaleria] = useState([]);

  useEffect(() => {
    const obtenerImagenesDeLaNasa = async () => {
      try {
        const response = await fetch(
          "https://api.nasa.gov/planetary/apod?api_key=je5e0Ea2hTgbHjumbfYV7PxzWeGUXdVHntdsJY7G&count=15"
        );
        if (!response.ok) {
          throw new Error(
            `error al obtener respuesta de la API, codigo: ${response.status}`
          );
        }
        const data = await response.json();
        setImagesGaleria(data);
      } catch (error) {
        console.log("error al obtener los datos:", error);
      }
    };
    obtenerImagenesDeLaNasa();
  }, []);

  //Llamada a API de Noticias
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/ivandevI9/api_info_noticias_spaceappv3/noticias"
        );
        if (!response.ok) {
          throw new Error(
            `error al obtener respuesta de la API, codigo: ${response.status}`
          );
        }
        const data = await response.json();
        setNoticias(data);
      } catch (error) {
        console.log("error al obtener los datos:", error);
      }
    };

    obtenerNoticias();
  }, []);

  //Llamada a api de Sistema Solar
  const [sistemaSolar, setSistemaSolar] = useState({});

  useEffect(() => {
    const obtenerDatosSistemaSolar = async () => {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/ivandevI9/api_info_sistemasolar_spaceappv3/sistema-solar"
        );
        if (!response) {
          throw new Error(
            `error al obtener respuesta de la API, codigo: ${response.status}`
          );
        }
        const data = await response.json();
        setSistemaSolar(data);
      } catch (error) {
        console.log("error al obtener los datos:", error);
      }
    };
    obtenerDatosSistemaSolar();
  }, []);
 

  return (
    <GlobalContext.Provider
      value={{
        dailyImage,
        imagesGaleria,
        noticias,
        sistemaSolar,
        state,
        toggleLike,
        toggleSave,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
