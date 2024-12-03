// ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Al cambiar de ruta, desplaza automáticamente la ventana hacia arriba
    window.scrollTo(0, 0);
  }, [pathname]); // Efecto dependiente del cambio en la ruta

  return null; // No renderiza ningún elemento en el DOM
};

export default ScrollToTop;
