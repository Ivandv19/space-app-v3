import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaHome, FaNewspaper, FaPhotoVideo } from "react-icons/fa";
import { GiSolarSystem } from "react-icons/gi";

const NavbarStyled = styled.nav`
  display: flex;
  gap: 20px;
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

function Navbar() {
  return (
    <NavbarStyled>
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
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><path d="M3.5 6.73A9.95 9.95 0 0 0 2 12c0 5.523 4.477 10 10 10a10 10 0 0 0 3-.458m5.353-4.042A9.95 9.95 0 0 0 22 12c0-5.523-4.477-10-10-10a10 10 0 0 0-3 .458" /><circle cx="5" cy="5" r="2" /><circle cx="19" cy="19" r="2" /><circle cx="8" cy="15" r="2" /><path d="M12 17a5 5 0 1 0-4.9-4m4.909-1H12" /></g></svg> Sistema Solar
      </NavLink>
    </NavbarStyled>
  );
}

export default Navbar;