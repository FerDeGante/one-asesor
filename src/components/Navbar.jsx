import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const NavBarComponent = ({ scrolled }) => (
  <Navbar
    variant="dark"
    className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}
  >
    <Container className="justify-content-center">
      <Navbar.Brand href="/">
        <img
          src="/assets/one_logo.png"
          alt="One Asesores por Ezequiel Treviño"
          height="150"
        />
      </Navbar.Brand>
    </Container>
  </Navbar>
);

export default NavBarComponent;
