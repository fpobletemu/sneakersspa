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
    name: 'Limpieza Estandar',
    price: '$9.990',
    description:
      'Limpieza exterior rapida para capellada, entresuela y cordones en uso diario.',
    bestFor: 'Ideal para polvo, suciedad leve y mantenimiento regular.',
    badge: 'Entrada',
  },
  {
    id: 'limpieza-profunda',
    name: 'Limpieza Profunda',
    price: '$12.990',
    description:
      'Sanitizacion integral por dentro y por fuera con foco en suela, interior y olores.',
    bestFor: 'Para uso prolongado, manchas acumuladas y suciedad incrustada.',
    badge: 'Mas pedido',
  },
  {
    id: 'gamuza-nobuck-estandar',
    name: 'Gamuza y Nobuck Estandar',
    price: '$14.990',
    description:
      'Tratamiento en seco para preservar textura, color y acabado delicado.',
    bestFor: 'Recomendado para mantener gamuza limpia, peinada y uniforme.',
    badge: 'Material delicado',
  },
  {
    id: 'gamuza-profunda',
    name: 'Gamuza Profunda',
    price: '$17.990',
    description:
      'Shampoo especializado y protector impermeabilizante anti-manchas.',
    bestFor: 'Cuando la gamuza necesita rescate y proteccion adicional.',
    badge: 'Premium',
  },
  {
    id: 'unyellowing',
    name: 'Servicio Unyellowing',
    price: '$15.990',
    description:
      'Proceso quimico y termico para revertir oxidacion en suelas amarillentas.',
    bestFor: 'Pensado para devolver tono limpio a gomas envejecidas.',
    badge: 'Restauracion',
  },
] as const

const addOns = [
  'Restauracion y coloracion de cuero desde $5.990.',
  'Cambio o lavado premium de cordones entre $2.990 y $4.990.',
  'Desinfeccion y eliminacion extrema de olores con tratamiento germicida.',
  'Reparacion estructural ligera para despegues puntuales y bordes.',
] as const

const processSteps = [
  {
    title: 'Agenda',
    description:
      'Cuentanos por WhatsApp el tipo de zapatilla, servicio que te interesa y comuna.',
  },
  {
    title: 'Coordinamos retiro',
    description:
      'Definimos punto de encuentro en Metro o entrega en sucursal segun tu ubicacion.',
  },
  {
    title: 'Tratamos tu par',
    description:
      'Aplicamos limpieza, sanitizacion o restauracion segun material y estado real.',
  },
  {
    title: 'Entregamos listo',
    description:
      'Tiempo estimado de 3 a 5 dias habiles, sujeto al nivel de suciedad o dano.',
  },
] as const

const showcaseCases = [
  {
    id: 'hero-case',
    title: 'Caso de limpieza profunda',
    image: beforeAfterHero,
    label: 'Antes y despues',
    description:
      'Un caso ideal para mostrar la diferencia entre suciedad extrema y recuperacion visual.',
  },
  {
    id: 'pair-case',
    title: 'Recuperacion de uso diario',
    image: beforeAfterPair,
    label: 'Resultado real',
    description:
      'Comparativa pensada para demostrar blancos mas limpios, cordones prolijos y mejor presencia.',
  },
] as const

const faqs = [
  {
    id: 'faq-entrega',
    question: 'Cuanto tiempo se demoran en entregar mis zapatillas?',
    answer:
      'El tiempo estimado es de 3 a 5 dias habiles, dependiendo del tratamiento y del nivel de suciedad o dano.',
  },
  {
    id: 'faq-pagos',
    question: 'Que metodos de pago aceptan?',
    answer: 'Actualmente trabajamos con transferencias bancarias directas.',
  },
  {
    id: 'faq-retiro',
    question: 'Como funciona el retiro y delivery?',
    answer:
      'Coordinamos puntos de encuentro desde Hospital Sotero del Rio hasta Mirador por $2.000 y retiro gratuito en La Florida o Puente Alto previa coordinacion.',
  },
  {
    id: 'faq-materiales',
    question: 'Trabajan cuero, gamuza y nobuck?',
    answer:
      'Si. Cada material requiere un tratamiento distinto, por eso evaluamos el par antes de definir el proceso adecuado.',
  },
] as const

const trustPoints = [
  'Atencion por WhatsApp con respuesta rapida.',
  'Retiro coordinado en Metro y entrega gratuita en zonas definidas.',
  'Cuidado especializado para cuero, gamuza, nobuck y suelas.',
] as const

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/thesneakerspa.cl/',
    caption: 'Antes y despues, procesos y resultados en formato corto.',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@sneakers.spa.cl',
    caption: 'Contenido visual para mostrar limpieza, restauracion y detalles.',
  },
] as const

const careGuide = [
  {
    title: 'Antes de entregar tu par',
    description:
      'Escribe por WhatsApp indicando material, nivel de suciedad y si existe despegue, manchas antiguas o suelas amarillentas.',
  },
  {
    title: 'Cuando conviene limpieza profunda',
    description:
      'Si hay olor, suciedad interna, suela marcada o uso prolongado, la limpieza profunda evita una recuperacion superficial.',
  },
  {
    title: 'Que esperar de una restauracion',
    description:
      'La mejora depende de desgaste, material y antiguedad. Se evalua cada par antes de confirmar el servicio final.',
  },
] as const

const serviceConditions = [
  'La evaluacion previa se realiza por WhatsApp para definir el tratamiento adecuado.',
  'Los tiempos de entrega pueden variar segun material, nivel de suciedad y reparaciones adicionales.',
  'Las manchas antiguas, peladuras severas o oxidaciones profundas pueden mejorar sin desaparecer al 100%.',
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
  { href: '#proceso', label: 'Como funciona' },
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
        <p>Agenda por WhatsApp, coordina retiro y recibe tu par listo entre 3 y 5 dias habiles.</p>
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
          aria-label={isMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
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
        aria-label="Cerrar menu"
        onClick={closeMenu}
      />

      <main id="contenido-principal">
        <section className="hero-section section-frame">
          <div className="hero-copy">
            <p className="eyebrow">Limpieza, restauracion y cuidado profesional</p>
            <h1>Devuelvele la vida a tus zapatillas favoritas.</h1>
            <p className="hero-text">
              Tratamientos especializados para cuero, gamuza, nobuck y suelas con
              retiro coordinado en Chile y atencion rapida por WhatsApp.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#servicios">
                Ver servicios y precios
              </a>
              <a
                className="button button-secondary"
                href={buildWhatsAppLink('Hola Sneakers\' Spa, quiero cotizar limpieza o restauracion para mis zapatillas.')}
                target="_blank"
                rel="noreferrer"
                onClick={() => handleWhatsAppClick('hero')}
              >
                Agendar por WhatsApp
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
              <span className="media-pill">Antes y despues real</span>
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
            <strong>Sanitizacion integral</strong>
            <p>Interior, exterior, suela y detalles segun el estado real del par.</p>
          </article>
          <article>
            <strong>Tratamiento por material</strong>
            <p>Procesos distintos para cuero, gamuza, nobuck y gomas delicadas.</p>
          </article>
          <article>
            <strong>Conversion simple</strong>
            <p>WhatsApp como canal principal para agendar, resolver dudas y coordinar retiro.</p>
          </article>
        </section>

        <section className="section-frame services-section" id="servicios">
          <div className="section-heading">
            <p className="eyebrow">Servicios y tarifas</p>
            <h2>Tratamientos claros para distintos niveles de suciedad y restauracion.</h2>
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
              <p className="eyebrow">Adicionales y restauracion</p>
              <h3>Complementos pensados para recuperar presencia y duracion.</h3>
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
            <p className="eyebrow">Prueba visual</p>
            <h2>El resultado tiene que verse antes de pedir confianza.</h2>
            <p>
              Este v1 prioriza evidencia visual y mensajes concretos por encima de claims vacios.
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
                  href={buildWhatsAppLink('Hola Sneakers\' Spa, quiero enviar fotos de mis zapatillas para evaluacion.')}
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
            <p className="eyebrow">Como funciona</p>
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
            <p className="eyebrow">Confianza y guia</p>
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
              <p className="eyebrow">Mini guia</p>
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
            <h2>La logistica tambien tiene que ser clara.</h2>
            <p>
              Puntos de encuentro desde Hospital Sotero del Rio hasta Mirador por
              $2.000. Retiro gratuito en La Florida y Puente Alto previa coordinacion.
            </p>
          </div>
          <div className="coverage-card accent">
            <p className="eyebrow">Materiales y limites</p>
            <h2>Tratamos cada par segun material, desgaste y posibilidad real de mejora.</h2>
            <p>
              No todos los danos revierten igual. Por eso la evaluacion por WhatsApp antes de
              confirmar el trabajo es parte central del proceso.
            </p>
          </div>
        </section>

        <section className="section-frame conditions-section" aria-labelledby="conditions-title">
          <div className="section-heading narrow">
            <p className="eyebrow">Condiciones del servicio</p>
            <h2 id="conditions-title">Un servicio serio necesita limites y criterios claros.</h2>
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
            <h2>Respuestas directas para bajar friccion antes de agendar.</h2>
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
            <p className="eyebrow">Listo para coordinar?</p>
            <h2>Tus sneakers en mejores manos, sin formularios pesados ni pasos innecesarios.</h2>
          </div>
          <a
            className="button button-primary"
            href={buildWhatsAppLink('Hola Sneakers\' Spa, quiero agendar un servicio y coordinar retiro.')}
            target="_blank"
            rel="noreferrer"
            onClick={() => handleWhatsAppClick('cta-band')}
          >
            Agenda por WhatsApp
          </a>
        </section>
      </main>

      <footer className="site-footer section-frame" id="contacto">
        <div className="footer-brand">
          <img src={logoTagline} alt="Logo Sneakers' Spa con subtitulo" />
          <p>
            Cuidado profesional para zapatillas con foco en limpieza visible,
            materiales delicados y coordinacion clara.
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
            <li>Lunes a Viernes, 09:00 a 19:00 hrs.</li>
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
