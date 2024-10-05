import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #282c34;
  padding: 1rem;
  width: 100%;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
`;

const NavItem = styled.li`
  margin: 0 15px;
  color: ${({ isSelected }) => (isSelected ? '#61dafb;' : 'white')}; // Cambia de color si es la categoría seleccionada
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = ({ categorias, setCategoriaSeleccionada, categoriaSeleccionada }) => {
  return (
    <Nav>
      <NavList>
        {categorias.map((categoria, index) => (
          <NavItem
            key={index}
            onClick={() => setCategoriaSeleccionada(categoria)}
            isSelected={categoria === categoriaSeleccionada} // Comparación para aplicar estilo
          >
            {categoria}
          </NavItem>
        ))}
      </NavList>
    </Nav>
  );
};

export default Navbar;