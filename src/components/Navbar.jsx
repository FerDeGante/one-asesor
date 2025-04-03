import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const NavBarComponent = () => {
  return (
    <Navbar className="navbar-custom" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img src="/assets/one_logo_largo.jpeg" alt="One Asesor Logo" height="50" />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;
