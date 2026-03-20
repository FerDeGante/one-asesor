import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const NavBarComponent = ({ scrolled }) => (
  <Navbar
    variant="light"
    className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}
  >
    <Container className="justify-content-center">
      <Navbar.Brand href="/">
        <img
          src="/assets/logo-fondo-blanco-purpura.jpeg"
          alt="One Asesores por Ezequiel Treviño"
          className="brand-logo"
        />
      </Navbar.Brand>
    </Container>
  </Navbar>
);

export default NavBarComponent;
