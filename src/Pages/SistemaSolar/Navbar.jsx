import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  width: 100%;
  margin-bottom: 20px;
  overflow-x: auto;
  
  /* scrollbar sutil */
  &::-webkit-scrollbar { height: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #d0d0d0; border-radius: 10px; }
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 0 10px;
  margin: 0;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const NavItem = styled.button`
  background: ${({ $isSelected }) => ($isSelected ? "#1a1a2e" : "#f0f0f5")};
  color: ${({ $isSelected }) => ($isSelected ? "white" : "#555")};
  border: none;
  border-radius: 24px;
  padding: 10px 24px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: capitalize;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $isSelected }) => ($isSelected ? "#1a1a2e" : "#e0e0e8")};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 18px;
  }
`;

const Navbar = ({
	categorias,
	setCategoriaSeleccionada,
	categoriaSeleccionada,
}) => {
	return (
		<Nav>
			<NavList>
				{categorias.map((categoria, index) => (
					<NavItem
						key={index}
						onClick={() => setCategoriaSeleccionada(categoria)}
						$isSelected={categoria === categoriaSeleccionada}
					>
						{categoria}
					</NavItem>
				))}
			</NavList>
		</Nav>
	);
};

export default Navbar;
