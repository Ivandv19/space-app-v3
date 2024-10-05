import styled from "styled-components";
import Navbar from "./Navbar";
import { BsRocket } from "react-icons/bs";

const HeaderStyled = styled.header`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  background-color: #f8f9fa; /* Ajusta según el diseño */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Opcional, para una sombra sutil */
`;

const Logo = styled.h1`
  font-size: 24px; /* Ajusta el tamaño según sea necesario */
  margin: 0;
`;

const LogoContainer = styled.div`
width: auto;
height: auto;
display: flex;
flex-direction: row;
align-items: center;
gap: 5px;
  
`

const ImgContainer = styled.div`
 
  svg{
    width: 50px;
    height: 50px;
  }
`

function Header() {
  return (
    <HeaderStyled>
      <LogoContainer>
        <ImgContainer>
          <BsRocket />
        </ImgContainer>
        <Logo>SpaceApp</Logo>
      </LogoContainer>
      <Navbar />
    </HeaderStyled>
  );
}

export default Header;