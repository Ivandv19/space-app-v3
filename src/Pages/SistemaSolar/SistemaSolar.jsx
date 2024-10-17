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
  margin-bottom: 20px;
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

const Spinner = styled.div`
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const SistemaSolar = () => {
  const navigate = useNavigate();
  const handleRegresarClick = () => {
    navigate('/'); 
  };

  const { sistemaSolar } = useGlobalContext();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null); // Inicializa con null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sistemaSolar && Object.keys(sistemaSolar).length > 0) {
      // Verifica si el sistemaSolar tiene datos antes de establecer la categoría
      setCategoriaSeleccionada(Object.keys(sistemaSolar)[0]);
    }
  }, [sistemaSolar]); // Este useEffect se ejecuta cuando sistemaSolar cambia

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  if (!categoriaSeleccionada) {
    return (
      <Container>
        <p>No hay categorías disponibles.</p>
      </Container>
    );
  }

  return (
    <Container>
      <PageTitle>Sistema solar</PageTitle>
      <PageDescription>
        Explora el <strong>Sistema Solar</strong> a través de diversas categorías, donde puedes ver información sobre planetas, lunas y más. Navega fácilmente entre los elementos utilizando la barra de navegación y el carrusel interactivo.
      </PageDescription>
      <Description></Description>
      <Navbar
        categorias={Object.keys(sistemaSolar)}
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
      />
      <Carousel
        categoriaSeleccionada={categoriaSeleccionada}
        datos={sistemaSolar[categoriaSeleccionada]}
      />
      <RegresarBoton onClick={handleRegresarClick}>Regresar a inicio</RegresarBoton>
    </Container>
  );
};

export default SistemaSolar;