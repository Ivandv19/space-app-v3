import { useEffect, useState } from "react";
import { BsRocket } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const HeaderStyled = styled.header`
  width: 100%;
  height: ${({ $shrink }) => ($shrink ? "55px" : "70px")};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  background-color: ${({ $shrink, $isHome }) =>
		$shrink || !$isHome ? "#0d0d1a" : "rgba(13, 13, 26, 0.65)"};
  backdrop-filter: ${({ $shrink, $isHome }) =>
		$shrink || !$isHome ? "none" : "blur(12px)"};
  -webkit-backdrop-filter: ${({ $shrink, $isHome }) =>
		$shrink || !$isHome ? "none" : "blur(12px)"};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 1000;
  transition: height 0.3s ease, background-color 0.3s ease;

  @media (max-width: 1024px) {
    height: ${({ $shrink }) => ($shrink ? "60px" : "80px")};
  }

  @media (max-width: 768px) {
    height: ${({ $shrink }) => ($shrink ? "40px" : "50px")};
    padding: 0 16px;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: row-reverse;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Logo = styled.h1`
  font-size: 20px;
  margin: 0;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 5vw;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: ${({ $shrink }) => ($shrink ? "28px" : "32px")};
    height: ${({ $shrink }) => ($shrink ? "28px" : "32px")};
    color: #7c6af7;
    transition: width 0.3s ease, height 0.3s ease;
  }

  @media (max-width: 768px) {
    svg {
      width: ${({ $shrink }) => ($shrink ? "24px" : "28px")};
      height: ${({ $shrink }) => ($shrink ? "24px" : "28px")};
    }
  }
`;

function Header() {
	const [shrink, setShrink] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const location = useLocation();
	const isHome = location.pathname === "/";

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
		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleResize);

		handleResize(); // Inicializa `isMobile` al cargar el componente

		// Limpia los listeners al desmontar el componente
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// Alterna el estado de apertura de la barra lateral
	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<HeaderStyled $shrink={shrink} $isHome={isHome}>
			<InnerContainer>
				<LogoContainer>
					<ImgContainer $shrink={shrink}>
						<BsRocket />
					</ImgContainer>
					<Logo>Space App</Logo>
				</LogoContainer>

				{isMobile && (
					<FaBars
						onClick={toggleSidebar}
						style={{ cursor: "pointer", fontSize: "24px", color: "#ffffff" }}
					/>
				)}

				{isMobile ? (
					<Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
				) : (
					<Navbar />
				)}
			</InnerContainer>
		</HeaderStyled>
	);
}

export default Header;
