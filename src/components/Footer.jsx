import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-custom py-3">
      <Container>
        <Row className="align-items-center">
          {/* Columna Izquierda: Logo */}
          <Col xs={12} md={4} className="text-center text-md-start">
            <a href="https://www.instagram.com/one_asesor/" target="_blank" rel="noopener noreferrer">
              <img src="/assets/one_logo_largo.jpeg" alt="One Asesor Logo" height="50" />
            </a>
          </Col>
          {/* Columna Central: Texto */}
          <Col xs={12} md={4} className="text-center">
            <p className="mb-0">
              Términos y Condiciones | One-Asesor - Todos los derechos reservados
            </p>
          </Col>
          {/* Columna Derecha: CTA para Instagram */}
          <Col xs={12} md={4} className="text-center text-md-end">
            <a
              href="https://www.instagram.com/one_asesor/"
              target="_blank"
              rel="noopener noreferrer"
              className="d-inline-flex align-items-center"
            >
              <span className="me-2">Sígueme en mi perfil</span>
              <FaInstagram size={24} color="white" />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
