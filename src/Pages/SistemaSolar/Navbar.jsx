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

  @media (max-width: 768px) { // Cambia a móviles
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    }
`;

const NavItem = styled.li`
  margin: 0 15px;
  color: ${({ isSelected }) => (isSelected ? '#61dafb;' : 'white')}; // Cambia de color si es la categoría seleccionada
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) { // Cambia a móviles
    margin: 0;
    font-size: 3vw;
  
    }
`;

// Componente Navbar que recibe como props las categorías, la función para establecer la categoría seleccionada y la categoría seleccionada
const Navbar = ({ categorias, setCategoriaSeleccionada, categoriaSeleccionada }) => {
  return (
    <Nav> {/* Contenedor principal de la barra de navegación */}
      <NavList> {/* Lista de elementos de navegación */}
        {categorias.map((categoria, index) => ( // Mapea las categorías para crear elementos de navegación
          <NavItem
            key={index} // Asigna una clave única para cada elemento
            onClick={() => setCategoriaSeleccionada(categoria)} // Establece la categoría seleccionada al hacer clic
            isSelected={categoria === categoriaSeleccionada} // Comparación para aplicar estilo al elemento seleccionado
          >
            {categoria} {/* Muestra el nombre de la categoría */}
          </NavItem>
        ))}
      </NavList>
    </Nav>
  );
};

export default Navbar; // Exporta el componente Navbar