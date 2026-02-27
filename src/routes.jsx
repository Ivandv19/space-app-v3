import { Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import Galería from "./Pages/Galeria/Galería.jsx";
import Inicio from "./Pages/Inicio/Inicio.jsx";
import Noticia from "./Pages/Noticias/Noticia.jsx";
import Noticias from "./Pages/Noticias/Noticias.jsx";
import SistemaSolar from "./Pages/SistemaSolar/SistemaSolar.jsx";

function AppRoutes() {
	return (
		<Routes>
			{/* Ruta principal del sitio */}
			<Route path="/" element={<App />}>
				{/* Ruta de inicio */}
				<Route index element={<Inicio />} />
				{/* Ruta de la galería espacial */}
				<Route path="/galería-espacial" element={<Galería />} />
				{/* Ruta de noticias */}
				<Route path="/noticias" element={<Noticias />} />
				{/* Ruta de una noticia específica */}
				<Route path="/noticias/:slug" element={<Noticia />} />
				{/* Ruta del sistema solar */}
				<Route path="/sistema-solar" element={<SistemaSolar />} />
			</Route>
		</Routes>
	);
}

export default AppRoutes;
