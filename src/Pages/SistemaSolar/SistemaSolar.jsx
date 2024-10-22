import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/GlobalContext';
import Navbar from './Navbar';
import Carousel from './Carousel';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Galeria/Spinner';
import Titulo from '../Galeria/Titulo';
import Descripcion from '../Galeria/Descripcion';

const Container = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 150px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;

  @media (max-width: 1024px) {
        padding: 15vh 1vw 10vh 1vw; /* Padding relativo al tamaño de la pantalla */
  }

  @media (max-width: 768px) {
    padding: 15vh 1vw 10vh 1vw; /* Padding relativo al tamaño de la pantalla */
  }
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

    @media (max-width: 768px) { // Cambia a móviles
    font-size: 4vw;
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


  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : !categoriaSeleccionada ? (
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
          <RegresarBoton onClick={handleRegresarClick}>Regresar a inicio</RegresarBoton>
        </>
      )

      }

    </Container>
  );
};

export default SistemaSolar;