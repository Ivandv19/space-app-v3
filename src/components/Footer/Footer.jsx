// Footer.jsx
import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #282c34;
  color: #fff;
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  @media (max-width: 1024px) {

}

@media (max-width: 768px) {
  p{
    font-size: 14px;
  }
}
`;

const FooterLink = styled.a`
  color: #61dafb;
  margin: 0 0.5rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialIcons = styled.div`
  margin: 1rem 0;
`;

const IconLink = styled.a`
  color: #61dafb;
  margin: 0 0.5rem;
  font-size: 1.5rem;

  &:hover {
    color: #21a1f1;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2024 Space App. <br /> Todos los derechos reservados.</p>
      <p>
        <FooterLink href="/">Inicio</FooterLink> |
        <FooterLink href="/noticias">Noticias</FooterLink> |
        <FooterLink href="/galería-espacial">Galería</FooterLink> |
        <FooterLink href="/sistema-solar">Sistema Solar</FooterLink>
      </p>
      <SocialIcons>
        <IconLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </IconLink>
        <IconLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </IconLink>
        <IconLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </IconLink>
        <IconLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn />
        </IconLink>
      </SocialIcons>
    </FooterContainer>
  );
};

export default Footer;