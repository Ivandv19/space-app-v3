import { Icon } from "@iconify/react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transition: opacity 0.3s ease;
`;

const SidebarStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: #0d0d1a;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});
  transition: transform 0.3s ease;
  z-index: 20;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 10px;
  color: #ffffff;
`;

const MenuItems = styled.ul`
  list-style: none;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
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

const Sidebar = ({ isOpen, toggleSidebar }) => {
	return (
		<>
			<Backdrop $isOpen={isOpen} onClick={toggleSidebar} />
			<SidebarStyled $isOpen={isOpen}>
				<CloseButton onClick={toggleSidebar}>
					<AiOutlineClose />
				</CloseButton>

				<MenuItems>
					{links.map(({ to, icon, label }) => (
						<li key={to}>
							<NavLink to={to} onClick={toggleSidebar} aria-label={label}>
								<Icon icon={icon} width="18" />
								{label}
							</NavLink>
						</li>
					))}
				</MenuItems>
			</SidebarStyled>
		</>
	);
};

export default Sidebar;
