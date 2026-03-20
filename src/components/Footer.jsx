// src/components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

const Footer = () => (
  <footer className="footer-custom">
    <Container>
      <Row className="align-items-center">
        <Col xs={12} md={4} className="text-center text-md-start mb-3 mb-md-0">
          <img
            src="/assets/logo-fondo-blanco-purpura.jpeg"
            alt="One Asesores por Ezequiel Treviño"
            className="footer-logo"
          />
        </Col>
        <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
          <small>
            One-Asesores &copy; {new Date().getFullYear()}
          </small>
        </Col>
        <Col xs={12} md={4} className="text-center text-md-end">
          <span className="me-2">Sígueme en mis redes sociales</span>
          <a
            href="https://www.instagram.com/one_asesor/"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1"
            aria-label="Instagram"
          >
            <FaInstagram size={22} />
          </a>
          <a
            href="https://www.tiktok.com/@one_asesor"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1"
            aria-label="TikTok"
          >
            <SiTiktok size={22} />
          </a>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
