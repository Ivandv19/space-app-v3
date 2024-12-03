import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import { useNavigate } from "react-router-dom";
import Spinner from "../Galeria/Spinner";
import Titulo from "../Galeria/Titulo";
import Descripcion from "../Galeria/Descripcion";

const Container = styled.div`
  /* Estilos principales */
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 150px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;

  /* Media query para pantallas medianas (tabletas) */
  @media (max-width: 1024px) {
    padding: 15vh 1vw 10vh 1vw;
  }

  /* Media query para pantallas pequeñas (móviles) */
  @media (max-width: 768px) {
    padding: 15vh 1vw 10vh 1vw;
  }
`;

const RegresarBoton = styled.button`
  /* Estilos principales del botón */
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  /* Media query para pantallas pequeñas (móviles) */
  @media (max-width: 768px) {
    font-size: 4vw;
  }
`;

const SistemaSolar = () => {
  const navigate = useNavigate(); // Inicializa el hook de navegación
  const handleRegresarClick = () => {
    navigate("/"); // Función para regresar a la página principal
  };

  const { sistemaSolar } = useGlobalContext(); // Obtiene los datos del contexto global
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null); // Inicializa la categoría seleccionada con null
  const [loading, setLoading] = useState(true); // Inicializa el estado de carga como verdadero

  useEffect(() => {
    if (sistemaSolar && Object.keys(sistemaSolar).length > 0) {
      // Verifica si el sistemaSolar tiene datos antes de establecer la categoría
      setCategoriaSeleccionada(Object.keys(sistemaSolar)[0]); // Establece la primera categoría como seleccionada
    }
  }, [sistemaSolar]); // Este useEffect se ejecuta cuando sistemaSolar cambia

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Activa el estado de carga
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula una carga de 2 segundos
      setLoading(false); // Desactiva el estado de carga
    };

    fetchData(); // Llama a la función para obtener datos
  }, []); // Este efecto se ejecuta solo una vez al montar el componente

  return (
    <Container>
      {" "}
      {/* Contenedor principal del componente */}
      {loading ? ( // Condición para mostrar el spinner si está cargando
        <Spinner />
      ) : !categoriaSeleccionada ? ( // Condición para mostrar mensaje si no hay categorías
        <p>No hay categorías disponibles.</p>
      ) : (
        <>
          {" "}
          {/* Fragmento para agrupar los elementos */}
          <Titulo titulo="Sistema solar" /> {/* Componente para el título */}
          <Descripcion descripcion="Explora el Sistema Solar a través de diversas categorías, donde puedes ver información sobre planetas, lunas y más. Navega fácilmente entre los elementos utilizando la barra de navegación y el carrusel interactivo." />{" "}
          {/* Componente para la descripción */}
          <Navbar
            categorias={Object.keys(sistemaSolar)} // Pasa las categorías al componente Navbar
            categoriaSeleccionada={categoriaSeleccionada} // Pasa la categoría seleccionada
            setCategoriaSeleccionada={setCategoriaSeleccionada} // Pasa la función para cambiar la categoría seleccionada
          />
          <Carousel
            categoriaSeleccionada={categoriaSeleccionada} // Pasa la categoría seleccionada al carrusel
            datos={sistemaSolar[categoriaSeleccionada]} // Pasa los datos de la categoría seleccionada
          />
          <RegresarBoton onClick={handleRegresarClick}>
            Regresar a inicio
          </RegresarBoton>{" "}
          {/* Botón para regresar a la página principal */}
        </>
      )}
    </Container>
  );
};

export default SistemaSolar; // Exporta el componente SistemaSolar
