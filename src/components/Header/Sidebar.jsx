import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FaHome, FaNewspaper, FaPhotoVideo } from "react-icons/fa";

const SidebarStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px; /* Ajusta el ancho según sea necesario */
  height: 100%;
  background-color: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')}); /* Oculta o muestra la barra lateral */
  transition: transform 0.3s ease;
  z-index: 20; /* Asegúrate de que esté por encima de otros elementos */
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 10px;
`;

const MenuItems = styled.ul`
  list-style: none;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  li {
    margin: 15px 0; /* Espaciado entre elementos del menú */
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333; /* Color del texto */
  font-family: 'SourceSansProRegular', sans-serif; /* Usando la fuente personalizada */
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    color: #007bff; /* Color al pasar el cursor */
  }
`;

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
      <SidebarStyled isOpen={isOpen}>
          {/* Botón de cierre para ocultar la barra lateral, llama a toggleSidebar al hacer clic */}
          <CloseButton onClick={toggleSidebar}>
              <AiOutlineClose />
          </CloseButton>
          
          {/* Contenedor de los elementos de menú */}
          <MenuItems>
              {/* Enlaces de navegación a diferentes secciones */}
              <NavLink to="/">
                  <FaHome /> Inicio
              </NavLink>
              <NavLink to="/galería-espacial">
                  <FaPhotoVideo /> Galería
              </NavLink>
              <NavLink to="/noticias">
                  <FaNewspaper /> Noticias
              </NavLink>
              <NavLink to="/sistema-solar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                      {/* Ícono SVG personalizado para el enlace al Sistema Solar */}
                      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor">
                          <path d="M3.5 6.73A9.95 9.95 0 0 0 2 12c0 5.523 4.477 10 10 10a10 10 0 0 0 3-.458m5.353-4.042A9.95 9.95 0 0 0 22 12c0-5.523-4.477-10-10-10a10 10 0 0 0-3 .458" />
                          <circle cx="5" cy="5" r="2" />
                          <circle cx="19" cy="19" r="2" />
                          <circle cx="8" cy="15" r="2" />
                          <path d="M12 17a5 5 0 1 0-4.9-4m4.909-1H12" />
                      </g>
                  </svg> Sistema Solar
              </NavLink>
          </MenuItems>
      </SidebarStyled>
  );
};

export default Sidebar;