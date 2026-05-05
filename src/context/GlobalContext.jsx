import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
import { noticias as noticiasData } from "../data/noticias";
import { sistemaSolar as sistemaSolarData } from "../data/sistemaSolar";

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

			let newLikedImages = [...state.likedImages];

			if (newLikedImages.some((likedImage) => likedImage.date === image.date)) {
				newLikedImages = newLikedImages.filter(
					(likedImage) => likedImage.date !== image.date,
				);
			} else {
				newLikedImages.push(image);
			}

			return {
				...state,
				likedImages: newLikedImages,
			};
		}

		case actionTypes.TOGGLE_SAVE: {
			const { image } = action.payload;
			let newSavedImages = [...state.savedImages];

			if (newSavedImages.some((savedImage) => savedImage.date === image.date)) {
				newSavedImages = newSavedImages.filter(
					(savedImage) => savedImage.date !== image.date,
				);
			} else {
				newSavedImages.push(image);
			}

			return {
				...state,
				savedImages: newSavedImages,
			};
		}

		default:
			return state; // Devuelve el estado actual si no se reconoce la acción
	}
};

const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const toggleLike = (image) => {
		dispatch({
			type: actionTypes.TOGGLE_LIKE,
			payload: { image },
		});
	};

	const toggleSave = (image) => {
		dispatch({
			type: actionTypes.TOGGLE_SAVE,
			payload: { image },
		});
	};

	const [dailyImage, setDailyImage] = useState(null);
	const [dailyLoading, setDailyLoading] = useState(true);
	const [dailyError, setDailyError] = useState(null);

	useEffect(() => {
		const obtenerImagenDiaria = async () => {
			try {
				setDailyLoading(true);
				const response = await fetch(
					`https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}`,
				);
				if (!response.ok) {
					throw new Error(
						`error al obtener respuesta de la API ${response.status}`,
					);
				}
				const data = await response.json();
				setDailyImage(data);
				setDailyError(null);
			} catch (error) {
				console.log("Error al obtener los datos:", error);
				setDailyError(error.message);
			} finally {
				setDailyLoading(false);
			}
		};
		obtenerImagenDiaria();
	}, []);

	const [imagesGaleria, setImagesGaleria] = useState([]);
	const [galeriaLoading, setGaleriaLoading] = useState(true);
	const [galeriaError, setGaleriaError] = useState(null);

	useEffect(() => {
		const obtenerImagenesDeLaNasa = async () => {
			try {
				setGaleriaLoading(true);
				const response = await fetch(
					`https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}&count=15`,
				);
				if (!response.ok) {
					throw new Error(
						`error al obtener respuesta de la API, codigo: ${response.status}`,
					);
				}
				const data = await response.json();
				setImagesGaleria(data);
				setGaleriaError(null);
			} catch (error) {
				console.log("error al obtener los datos:", error);
				setGaleriaError(error.message);
			} finally {
				setGaleriaLoading(false);
			}
		};
		obtenerImagenesDeLaNasa();
	}, []);

	const noticias = noticiasData;
	const sistemaSolar = sistemaSolarData;

	return (
		<GlobalContext.Provider
			value={{
				dailyImage,
				dailyLoading,
				dailyError,
				imagesGaleria,
				galeriaLoading,
				galeriaError,
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
