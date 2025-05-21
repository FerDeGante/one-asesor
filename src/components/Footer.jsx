// src/components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

const Footer = () => (
  <footer className="footer-custom">
    <Container>
      <Row className="align-items-center">
        {/* Logo */}
        <Col xs={12} md={4} className="text-center text-md-start mb-3 mb-md-0">
          <img
            src="/assets/one_logo_largo_transparent.png"
            alt="One Asesores por Ezequiel Treviño"
            height="60"
          />
        </Col>

        {/* Términos y año */}
        <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
          <small>
            Términos y Condiciones | One-Asesor &copy; {new Date().getFullYear()}
          </small>
        </Col>

        {/* Redes sociales: Instagram + TikTok */}
        <Col xs={12} md={4} className="text-center text-md-end">
          <span className="me-2">Sígueme en mis redes sociales</span>
          <a
            href="https://www.instagram.com/one_asesor/"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://www.tiktok.com/@one_asesor"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1"
            aria-label="TikTok"
          >
            <SiTiktok size={20} />
          </a>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
