import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/GlobalContext';
import Navbar from './Navbar';
import Carousel from './Carousel';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 150px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 20px; /* Espacio debajo de la descripción */
`;

const PageTitle = styled.h2`
    font-size: 2.5rem;
    color: #333;
    text-align: center;
    
`;

const PageDescription = styled.p`
    font-size: 1.2rem;
    color: #666;
    text-align: center;
    max-width: 800px;
`;

const RegresarBoton = styled.button`
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const SistemaSolar = () => {

  const navigate = useNavigate();
  const handleRegresarClick = () => {
    navigate('/'); // Cambia '/noticias' a la ruta correcta para regresar a la lista de noticias
  };

  const { sistemaSolar } = useGlobalContext();
  // Estado para la categoría seleccionada, inicializado con el primer valor
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(Object.keys(sistemaSolar)[0]);

  useEffect(() => {
    console.log(`Categoría seleccionada: ${categoriaSeleccionada}`);
  }, [categoriaSeleccionada]);

  return (
    <Container>

      <PageTitle>Sistema solar</PageTitle>
      <PageDescription> Explora el <strong>Sistema Solar</strong> a través de diversas categorías, donde puedes ver información sobre planetas, lunas y más. Navega fácilmente entre los elementos utilizando la barra de navegación y el carrusel interactivo.</PageDescription>
      <Description>
      </Description>
      <Navbar
        categorias={Object.keys(sistemaSolar)} // Pasa las claves del sistemaSolar como categorías
        categoriaSeleccionada={categoriaSeleccionada} // Pasa la categoría seleccionada para el estilo
        setCategoriaSeleccionada={setCategoriaSeleccionada} // Pasa la función para actualizar la categoría seleccionada
      />
      <Carousel
        categoriaSeleccionada={categoriaSeleccionada} // Pasa la categoría seleccionada al Carousel
        datos={sistemaSolar[categoriaSeleccionada]} // Accede a los datos de la categoría seleccionada
      />
      <RegresarBoton onClick={handleRegresarClick}>Regresar a inicio</RegresarBoton>
    </Container>
  );
};

export default SistemaSolar;