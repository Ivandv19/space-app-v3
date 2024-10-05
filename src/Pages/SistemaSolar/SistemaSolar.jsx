import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/GlobalContext';
import Navbar from './Navbar';
import Carousel from './Carousel';

const Container = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 50px; /* Espacio alrededor del contenedor */
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

const SistemaSolar = () => {
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
    </Container>
  );
};

export default SistemaSolar;