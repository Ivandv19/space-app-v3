import { Route, Routes } from "react-router-dom"
import App from "./App.jsx"
import Inicio from "./Pages/Inicio/Inicio.jsx"
import Galería from "./Pages/Galeria/Galería.jsx"
import SistemaSolar from "./Pages/SistemaSolar/SistemaSolar.jsx"
import Noticias from "./Pages/Noticias/Noticias.jsx"
import Noticia from "./Pages/Noticias/Noticia.jsx"




function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<App />}>
                <Route index element={<Inicio />} />
                <Route path='/galería-espacial' element={<Galería />} />
                <Route path="/noticias" element={<Noticias />} />
                <Route path="/noticias/:slug" element={<Noticia />} />
                <Route path="/sistema-solar" element={<SistemaSolar />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes