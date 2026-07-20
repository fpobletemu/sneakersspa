import { useEffect, useMemo, useState } from 'react'
import beforeAfterHero from '../img/before-after-hero.webp'
import beforeAfterPair from '../img/before-after-pair.webp'
import logoTagline from '../img/logo-tagline.webp'
import logoWordmark from '../img/logo-wordmark.webp'
import './App.css'
import { initAnalytics, trackEvent, trackPageView } from './lib/analytics'

const services = [
  {
    id: 'limpieza-estandar',
    name: 'Limpieza estándar',
    price: '$9.990',
    description:
      'Limpieza exterior rápida para capellada, entresuela y cordones en uso diario.',
    bestFor: 'Ideal para polvo, suciedad leve y mantenimiento regular.',
    badge: 'Entrada',
  },
  {
    id: 'limpieza-profunda',
    name: 'Limpieza profunda',
    price: '$12.990',
    description:
      'Sanitización integral por dentro y por fuera, con foco en suela, interior y olores.',
    bestFor: 'Para uso prolongado, manchas acumuladas y suciedad incrustada.',
    badge: 'Más pedido',
  },
  {
    id: 'gamuza-nobuck-estandar',
    name: 'Gamuza y nobuck estándar',
    price: '$14.990',
    description:
      'Tratamiento en seco para preservar textura, color y acabado delicado.',
    bestFor: 'Recomendado para mantener la gamuza limpia, peinada y uniforme.',
    badge: 'Material delicado',
  },
  {
    id: 'gamuza-profunda',
    name: 'Gamuza profunda',
    price: '$17.990',
    description:
      'Shampoo especializado y protector impermeabilizante antimanchas.',
    bestFor: 'Cuando la gamuza necesita rescate y protección adicional.',
    badge: 'Premium',
  },
  {
    id: 'unyellowing',
    name: 'Servicio unyellowing',
    price: '$15.990',
    description:
      'Proceso químico y térmico para revertir la oxidación en suelas amarillentas.',
    bestFor: 'Pensado para devolver un tono limpio a gomas envejecidas.',
    badge: 'Restauración',
  },
] as const

const addOns = [
  'Restauración y coloración de cuero desde $5.990.',
  'Cambio o lavado premium de cordones entre $2.990 y $4.990.',
  'Desinfección y eliminación extrema de olores con tratamiento germicida.',
  'Reparación estructural ligera para despegues puntuales y bordes.',
] as const

const processSteps = [
  {
    title: 'Agenda',
    description:
      'Cuéntanos por WhatsApp el tipo de zapatilla, el servicio que te interesa y la comuna.',
  },
  {
    title: 'Coordinamos retiro',
    description:
      'Definimos punto de encuentro en Metro o entrega en sucursal según tu ubicación.',
  },
  {
    title: 'Tratamos tu par',
    description:
      'Aplicamos limpieza, sanitización o restauración según el material y el estado real.',
  },
  {
    title: 'Entregamos listo',
    description:
      'Tiempo estimado de 3 a 5 días hábiles, sujeto al nivel de suciedad o daño.',
  },
] as const

const showcaseCases = [
  {
    id: 'hero-case',
    title: 'Caso de limpieza profunda',
    image: beforeAfterHero,
    label: 'Antes y después',
    description:
      'Un caso ideal para mostrar la diferencia entre suciedad extrema y recuperación visual.',
  },
  {
    id: 'pair-case',
    title: 'Recuperación de uso diario',
    image: beforeAfterPair,
    label: 'Resultado real',
    description:
      'Comparativa pensada para demostrar blancos más limpios, cordones prolijos y mejor presencia.',
  },
] as const

const faqs = [
  {
    id: 'faq-entrega',
    question: '¿Cuánto tiempo se demoran en entregar mis zapatillas?',
    answer:
      'El tiempo estimado es de 3 a 5 días hábiles, dependiendo del tratamiento y del nivel de suciedad o daño.',
  },
  {
    id: 'faq-pagos',
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Actualmente trabajamos con transferencias bancarias directas.',
  },
  {
    id: 'faq-retiro',
    question: '¿Cómo funciona el retiro y la entrega?',
    answer:
      'Coordinamos puntos de encuentro desde Hospital Sotero del Río hasta Mirador por $2.000, y retiro gratuito en La Florida o Puente Alto, previa coordinación.',
  },
  {
    id: 'faq-materiales',
    question: '¿Trabajan cuero, gamuza y nobuck?',
    answer:
      'Sí. Cada material requiere un tratamiento distinto, por eso evaluamos el par antes de definir el proceso adecuado.',
  },
] as const

const trustPoints = [
  'Atención por WhatsApp con respuesta rápida.',
  'Retiro coordinado en Metro y entrega gratuita en zonas definidas.',
  'Cuidado especializado para cuero, gamuza, nobuck y suelas.',
] as const

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/thesneakerspa.cl/',
    caption: 'Antes y después, procesos y resultados en formato corto.',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@sneakers.spa.cl',
    caption: 'Contenido visual para mostrar limpieza, restauración y detalles.',
  },
] as const

const careGuide = [
  {
    title: 'Antes de entregar tu par',
    description:
      'Escribe por WhatsApp indicando el material, el nivel de suciedad y si existe despegue, manchas antiguas o suelas amarillentas.',
  },
  {
    title: 'Cuándo conviene la limpieza profunda',
    description:
      'Si hay olor, suciedad interna, suela marcada o uso prolongado, la limpieza profunda evita una recuperación superficial.',
  },
  {
    title: 'Qué esperar de una restauración',
    description:
      'La mejora depende del desgaste, el material y la antigüedad. Se evalúa cada par antes de confirmar el servicio final.',
  },
] as const

const serviceConditions = [
  'La evaluación previa se realiza por WhatsApp para definir el tratamiento adecuado.',
  'Los tiempos de entrega pueden variar según el material, el nivel de suciedad y las reparaciones adicionales.',
  'Las manchas antiguas, peladuras severas u oxidaciones profundas pueden mejorar sin desaparecer al 100%.',
  'El retiro en estaciones fuera del tramo definido se revisa caso a caso antes de confirmar.',
] as const

const contactLinks = [
  {
    label: 'WhatsApp',
    value: '+56 9 8820 4697',
    href: 'https://wa.me/56988204697?text=Hola%20Sneakers%27%20Spa%2C%20quiero%20agendar%20un%20servicio.',
  },
  {
    label: 'Correo',
    value: 'sneakerspa.cl@outlook.com',
    href: 'mailto:sneakerspa.cl@outlook.com',
  },
] as const

const navLinks = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#proceso', label: 'Cómo funciona' },
  { href: '#faq', label: 'Preguntas' },
  { href: '#contacto', label: 'Contacto' },
] as const

const buildWhatsAppLink = (message: string) =>
  `https://wa.me/56988204697?text=${encodeURIComponent(message)}`

