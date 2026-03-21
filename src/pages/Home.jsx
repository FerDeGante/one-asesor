import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
  Alert,
  Card
} from 'react-bootstrap';
import {
  BsFillAwardFill,
  BsCheck2Circle,
  BsGlobe,
  BsPauseFill,
  BsPlayFill,
  BsWhatsapp,
  BsPiggyBank,
  BsPersonCheck,
  BsChatDots,
  BsChevronLeft,
  BsChevronRight,
  BsShieldCheck
} from 'react-icons/bs';

const SENDGRID_FN = import.meta.env.VITE_SENDGRID_FN || '/.netlify/functions/send-email';
const MAILCHIMP_FN = import.meta.env.VITE_MAILCHIMP_FN || '/.netlify/functions/subscribe';

const whatsappNumber = '525567021628';
const defaultWhatsAppMessage =
  '¡Hola Ezequiel! Quiero agendar una cita gratuita de asesoría para mi futuro financiero.';
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  defaultWhatsAppMessage
)}`;

const achievements = [
  {
    src: 'MDRT_Ezequiel.jpeg',
    alt: 'Reconocimiento MDRT de Ezequiel',
    variant: 'wide'
  },
  {
    src: 'MDRT_2024_Ezequiel.jpeg',
    alt: 'Participacion de Ezequiel en MDRT 2024',
    variant: 'tall'
  },
  {
    src: 'MDRT_2023_Ezequiel.jpeg',
    alt: 'Participacion de Ezequiel en MDRT 2023',
    variant: 'wide'
  },
  {
    src: 'creciendo_juntos_2024.jpeg',
    alt: 'Evento Creciendo Juntos 2024',
    variant: 'medium'
  },
  {
    src: 'convencion_internacional_Roma_2024.jpeg',
    alt: 'Convencion Internacional Roma 2024',
    variant: 'small'
  },
  {
    src: 'promotor-one-asesores.jpeg',
    alt: 'Otorgamiento de reconocimiento de promotor One Asesores',
    variant: 'medium'
  }
];

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
        src="/assets/669-6694770_mdrt-logo-million-dollar-round-table-hd-png.png"
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
        src="/assets/de_la_o_y_asociados_logo.jpeg"
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
    Icon: BsCheck2Circle,
    title: 'Mi misión es ayudarte a construir una estrategia sólida',
    text:
      'de ahorro, inversión y protección para el cumplimiento de tus metas en el corto, mediano y largo plazo.'
  }
];

const benefits = [
  {
    Icon: BsShieldCheck,
    title: 'Experiencia',
    text:
      'Pertenezco al exclusivo 3% de asesores financieros a nivel global y soy miembro de MDRT.'
  },
  {
    Icon: BsPiggyBank,
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

const featuredTestimonials = [
  {
    img: '/assets/ezequiel_clienta_quetzalli.jpeg',
    name: 'Quetzalli Pacheco',
    text:
      '“Yo llegué con muchas dudas y Ezequiel me explicó todo con muchísima paciencia. Me ayudó a tomar una decisión que sí iba con mi realidad y eso me dio tranquilidad.”'
  },
  {
    img: '/assets/fernando.jpeg',
    name: 'Fernando De Gante',
    text:
      '“Lo que más me gustó fue que primero entendió lo que yo necesitaba y después me propuso opciones claras. Todo el proceso se sintió profesional y muy humano.”'
  }
];

const secondaryTestimonials = [
  {
    img: '/assets/Valeria-castro.jpeg',
    name: 'Valeria Castro',
    text:
      '“Me sentí muy acompañada desde la primera llamada. Ezequiel aterriza las cosas a tu situación y te ayuda a decidir sin presionarte.”'
  },
  {
    img: '/assets/Marco-pardo.jpeg',
    name: 'Marco Pardo',
    text:
      '“Se nota la experiencia. Me explicó cada opción de forma sencilla y eso me ayudó a contratar con confianza, entendiendo realmente lo que estaba haciendo.”'
  },
  {
    img: '/assets/Andre-tapia.jpeg',
    name: 'Andre Tapia',
    text:
      '“Yo veía estos temas como algo complicado, pero con Ezequiel todo fue mucho más claro. Me ayudó a ordenar prioridades y a pensar mejor en el futuro.”'
  }
];

const allTestimonials = [...featuredTestimonials, ...secondaryTestimonials];
const TESTIMONIAL_INTERVAL_MS = 7200;

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isTestimonialsPlaying, setIsTestimonialsPlaying] = useState(true);
  const recognitionTrackRef = useRef(null);
  const [canScrollRecognitionsPrev, setCanScrollRecognitionsPrev] = useState(false);
  const [canScrollRecognitionsNext, setCanScrollRecognitionsNext] = useState(true);

  useEffect(() => {
    if (!isTestimonialsPlaying) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveTestimonial(current => (current + 1) % allTestimonials.length);
    }, TESTIMONIAL_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [activeTestimonial, isTestimonialsPlaying]);

  useEffect(() => {
    const track = recognitionTrackRef.current;
    if (!track) return undefined;

    const updateScrollState = () => {
      const maxScrollLeft = track.scrollWidth - track.clientWidth;
      setCanScrollRecognitionsPrev(track.scrollLeft > 8);
      setCanScrollRecognitionsNext(track.scrollLeft < maxScrollLeft - 8);
    };

    updateScrollState();
    track.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      track.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const scrollRecognitions = direction => {
    const track = recognitionTrackRef.current;
    if (!track) return;

    const amount = Math.min(track.clientWidth * 0.82, 520);
    track.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth'
    });
  };

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

  const currentTestimonial = allTestimonials[activeTestimonial];

  return (
    <>
      <main>
        <Container fluid className="section-header text-center">
          <h1 className="display-4 fw-bold mb-3">
            Protege tu patrimonio hoy
          </h1>
          <p className="lead mb-4">
            Asesoría en seguros y finanzas. Agenda tu cita gratis en un clic.
          </p>
          <Button href={whatsappLink} target="_blank" className="btn-cta btn-lg">
            📲 Agenda cita
          </Button>
        </Container>

        <Container className="section-about-me">
          <Row className="align-items-center">
            <Col xs={12} md={6}>
              <h2 className="greeting mb-4">
                Hola soy <strong>Ezequiel Treviño Buenrostro</strong>
                <br />
                asesor financiero y de seguros
              </h2>
              <div className="about-grid">
                {aboutItems.map((item, i) => {
                  const IconComponent = item.Icon;
                  return (
                    <div className="about-grid-item" key={i}>
                      <div className="icon-circle">
                        <IconComponent size={32} color="currentColor" />
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
                📲 Agenda cita
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

        <Container className="section-about py-5 text-center">
          <h2 className="mb-4">Reconocimientos</h2>
          <div className="recognition-carousel-shell">
            <div className="recognition-carousel-track" ref={recognitionTrackRef}>
              {achievements.map(item => (
                <article
                  key={item.src}
                  className={`recognition-card recognition-card--${item.variant}`}
                >
                  <img
                    src={`/assets/${item.src}`}
                    alt={item.alt}
                    className="recognition-photo"
                  />
                </article>
              ))}
            </div>

            <div className="recognition-carousel-controls" aria-label="Controles de reconocimientos">
              <button
                type="button"
                className="recognition-carousel-button"
                onClick={() => scrollRecognitions('prev')}
                disabled={!canScrollRecognitionsPrev}
                aria-label="Ver reconocimientos anteriores"
              >
                <BsChevronLeft />
              </button>

              <button
                type="button"
                className="recognition-carousel-button"
                onClick={() => scrollRecognitions('next')}
                disabled={!canScrollRecognitionsNext}
                aria-label="Ver más reconocimientos"
              >
                <BsChevronRight />
              </button>
            </div>
          </div>
        </Container>

        <Container className="section-testimonials text-center">
          <h2 className="mb-5">Testimonios</h2>
          <div
            className="testimonial-slider-shell"
            style={{ '--testimonial-progress-duration': `${TESTIMONIAL_INTERVAL_MS}ms` }}
          >
            <div className="testimonial-slide-card">
              <Row className="align-items-center g-4 g-lg-5">
                <Col xs={12} lg={5} className="text-center">
                  <img
                    src={currentTestimonial.img}
                    alt={currentTestimonial.name}
                    className="testimonial-slide-image"
                  />
                </Col>
                <Col xs={12} lg={7}>
                  <div className="testimonial-slide-content">
                    <blockquote className="testimonial-slide-quote">
                      {currentTestimonial.text}
                    </blockquote>
                    <footer className="testimonial-slide-author">
                      {currentTestimonial.name}
                    </footer>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="testimonial-slider-controls" aria-label="Controles de testimonios">
              <div className="testimonial-slider-dots" role="tablist" aria-label="Seleccionar testimonio">
                {allTestimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    className={`testimonial-dot ${index === activeTestimonial ? 'active' : ''} ${
                      index === activeTestimonial && isTestimonialsPlaying ? 'playing' : ''
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                    aria-label={`Ver testimonio de ${testimonial.name}`}
                    aria-selected={index === activeTestimonial}
                    role="tab"
                  >
                    <span className="testimonial-dot-fill" />
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="testimonial-play-toggle"
                onClick={() => setIsTestimonialsPlaying(current => !current)}
                aria-label={isTestimonialsPlaying ? 'Pausar carrusel de testimonios' : 'Reproducir carrusel de testimonios'}
              >
                {isTestimonialsPlaying ? <BsPauseFill /> : <BsPlayFill />}
              </button>
            </div>
          </div>
        </Container>

        <Container className="section-form text-center">
          <h2 className="mb-5">Únete al equipo</h2>
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
      </main>

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
