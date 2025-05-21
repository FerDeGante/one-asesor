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
  Carousel,
  Card
} from 'react-bootstrap';
import {
  BsFillAwardFill,
  BsCheckCircle,
  BsPeopleFill,
  BsGlobe,
  BsWhatsapp,
  BsSpeedometer2,
  BsPersonCheck,
  BsChatDots
} from 'react-icons/bs';

/** Env vars */
const SENDGRID_FN = import.meta.env.VITE_SENDGRID_FN || '/.netlify/functions/send-email';
const MAILCHIMP_FN = import.meta.env.VITE_MAILCHIMP_FN || '/.netlify/functions/subscribe';

const whatsappNumber = '525567021628';
const defaultWhatsAppMessage =
  '¡Hola Ezequiel! Quiero agendar una cita gratuita de asesoría para mi futuro financiero.';
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  defaultWhatsAppMessage
)}`;

// Reconocimientos para el carousel
const achievements = [
  'MDRT_Ezequiel.jpeg',
  'MDRT_2024_Ezequiel.jpeg',
  'MDRT_2023_Ezequiel.jpeg',
  'creciendo_juntos_2024.jpeg',
  'convencion_internacional_Roma_2024.jpeg'
];
const chunk = (arr, n) => {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
};
const getCols = () => (window.innerWidth < 576 ? 1 : 3);

// Datos para “Sobre mí”
const aboutItems = [
  {
    Icon: BsFillAwardFill,
    title: 'Pertenezco al 3% de los mejores asesores financieros',
    text:
      'A nivel global, he ayudado a cientos de clientes a proteger y hacer crecer su patrimonio con soluciones a la medida.'
  },
  {
    Icon: () => (
      <img
        src="/assets/mdrt_logo_recolor.png"
        alt="MDRT"
        className="mdrt-logo"
      />
    ),
    title: 'Miembro de la MDRT',
    text: '“Million Dollar Round Table” desde 2023.'
  },
  {
    Icon: () => (
      <img
        src="/assets/de_la_o_logo_recolor.png"
        alt="GPO de la O"
        className="gpo-logo"
      />
    ),
    title: 'Miembro del consejo de GPO',
    text: 'Grupo de la O y Asociados, aportando al desarrollo del sector.'
  },
  {
    Icon: BsGlobe,
    title: 'Conferencista nacional e internacional',
    text: 'Participo en convenciones y congresos en México, Europa y América.'
  },
  {
    Icon: BsCheckCircle,
    title: 'Mi misión es ayudarte a construir una estrategia sólida',
    text:
      'de ahorro, inversión y protección para el cumplimiento de tus metas en el corto, mediano y largo plazo.'
  }
];

// Beneficios
const benefits = [
  {
    Icon: BsCheckCircle,
    title: 'Experiencia',
    text:
      'Pertenezco al exclusivo 3% de asesores financieros a nivel global y soy miembro de MDRT.'
  },
  {
    Icon: BsSpeedometer2,
    title: 'Rapidez',
    text: 'Procesos ágiles y eficientes.'
  },
  {
    Icon: BsPersonCheck,
    title: 'Personalizado',
    text: 'Estrategias a tu medida.'
  },
  {
    Icon: BsChatDots,
    title: 'Seguimiento',
    text: 'Soporte continuo tras tu cita.'
  }
];

// Testimonios
const mainTestimonial = {
  img: '/assets/ezequiel_clienta_quetzalli.jpeg',
  name: 'Quetzalli Pacheco',
  text:
    '“Gracias a Ezequiel comprendí mis opciones de seguro y ahora ahorro para mi futuro.”'
};
const ferTestimonial = {
  img: '/assets/testimonial_Fer_De_Gante.jpeg',
  name: 'Fer De Gante',
  text:
    '“La asesoría de Ezequiel me permitió optimizar mis inversiones y proteger a mi familia.”'
};
const otherTestimonials = [
  { icon: BsPersonCheck, name: 'Ana López', text: 'Excelente atención y seguimiento.' },
  { icon: BsPersonCheck, name: 'Luis Martínez', text: 'Me ayudó a entender mis pólizas.' },
  { icon: BsPersonCheck, name: 'María Pérez', text: 'Proceso sencillo y muy profesional.' },
  { icon: BsPersonCheck, name: 'Carlos Ruiz', text: 'Recomiendo su asesoría al 100%.' },
  { icon: BsPersonCheck, name: 'Sofía Gómez', text: 'Muy satisfecho con los resultados.' }
];

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState(null);
  const [cols, setCols] = useState(getCols());

  useEffect(() => {
    const onResize = () => setCols(getCols());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const mc = await fetch(MAILCHIMP_FN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!mc.ok) throw new Error('Mailchimp');
      const sg = await fetch(SENDGRID_FN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: formData.email,
          subject: 'Confirmación de cita con Ezequiel',
          text: `Hola ${formData.name},\n\nGracias por agendar tu cita gratuita. Nos vemos pronto.`
        })
      });
      if (!sg.ok) throw new Error('SendGrid');
      setStatus('success');
      setTimeout(() => (window.location.href = whatsappLink), 1500);
    } catch (err) {
      console.error(err);
      setStatus(
        err.message === 'Mailchimp'
          ? 'error: No se pudo suscribir. Intenta de nuevo.'
          : 'error: No se pudo enviar email.'
      );
    }
  };

  const slides = chunk(achievements, cols);

  return (
    <>
      {/* Hero */}
      <Container fluid className="section-header text-center">
        <h1 className="display-4 fw-bold mb-3 text-white">
          Protege tu patrimonio hoy
        </h1>
        <p className="lead mb-4 text-white">
          Asesoría en seguros y finanzas. Agenda tu cita gratis en un clic.
        </p>
        <Button href={whatsappLink} target="_blank" className="btn-cta btn-lg">
          📲 Agenda tu cita
        </Button>
      </Container>

      {/* SOBRE MÍ */}
      <Container className="section-about-me">
        <Row className="align-items-center">
          <Col xs={12} md={6}>
            <h2 className="greeting mb-4">
              Hola soy <strong>Ezequiel Treviño Buenrostro</strong><br/>
              asesor financiero y de seguros
            </h2>
            <div className="about-grid">
              {aboutItems.map((item, i) => {
                const IconComponent = item.Icon;
                return (
                  <div className="about-grid-item" key={i}>
                    <div className="icon-circle">
                      <IconComponent size={32} color="#4f153d" />
                    </div>
                    <div className="about-text">
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <h2 className="about-cta">
              ¿Te gustaría agendar una cita gratuita conmigo para empezar a construir tu futuro financiero?
            </h2>
            <Button href={whatsappLink} target="_blank" className="btn-cta btn-lg mt-2">
              📲 Agendar cita
            </Button>
          </Col>
          <Col xs={12} md={6} className="text-center">
            <img
              src="/assets/ezequiel_oficina.jpeg"
              alt="Ezequiel en oficina"
              className="about-img-rect"
            />
          </Col>
        </Row>
      </Container>

      {/* Beneficios */}
      <Container className="section-benefits text-center">
        <h2 className="mb-5">Beneficios</h2>
        <Row className="gx-4 gy-4 justify-content-center">
          {benefits.map((item, i) => {
            const IconComp = item.Icon;
            return (
              <Col key={i} xs={12} md={3} className="d-flex">
                <Card className="benefit-card p-4">
                  <IconComp className="benefit-icon mb-3" />
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.text}</Card.Text>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* Reconocimientos */}
      <Container className="section-about py-5 text-center">
        <h2 className="mb-4">Reconocimientos</h2>
        <Carousel interval={4000} indicators={false} className="shadow-sm">
          {slides.map((group, idx) => (
            <Carousel.Item key={idx}>
              <Row className="gx-3">
                {group.map(img => (
                  <Col key={img} xs={12 / cols} className="p-2">
                    <img
                      src={`/assets/${img}`}
                      alt={img}
                      className="img-fluid rounded-3"
                    />
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      {/* Testimonios */}
      <Container className="section-testimonials text-center">
        <h2 className="mb-5">Testimonios</h2>

        {/* Principales */}
        <Row className="justify-content-center mb-4">
          {[mainTestimonial, ferTestimonial].map((t, i) => (
            <Col key={i} xs={12} md={6}>
              <Card className="testimonial-card p-4 mb-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="testimonial-img-large mx-auto"
                />
                <blockquote className="blockquote my-3">
                  {t.text}
                </blockquote>
                <footer className="blockquote-footer">{t.name}</footer>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Secundarios */}
        <Row className="gx-4 gy-4 justify-content-center">
          {otherTestimonials.map(({ icon, name, text }, i) => {
            const IconTest = icon;
            return (
              <Col key={i} xs={12} md={4} lg={3}>
                <Card className="testimonial-card p-3">
                  <IconTest className="testimonial-icon mb-2" />
                  <Card.Text>"{text}"</Card.Text>
                  <Card.Subtitle className="mt-2 text-muted">— {name}</Card.Subtitle>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* Formulario */}
      <Container className="section-form text-center">
        <h2 className="mb-5">Agenda tu cita</h2>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Form onSubmit={handleSubmit} className="form-card p-4">
              <FloatingLabel label="Nombre Completo" className="mb-3">
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre Completo"
                  required
                />
              </FloatingLabel>
              <FloatingLabel label="Correo Electrónico" className="mb-3">
                <Form.Control
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Correo Electrónico"
                  required
                />
              </FloatingLabel>
              <FloatingLabel label="Teléfono" className="mb-3">
                <Form.Control
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Teléfono"
                  required
                />
              </FloatingLabel>
              <Button type="submit" className="btn-cta btn-lg w-100 mb-3">
                Enviar y agendar
              </Button>
              {status === 'loading' && <Alert variant="info">Enviando...</Alert>}
              {status === 'success' && (
                <Alert variant="success">
                  ¡Registro exitoso! Serás redirigido a WhatsApp.
                </Alert>
              )}
              {status?.startsWith('error') && (
                <Alert variant="danger">{status.replace('error: ', '')}</Alert>
              )}
            </Form>
          </Col>
        </Row>
      </Container>

      {/* WhatsApp flotante */}
      <Button
        as="a"
        href={whatsappLink}
        target="_blank"
        className="floating-whatsapp"
        aria-label="Chat por WhatsApp"
      >
        <BsWhatsapp size={32} color="#fff" />
      </Button>
    </>
  );
}
