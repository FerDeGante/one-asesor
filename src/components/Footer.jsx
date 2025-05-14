import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram } from 'react-icons/fa';

const Footer = () => (
  <footer className="footer-custom">
    <Container>
      <Row className="align-items-center">
        <Col xs={12} md={4} className="text-center text-md-start mb-3 mb-md-0">
          <img
            src="/assets/one_logo_largo_transparent.png"
            alt="One Asesores por Ezequiel Treviño"
            height="60"
          />
        </Col>
        <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
          <small>
            Términos y Condiciones | One-Asesor &copy; {new Date().getFullYear()}
          </small>
        </Col>
        <Col xs={12} md={4} className="text-center text-md-end">
          <a
            href="https://www.instagram.com/one_asesor/"
            target="_blank"
            rel="noopener noreferrer"
            className="d-inline-flex align-items-center"
          >
            <span className="me-2">Sígueme en mi perfil</span>
            <FaInstagram size={20} />
          </a>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
