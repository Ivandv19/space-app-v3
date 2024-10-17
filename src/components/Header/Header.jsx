import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import { BsRocket } from 'react-icons/bs';

const HeaderStyled = styled.header`
  width: 100%;
  height: ${({ shrink }) => (shrink ? '70px' : '100px')}; /* Cambia la altura según el estado */
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  background-color: #f8f9fa; /* Ajusta según el diseño */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Opcional, para una sombra sutil */
  position: fixed;
  top: 0;
  z-index: 10;
  transition: height 0.3s ease; /* Transición suave para el cambio de altura */
`;

const Logo = styled.h1`
  font-size: 24px; /* Tamaño del título */
  margin: 0;
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
    width: ${({ shrink }) => (shrink ? '40px' : '50px')}; /* Cambia el tamaño según el estado */
    height: ${({ shrink }) => (shrink ? '40px' : '50px')};
    transition: width 0.3s ease, height 0.3s ease; /* Transición suave para el cambio de tamaño */
  }
`;

function Header() {
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > 50); // Cambia el valor según la necesidad
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <HeaderStyled shrink={shrink}> {/* Pasa el estado a HeaderStyled */}
      <LogoContainer>
        <ImgContainer shrink={shrink}>
          <BsRocket />
        </ImgContainer>
        <Logo>Space App</Logo>
      </LogoContainer>
      <Navbar />
    </HeaderStyled>
  );
}

export default Header;