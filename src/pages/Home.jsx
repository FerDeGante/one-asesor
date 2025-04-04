import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, FloatingLabel, Alert } from 'react-bootstrap';

const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState(null);

  // Maneja los cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus(`error: ${data.error}`);
      }
    } catch (err) {
      setStatus('error: Error en el servidor.');
    }
  };

  return (
    <div className="landing-page">
      <Container>
        {/* Sección de Encabezado con CTA */}
        <Row className="py-5 section-header animate__animated animate__fadeInUp">
          <Col>
            <h1 className="title">Masterclass: Libertad Financiera 🔒</h1>
            <p className="subtitle">
              Descubre estrategias comprobadas para transformar tu futuro financiero. 💼✨
            </p>
            <Button variant="light" size="lg" className="mt-3 btn-cta">
              ¡Quiero asegurar mi futuro! 🔒
            </Button>
          </Col>
        </Row>

        {/* Sección About Me */}
        <Row className="py-5 section-about animate__animated animate__fadeInUp">
          <Col md={{ span: 8, offset: 2 }} className="text-center">
            <h2>Sobre mí</h2>
            <p>
              ¡Hola! soy Ezequiel Treviño, pertenezco al exclusivo 3% de los mejores agentes financieros a nivel global y fui reconocido por mi participación en la reunión anual 2024 del Million Dollar Round Table. <strong>Soy asesor financiero y de seguros</strong>, con 8 años de experiencia, lo que garantiza que protegeré tu patrimonio y haré crecer tu dinero. En 2024 fui galardonado como Campeón Nacional VIDA por Metlife, por ello soy experto en finanzas, interés compuesto y gestión de riesgos. Mi pasión es ayudarte a alcanzar la libertad financiera que siempre has soñado. 😊
            </p>
          </Col>
        </Row>

        {/* Galería de Imágenes en "Sobre Mí" */}
        <Row className="py-3 section-images animate__animated animate__fadeInUp">
          <Col xs={6} md={4} className="mb-3">
            <img src="/assets/campeon_metalife_2024.png" alt="Campeón MetLife 2024" className="img-fluid about-img" />
          </Col>
          <Col xs={6} md={4} className="mb-3">
            <img src="/assets/campeon_vida_2024.png" alt="Campeón VIDA 2024" className="img-fluid about-img" />
          </Col>
          <Col xs={6} md={4} className="mb-3">
            <img src="/assets/MDRT_hola.png" alt="MDRT Hola" className="img-fluid about-img" />
          </Col>
          <Col xs={6} md={4} className="mb-3">
            <img src="/assets/dudas_contactame.png" alt="¿Dudas? Contáctame" className="img-fluid about-img" />
          </Col>
          
        </Row>

        {/* Sección de Captura de Leads (Formulario con llamada a la función serverless) */}
        <Row className="py-5 section-form animate__animated animate__fadeInUp">
          <Col md={{ span: 6, offset: 3 }}>
            <h3 className="text-center mb-4">Regístrate para la Masterclass</h3>
            <div className="form-container p-4">
              <Form onSubmit={handleSubmit}>
                <FloatingLabel controlId="floatingName" label="Nombre Completo" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu nombre"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="floatingEmail" label="Correo Electrónico" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Ingresa tu correo"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPhone" label="Teléfono" className="mb-3">
                  <Form.Control
                    type="phone"
                    placeholder="Ingresa tu teléfono"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <Button variant="primary" type="submit" className="w-100">
                  Inscribirme 🚀
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
              {status && status.startsWith('error') && (
                <Alert variant="danger" className="mt-3">
                  {status}
                </Alert>
              )}
            </div>
          </Col>
        </Row>

        {/* Sección de Agradecimiento */}
        <Row className="py-5 section-thanks animate__animated animate__fadeInUp">
          <Col className="text-center">
            <h4>¡Gracias por visitar nuestro sitio! 🙏</h4>
            <p>Estoy comprometido en ayudarte a transformar tu vida financiera. ¡Nos vemos en la masterclass! 🚀</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
