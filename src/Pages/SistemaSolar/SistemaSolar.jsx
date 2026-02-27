import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import Descripcion from "../Galeria/Descripcion";
import Spinner from "../Galeria/Spinner";
import Titulo from "../Galeria/Titulo";
import Carousel from "./Carousel";
import Navbar from "./Navbar";

const Container = styled.div`
  text-align: center;
  padding: 100px 20px 60px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;

  @media (max-width: 1024px) {
    padding: 90px 16px 40px;
  }
`;

const SistemaSolar = () => {
	const navigate = useNavigate(); // Inicializa el hook de navegación
	const handleRegresarClick = () => {
		navigate("/"); // Función para regresar a la página principal
	};

	const { sistemaSolar } = useGlobalContext();
	const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

	useEffect(() => {
		if (sistemaSolar && Object.keys(sistemaSolar).length > 0) {
			setCategoriaSeleccionada(Object.keys(sistemaSolar)[0]);
		}
	}, [sistemaSolar]);

	return (
		<Container>
			{!categoriaSeleccionada ? (
				<p>No hay categorías disponibles.</p>
			) : (
				<>
					<Titulo titulo="Sistema solar" />
					<Descripcion descripcion="Explora el Sistema Solar a través de diversas categorías, donde puedes ver información sobre planetas, lunas y más. Navega fácilmente entre los elementos utilizando la barra de navegación y el carrusel interactivo." />
					<Navbar
						categorias={Object.keys(sistemaSolar)}
						categoriaSeleccionada={categoriaSeleccionada}
						setCategoriaSeleccionada={setCategoriaSeleccionada}
					/>
					<Carousel
						categoriaSeleccionada={categoriaSeleccionada}
						datos={sistemaSolar[categoriaSeleccionada]}
					/>
				</>
			)}
		</Container>
	);
};

export default SistemaSolar; // Exporta el componente SistemaSolar
