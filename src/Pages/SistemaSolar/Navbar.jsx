import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #282c34; /* Estilo principal del contenedor de navegación */
  padding: 1rem;
  width: 100%;
`;

const NavList = styled.ul`
  list-style: none; /* Elimina los puntos de la lista */
  display: flex; /* Usamos flexbox para alinear los elementos */
  justify-content: center; /* Centra los elementos horizontalmente */

  /* Media query para pantallas pequeñas (móviles) */
  @media (max-width: 768px) {
    margin: 0;
    display: flex;
    flex-direction: row; /* Alinea los items en fila en lugar de columna */
    justify-content: space-around; /* Distribuye los elementos de manera uniforme */
  }
`;

const NavItem = styled.li`
  margin: 0 15px; /* Espaciado entre los elementos */
  color: ${({ isSelected }) =>
    isSelected
      ? "#61dafb;"
      : "white"}; /* Color dinámico dependiendo de la selección */
  cursor: pointer; /* Cambio de cursor al pasar sobre el item */

  &:hover {
    text-decoration: underline; /* Subraya el texto cuando el cursor pasa por encima */
  }

  /* Media query para pantallas pequeñas (móviles) */
  @media (max-width: 768px) {
    margin: 0;
    font-size: 3vw; /* Ajusta el tamaño de fuente para móviles */
  }
`;

// Componente Navbar que recibe como props las categorías, la función para establecer la categoría seleccionada y la categoría seleccionada
const Navbar = ({
  categorias,
  setCategoriaSeleccionada,
  categoriaSeleccionada,
}) => {
  return (
    <Nav>
      {" "}
      {/* Contenedor principal de la barra de navegación */}
      <NavList>
        {" "}
        {/* Lista de elementos de navegación */}
        {categorias.map(
          (
            categoria,
            index, // Mapea las categorías para crear elementos de navegación
          ) => (
            <NavItem
              key={index} // Asigna una clave única para cada elemento
              onClick={() => setCategoriaSeleccionada(categoria)} // Establece la categoría seleccionada al hacer clic
              isSelected={categoria === categoriaSeleccionada} // Comparación para aplicar estilo al elemento seleccionado
            >
              {categoria} {/* Muestra el nombre de la categoría */}
            </NavItem>
          ),
        )}
      </NavList>
    </Nav>
  );
};

export default Navbar; // Exporta el componente Navbar
