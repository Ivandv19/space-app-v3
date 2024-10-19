import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsRocket } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import Navbar from './Navbar';
import Sidebar from "./Sidebar"




const HeaderStyled = styled.header`
  width: 100%;
  height: ${({ shrink }) => (shrink ? '70px' : '100px')};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 1000;
  transition: height 0.3s ease;

  @media (max-width: 1024px) {
    height: ${({ shrink }) => (shrink ? '80px' : '100px')}; 
    padding: 0 15px; 
  }

  @media (max-width: 768px) {
    height: ${({ shrink }) => (shrink ? '50px' : '60px')}; 
    padding: 0 20px; 
    flex-direction: row-reverse;
   justify-content: space-between;
  }
`;

const Logo = styled.h1`
  font-size: 24px; 
  margin: 0;

  @media (max-width: 768px) { // Cambia a móviles
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
    width: ${({ shrink }) => (shrink ? '40px' : '50px')}; 
    height: ${({ shrink }) => (shrink ? '40px' : '50px')};
    transition: width 0.3s ease, height 0.3s ease; 
  }

  @media (max-width: 768px) { // Cambia a móviles
  svg {
    width: ${({ shrink }) => (shrink ? '30px' : '40px')}; 
    height: ${({ shrink }) => (shrink ? 'auto' : 'auto')};
    transition: width 0.3s ease, height 0.3s ease; 
  }
  }
`;

function Header() {
  const [shrink, setShrink] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la barra lateral
  const [isMobile, setIsMobile] = useState(false); // Estado para controlar si está en móvil

  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Cambia la medida según tus necesidades
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Llama la función para establecer el estado inicial
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Cambia el estado de la barra lateral
  };

  return (
    <HeaderStyled shrink={shrink}>
      <LogoContainer>
        <ImgContainer shrink={shrink}>
          <BsRocket />
        </ImgContainer>
        <Logo>Space App</Logo>
      </LogoContainer>
      {isMobile && <FaBars onClick={toggleSidebar} style={{ cursor: 'pointer', fontSize: '24px' }} />} {/* Botón para abrir la barra lateral solo en móvil */}

      {isMobile ? (
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      ) : (
        <Navbar/>
      )}
    </HeaderStyled>
  );
}

export default Header;