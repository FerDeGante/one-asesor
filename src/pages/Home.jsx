// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
  Alert,
  Carousel
} from 'react-bootstrap';

const imgs = [
  'MDRT_Ezequiel.jpeg',
  'MDRT_2024_Ezequiel.jpeg',
  'MDRT_2023_Ezequiel.jpeg',
  'ezequiel_oficina_3.jpeg',
  'ezequiel_oficina_2.jpeg',
  'creciendo_juntos_2024.jpeg',
  'convencion_internacional_Roma_2024.jpeg',
  'campeones_metlife_ezequiel_esposa.jpeg',
  'campeon_metalife_2024.png'
];

// Función para dividir en grupos
const chunkImages = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

// Devuelve 1 en móvil (<576px), 3 en desktop
const getChunkSize = () => (window.innerWidth < 576 ? 1 : 3);

const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState(null);
  const [chunkSize, setChunkSize] = useState(getChunkSize());

  // Recalcular chunkSize al cambiar el ancho de la ventana
  useEffect(() => {
    const handleResize = () => setChunkSize(getChunkSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slides = chunkImages(imgs, chunkSize);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/.netlify/functions/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) setStatus('success');
      else setStatus(`error: ${data.error}`);
    } catch {
      setStatus('error: Error en el servidor.');
    }
  };

  return (
    <>
      {/* Hero */}
      <Container fluid className="section-header animate__animated animate__fadeInUp">
        <Row>
          <Col className="text-center">
            <h1 className="title">Masterclass: Libertad Financiera</h1>
            <p className="subtitle">
              Descubre estrategias comprobadas para transformar tu futuro financiero.
            </p>
            <Button variant="" className="btn-cta">
              ¡Quiero asegurar mi futuro!
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Sobre mí */}
      <Container className="section-about animate__animated animate__fadeInUp">
        <Row className="align-items-center mb-4">
          <Col md={6}>
            <h1>Sobre mí</h1>
            <p>
              ¡Hola! soy <strong>Ezequiel Treviño</strong>, pertenezco al exclusivo
              3% de los mejores agentes financieros a nivel global y fui reconocido por
              mi participación en la reunión anual del Million Dollar Round Table MDRT 2024.
              Con 8 años de experiencia protejo tu patrimonio y hago crecer tu dinero. En 2024
              fui galardonado como Campeón Nacional VIDA por MetLife. Mi pasión es ayudarte a
              alcanzar la libertad financiera que siempre has soñado.
            </p>
            <h3>
              <strong>
                Por eso te invito a mi Masterclass gratuita, donde compartiré estrategias
                comprobadas para transformar tu futuro financiero. ¡No te lo pierdas!
              </strong>
            </h3>
          </Col>
          <Col md={6} className="text-center">
            <img
              src="/assets/ezequiel_oficina.jpeg"
              alt="Ezequiel en oficina"
              className="about-main-img"
            />
          </Col>
        </Row>

        {/* Carousel estándar, 3 en desktop / 1 en móvil */}
        <Row>
          <Col>
            <Carousel interval={3000} indicators={false}>
              {slides.map((group, idx) => (
                <Carousel.Item key={idx}>
                  <Row className="g-0">
                    {group.map(img => (
                      <Col key={img} xs={12 / chunkSize} className="p-0">
                        <div className="about-thumb-container">
                          <img
                            src={`/assets/${img}`}
                            alt={img}
                            className="about-thumb-img"
                          />
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>

      {/* Formulario */}
      <Container className="section-form animate__animated animate__fadeInUp">
        <Row>
          <Col>
            <h3 className="text-center">Regístrate para la Masterclass</h3>
            <div className="form-container mx-auto">
              <Form onSubmit={handleSubmit}>
                <FloatingLabel label="Nombre Completo" className="mb-3">
                  <Form.Control
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nombre Completo"
                  />
                </FloatingLabel>
                <FloatingLabel label="Correo Electrónico" className="mb-3">
                  <Form.Control
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Correo Electrónico"
                  />
                </FloatingLabel>
                <FloatingLabel label="Teléfono" className="mb-3">
                  <Form.Control
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Teléfono"
                  />
                </FloatingLabel>
                <Button type="submit" className="btn-primary">
                  Inscribirme
                </Button>
              </Form>
              {status === 'loading' && (
                <Alert variant="info" className="mt-3">
                  Enviando...
                </Alert>
              )}
              {status === 'success' && (
                <Alert variant="success" className="mt-3">
                  ¡Inscripción exitosa!
                </Alert>
              )}
              {status?.startsWith('error') && (
                <Alert variant="danger" className="mt-3">
                  {status}
                </Alert>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
