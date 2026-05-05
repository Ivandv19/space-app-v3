import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarStyled = styled.nav`
  display: flex;
  gap: 16px;
  z-index: 1;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  opacity: 0.85;
  transition: opacity 0.2s, color 0.2s;

  &:hover {
    color: #7c6af7;
    opacity: 1;
  }
`;

const links = [
	{ to: "/", icon: "lucide:home", label: "Inicio" },
	{ to: "/galería-espacial", icon: "lucide:image", label: "Galería" },
	{ to: "/noticias", icon: "lucide:newspaper", label: "Noticias" },
	{ to: "/sistema-solar", icon: "lucide:orbit", label: "Sistema Solar" },
];

function Navbar() {
	return (
		<NavbarStyled>
			{links.map(({ to, icon, label }) => (
				<NavLink key={to} to={to} aria-label={label}>
					<Icon icon={icon} width="16" />
					{label}
				</NavLink>
			))}
		</NavbarStyled>
	);
}

export default Navbar;
