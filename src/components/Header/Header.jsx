import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsRocket } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import Navbar from './Navbar';
import Sidebar from "./Sidebar"


const HeaderStyled = styled.header`
  width: 100%;
  height: ${({ shrink }) => (shrink ? '70px' : '100px')}; /* Ajusta la altura del header según 'shrink' */
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 1000;
  transition: height 0.3s ease; /* Transición suave en el cambio de altura */

  /* Media query para pantallas medianas */
  @media (max-width: 1024px) {
    height: ${({ shrink }) => (shrink ? '80px' : '100px')}; /* Ajusta la altura en pantallas medianas según 'shrink' */
    padding: 0 15px; /* Disminuye el padding lateral en pantallas medianas */
  }

  /* Media query para pantallas pequeñas */
  @media (max-width: 768px) {
    height: ${({ shrink }) => (shrink ? '50px' : '60px')}; /* Ajusta la altura en pantallas pequeñas según 'shrink' */
    padding: 0 20px;
    flex-direction: row-reverse; /* Invierte la dirección de los elementos */
    justify-content: space-between; /* Ajusta el espacio entre elementos */
  }
`;

const Logo = styled.h1`
  font-size: 24px; 
  margin: 0;

  /* Ajusta el tamaño de fuente en pantallas pequeñas */
  @media (max-width: 768px) { 
    font-size: 6vw;
  }
`;

const LogoContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const ImgContainer = styled.div`
  svg {
    width: ${({ shrink }) => (shrink ? '40px' : '50px')}; /* Ajusta el tamaño del ícono según 'shrink' */
    height: ${({ shrink }) => (shrink ? '40px' : '50px')};
    transition: width 0.3s ease, height 0.3s ease; /* Transición suave en el cambio de tamaño */
  }

  /* Media query para pantallas pequeñas */
  @media (max-width: 768px) { 
    svg {
      width: ${({ shrink }) => (shrink ? '30px' : '40px')}; /* Ajusta el tamaño del ícono en pantallas pequeñas */
      height: ${({ shrink }) => (shrink ? 'auto' : 'auto')}; /* Mantiene proporciones automáticas */
      transition: width 0.3s ease, height 0.3s ease;
    }
  }
`;

function Header() {
  const [shrink, setShrink] = useState(false); // Estado para cambiar el tamaño del header al hacer scroll
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad de la barra lateral
  const [isMobile, setIsMobile] = useState(false); // Estado para detectar si el dispositivo es móvil

  useEffect(() => {
    // Función para cambiar el estado `shrink` cuando el usuario hace scroll
    const handleScroll = () => {
      setShrink(window.scrollY > 50);
    };

    // Función para actualizar `isMobile` según el tamaño de la ventana
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Se considera móvil si el ancho es menor a 768px
    };

    // Agrega los listeners de scroll y resize
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    handleResize(); // Inicializa `isMobile` al cargar el componente

    // Limpia los listeners al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Alterna el estado de apertura de la barra lateral
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderStyled shrink={shrink}>
      <LogoContainer>
        <ImgContainer shrink={shrink}>
          <BsRocket /> {/* Ícono de cohete para el logo */}
        </ImgContainer>
        <Logo>Space App</Logo> {/* Nombre de la aplicación */}
      </LogoContainer>

      {/* Ícono de menú hamburguesa para abrir la barra lateral en móvil */}
      {isMobile && <FaBars onClick={toggleSidebar} style={{ cursor: 'pointer', fontSize: '24px' }} />}

      {/* Renderiza la barra lateral en móvil y la barra de navegación normal en escritorio */}
      {isMobile ? (
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      ) : (
        <Navbar />
      )}
    </HeaderStyled>
  );
}

export default Header;