function App() {
  const [openFaq, setOpenFaq] = useState<string>(faqs[0].id)
  const [activeShowcase, setActiveShowcase] = useState<string>(showcaseCases[0].id)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const selectedShowcase = useMemo(
    () =>
      showcaseCases.find((showcase) => showcase.id === activeShowcase) ??
      showcaseCases[0],
    [activeShowcase],
  )

  useEffect(() => {
    initAnalytics()
    trackPageView({
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    })

    let sentScrollEvent = false

    const handleScroll = () => {
      if (sentScrollEvent) {
        return
      }

      const documentHeight = document.documentElement.scrollHeight - window.innerHeight

      if (documentHeight <= 0) {
        return
      }

      const scrollDepth = window.scrollY / documentHeight

      if (scrollDepth >= 0.5) {
        sentScrollEvent = true
        trackEvent('scroll_depth_50', {
          section: 'landing-page',
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.removeProperty('overflow')
      return
    }

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  const handleWhatsAppClick = (location: string, service?: string) => {
    trackEvent('cta_whatsapp_click', {
      location,
      service: service ?? 'general',
    })
  }

  const handleContactClick = (type: string) => {
    trackEvent('contact_click', { type })
  }

  const handleShowcaseChange = (showcaseId: string) => {
    setActiveShowcase(showcaseId)
    trackEvent('before_after_interaction', { showcase_id: showcaseId })
  }

  const handleFaqToggle = (faqId: string) => {
    setOpenFaq((current) => (current === faqId ? '' : faqId))
    trackEvent('faq_open', { faq_id: faqId })
  }

  return (
    <div className="page-shell">
      <a className="skip-link" href="#contenido-principal">
        Saltar al contenido
      </a>

      <div className="announcement-bar">
        <p>Agenda por WhatsApp, coordina retiro y recibe tu par listo entre 3 y 5 días hábiles.</p>
      </div>

      <header className="site-header" id="inicio">
        <a className="brand-mark" href="#inicio" aria-label="Volver al inicio de Sneakers' Spa">
          <img src={logoWordmark} alt="Sneakers' Spa" />
        </a>

        <button
          type="button"
          className={isMenuOpen ? 'menu-toggle open' : 'menu-toggle'}
          aria-expanded={isMenuOpen}
          aria-controls="site-navigation"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={isMenuOpen ? 'header-actions open' : 'header-actions'}>
          <nav className="site-nav" id="site-navigation" aria-label="Principal">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
          </nav>

          <a
            className="button button-primary header-cta"
            href={buildWhatsAppLink('Hola Sneakers\' Spa, quiero agendar un servicio para mis zapatillas.')}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              closeMenu()
              handleWhatsAppClick('header')
            }}
          >
            Agendar ahora
          </a>
        </div>
      </header>

      <button
        type="button"
        className={isMenuOpen ? 'menu-backdrop visible' : 'menu-backdrop'}
        aria-label="Cerrar menú"
        onClick={closeMenu}
      />

      <main id="contenido-principal">
        <section className="hero-section section-frame">
          <div className="hero-copy">
            <p className="eyebrow">Limpieza, restauración y cuidado profesional</p>
            <h1>
              El cuidado que <span className="hero-highlight">tus sneakers</span> merecen.
            </h1>
            <p className="hero-text">
              Devolvemos a tus zapatillas su mejor versión con limpieza profunda y
              productos premium.
            </p>

            <div className="hero-actions">
              <a
                className="button button-primary"
                  href={buildWhatsAppLink('Hola Sneakers\' Spa, quiero cotizar limpieza o restauración para mis zapatillas.')}
                target="_blank"
                rel="noreferrer"
                onClick={() => handleWhatsAppClick('hero')}
              >
                Agenda tu servicio
              </a>
              <a className="button button-secondary" href="#servicios">
                Ver servicios
              </a>
            </div>

            <ul className="trust-list">
              {trustPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="hero-visual">
            <div className="hero-media-card">
              <span className="media-pill">Antes y después real</span>
              <img
                src={beforeAfterPair}
                alt="Par de zapatillas con contraste entre limpieza previa y resultado final"
              />
            </div>
            <div className="hero-stat-card">
              <strong>Retiro coordinado</strong>
              <span>Metro Linea 4 y 5, La Florida y Puente Alto.</span>
            </div>
          </div>
        </section>

        <section className="benefits-strip section-frame" aria-label="Ventajas clave">
          <article>
            <strong>Limpieza profunda</strong>
            <p>Eliminamos suciedad incrustada, manchas y olores para recuperar presencia.</p>
          </article>
          <article>
            <strong>Productos premium</strong>
            <p>Usamos insumos especializados para cuidar materiales y prolongar la vida útil.</p>
          </article>
          <article>
            <strong>Secado seguro</strong>
            <p>Controlamos el secado para proteger forma, color y materiales delicados.</p>
          </article>
          <article>
            <strong>Cuidado especializado</strong>
            <p>Atencion dedicada a cuero, gamuza, nobuck y combinaciones sensibles.</p>
          </article>
        </section>

        <section className="section-frame services-section" id="servicios">
          <div className="section-heading">
            <p className="eyebrow">Nuestros servicios</p>
            <h2>Tratamientos claros para distintos niveles de suciedad y restauración.</h2>
            <p>
              Cada servicio responde a un problema especifico. La idea no es vender de mas,
              sino derivarte al tratamiento que realmente necesita tu par.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.id}>
                <span className="service-badge">{service.badge}</span>
                <div className="service-header">
                  <h3>{service.name}</h3>
                  <strong>{service.price}</strong>
                </div>
                <p>{service.description}</p>
                <p className="service-best-for">{service.bestFor}</p>
                <a
                  className="service-link"
                  href={buildWhatsAppLink(
                    `Hola Sneakers' Spa, quiero agendar o consultar por el servicio ${service.name}.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    trackEvent('service_card_select', { service_id: service.id })
                    handleWhatsAppClick('services', service.id)
                  }}
                >
                  Agendar este servicio
                </a>
              </article>
            ))}
          </div>

          <div className="addon-panel">
            <div>
              <p className="eyebrow">Adicionales y restauración</p>
                <h3>Complementos pensados para recuperar presencia y durabilidad.</h3>
            </div>
            <ul>
              {addOns.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-frame showcase-section">
          <div className="section-heading">
            <p className="eyebrow">Antes y después</p>
            <h2>El resultado tiene que verse antes de pedir confianza.</h2>
            <p>
              Esta versión prioriza evidencia visual y mensajes concretos por encima de promesas vacías.
            </p>
          </div>

          <div className="showcase-layout">
            <div className="showcase-selector" role="tablist" aria-label="Casos destacados">
              {showcaseCases.map((showcase) => (
                <button
                  key={showcase.id}
                  type="button"
                  className={showcase.id === activeShowcase ? 'showcase-tab active' : 'showcase-tab'}
                  aria-label={`${showcase.label} ${showcase.title}`}
                  aria-pressed={showcase.id === activeShowcase}
                  onClick={() => handleShowcaseChange(showcase.id)}
                >
                  <span>{showcase.label}</span>
                  <strong>{showcase.title}</strong>
                </button>
              ))}
            </div>

            <article className="showcase-card">
              <img src={selectedShowcase.image} alt={selectedShowcase.title} />
              <div className="showcase-card-copy">
                <p className="eyebrow">{selectedShowcase.label}</p>
                <h3>{selectedShowcase.title}</h3>
                <p>{selectedShowcase.description}</p>
                <a
                  className="button button-secondary"
                  href={buildWhatsAppLink('Hola Sneakers\' Spa, quiero enviar fotos de mis zapatillas para evaluación.')}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => handleWhatsAppClick('showcase')}
                >
                  Enviar fotos por WhatsApp
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="section-frame process-section" id="proceso">
          <div className="section-heading narrow">
            <p className="eyebrow">Cómo funciona</p>
            <h2>Un flujo simple para no perder tiempo coordinando.</h2>
          </div>

          <div className="process-grid">
            {processSteps.map((step, index) => (
              <article className="process-card" key={step.title}>
                <span className="process-number">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-frame insights-section" aria-labelledby="insights-title">
          <div className="section-heading narrow">
            <p className="eyebrow">Confianza y guía</p>
            <h2 id="insights-title">Lo que conviene saber antes de coordinar tu servicio.</h2>
          </div>

          <div className="insights-layout">
            <article className="insight-panel">
              <p className="eyebrow">Canales activos</p>
              <h3>Revisa resultados reales y contenido del proceso.</h3>
              <div className="social-proof-grid">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    className="social-proof-card"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleContactClick(link.name.toLowerCase())}
                  >
                    <strong>{link.name}</strong>
                    <p>{link.caption}</p>
                  </a>
                ))}
              </div>
            </article>

            <article className="insight-panel">
              <p className="eyebrow">Mini guía</p>
              <h3>Expectativas correctas generan mejores resultados.</h3>
              <div className="care-guide-grid">
                {careGuide.map((item) => (
                  <div key={item.title} className="care-guide-card">
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="section-frame coverage-section">
          <div className="coverage-card">
            <p className="eyebrow">Cobertura y retiro</p>
            <h2>La logística también tiene que ser clara.</h2>
            <p>
              Puntos de encuentro desde Hospital Sotero del Río hasta Mirador por
              $2.000. Retiro gratuito en La Florida y Puente Alto, previa coordinación.
            </p>
          </div>
          <div className="coverage-card accent">
            <p className="eyebrow">Materiales y límites</p>
            <h2>Tratamos cada par según el material, el desgaste y la posibilidad real de mejora.</h2>
            <p>
              No todos los daños revierten igual. Por eso la evaluación por WhatsApp, antes de
              confirmar el trabajo, es parte central del proceso.
            </p>
          </div>
        </section>

        <section className="section-frame conditions-section" aria-labelledby="conditions-title">
          <div className="section-heading narrow">
            <p className="eyebrow">Condiciones del servicio</p>
            <h2 id="conditions-title">Un servicio serio necesita límites y criterios claros.</h2>
          </div>

          <div className="conditions-panel">
            <ul>
              {serviceConditions.map((condition) => (
                <li key={condition}>{condition}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-frame faq-section" id="faq">
          <div className="section-heading">
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2>Respuestas directas para bajar fricción antes de agendar.</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq) => {
              const isOpen = faq.id === openFaq

              return (
                <article className="faq-item" key={faq.id}>
                  <button
                    type="button"
                    className="faq-trigger"
                    aria-expanded={isOpen}
                    aria-controls={`${faq.id}-content`}
                    onClick={() => handleFaqToggle(faq.id)}
                  >
                    <span>{faq.question}</span>
                    <span aria-hidden="true">{isOpen ? '-' : '+'}</span>
                  </button>
                  <div
                    className={isOpen ? 'faq-content open' : 'faq-content'}
                    id={`${faq.id}-content`}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="cta-band section-frame">
          <div>
            <p className="eyebrow">¿Listo para coordinar?</p>
            <h2>Tus sneakers en las mejores manos, con respuesta rápida por WhatsApp.</h2>
          </div>
          <a
            className="button button-primary"
            href={buildWhatsAppLink('Hola Sneakers\' Spa, quiero agendar un servicio y coordinar retiro.')}
            target="_blank"
            rel="noreferrer"
            onClick={() => handleWhatsAppClick('cta-band')}
          >
            Agenda ahora
          </a>
        </section>
      </main>

      <footer className="site-footer section-frame" id="contacto">
        <div className="footer-brand">
          <img src={logoTagline} alt="Logo de Sneakers' Spa con subtítulo" />
          <p>
            Cuidado profesional para zapatillas con foco en limpieza visible,
            materiales delicados y coordinación clara.
          </p>
        </div>

        <div className="footer-column">
          <p className="footer-title">Contacto</p>
          <ul>
            {contactLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  onClick={() => handleContactClick(item.label.toLowerCase())}
                >
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <p className="footer-title">Redes y horario</p>
          <ul>
            {socialLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => handleContactClick(link.name.toLowerCase())}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>Lunes a viernes, de 09:00 a 19:00 hrs.</li>
          </ul>
        </div>

        <p className="footer-bottom">© 2026 Sneakers' Spa. Todos los derechos reservados.</p>
      </footer>

      <a
        className="sticky-mobile-cta"
        href={buildWhatsAppLink('Hola Sneakers\' Spa, quiero agendar un servicio para mis zapatillas.')}
        target="_blank"
        rel="noreferrer"
        onClick={() => handleWhatsAppClick('sticky-mobile')}
      >
        Agendar por WhatsApp
      </a>
    </div>
  )
}

export default App
