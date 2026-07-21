import { useEffect, useMemo, useState } from 'react'
import beforeAfterHero from '../img/before-after-hero.webp'
import beforeAfterPair from '../img/before-after-pair.webp'
import logoTagline from '../img/logo-tagline.webp'
import logoWordmark from '../img/logo-wordmark.webp'
import './App.css'
import { initAnalytics, trackEvent, trackPageView } from './lib/analytics'

const services = [
  {
    id: 'limpieza-express',
    name: 'Limpieza Express',
    price: '$9.990',
    description:
      'Mantenimiento rápido por fuera. Incluye capellada, cordones y limpieza exterior de la suela.',
    bestFor: 'Uso diario y suciedad ligera.',
    badges: ['LIMPIEZA EXTERIOR', 'RÁPIDO', 'LONA, CUERO SINTÉTICO O MALLA'],
  },
  {
    id: 'limpieza-profunda',
    name: 'Limpieza Profunda',
    price: '$12.990',
    description:
      'Sanitización integral por dentro y por fuera. Desinfección interior, lavado exhaustivo de entresuela y detalle de suela.',
    bestFor: 'Calzado con uso prolongado, olores o acumulación de suciedad.',
    badges: ['LAVADO INTERIOR Y PLANTILLA', 'SANITIZADO ANTIBACTERIAL', 'DETALLADO EXHAUSTIVO DE PLANTA'],
  },
  {
    id: 'gamuza-nobuck-estandar',
    name: 'Gamuza & Nobuck Estándar',
    price: '$14.990',
    description:
      'Tratamiento premium en seco para cuidar la textura delicada y revivir el color sin riesgo de daño por agua.',
    bestFor: 'Mantener gamuza o nobuck limpio, peinado y protegido.',
    badges: ['TRATAMIENTO EN SECO', 'PEINADO Y RECONSTITUCIÓN DE FIBRA', 'REACTIVACIÓN DE TONO'],
  },
  {
    id: 'gamuza-profunda',
    name: 'Gamuza Profunda',
    price: '$17.990',
    description:
      'Limpieza avanzada con shampoo especializado de gamuza y aplicación de protector impermeabilizante anti-manchas.',
    bestFor: 'Gamuza con manchas difíciles o suciedad profunda.',
    badges: ['SHAMPOO ESPECIALIZADO DE GAMUZA', 'DESMANCHADO AVANZADO', 'CAPA PROTECTORA IMPERMEABILIZANTE'],
  },
] as const

const addOns = [
  {
    title: 'Unyellowing',
    price: '+$5.990',
    description:
      'Proceso químico y térmico que revierte la oxidación de la goma y devuelve el blanco original.',
  },
  {
    title: 'Restauración de cuero',
    price: '+$5.990',
    description: 'Reparación de grietas, raspones y peladuras en cuero.',
  },
  {
    title: 'Servicio de cordones',
    price: '$2.990 - $4.990',
    description:
      'Opción A ($2.990): lavado y blanqueado profundo. Opción B ($4.990): reemplazo por cordones nuevos.',
  },
  {
    title: 'Reparación estructural ligera',
    price: 'Cotización según caso',
    description: 'Pegado de suelas o despegues puntuales.',
  },
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
    answer: 'Entre 3 y 5 días hábiles. Incluye secado seguro y control de calidad antes de la entrega.',
  },
  {
    id: 'faq-retiro',
    question: '¿Cómo funciona el retiro y la entrega?',
    answer:
      'Coordinamos retiro local de forma directa. Para regiones, enviamos por Starken o Chilexpress en empaque e-commerce sellado.',
  },
  {
    id: 'faq-servicios',
    question: '¿Cuál es la diferencia entre limpieza express y profunda?',
    answer:
      'Express ($9.990) considera limpieza exterior. Profunda ($12.990) incluye interior, plantilla, sanitizado antibacterial y detallado de suela.',
  },
  {
    id: 'faq-garantia',
    question: '¿Tienen garantía?',
    answer:
      'Sí. Tienes 24 horas posteriores a la entrega para reportar cualquier detalle y lo corregimos sin costo.',
  },
  {
    id: 'faq-pagos',
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Transferencia bancaria directa.',
  },
  {
    id: 'faq-materiales',
    question: '¿Reciben todas las marcas y materiales?',
    answer:
      'Sí. Trabajamos cuero, lona, malla, sintéticos, gamuza y nobuck con protocolos según material.',
  },
] as const

const trustPoints = [
  'Atención por WhatsApp con respuesta rápida.',
  'Retiro coordinado en Metro y entrega gratuita en zonas definidas.',
  'Cuidado especializado para cuero, gamuza, nobuck y suelas.',
] as const

const benefitCards = [
  {
    icon: 'clean',
    title: 'Limpieza profunda',
    description: 'Eliminamos suciedad incrustada, manchas y olores para recuperar presencia.',
  },
  {
    icon: 'premium',
    title: 'Productos premium',
    description: 'Usamos insumos especializados para cuidar materiales y prolongar la vida útil.',
  },
  {
    icon: 'dry',
    title: 'Secado seguro',
    description: 'Controlamos el secado para proteger forma, color y materiales delicados.',
  },
  {
    icon: 'material',
    title: 'Cuidado especializado',
    description: 'Atención dedicada a cuero, gamuza, nobuck y combinaciones sensibles.',
  },
] as const

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/thesneakerspa.cl/',
    username: '@thesneakerspa.cl',
    icon: 'instagram',
    caption: 'Antes y después, procesos y resultados en formato corto.',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@sneakers.spa.cl',
    username: '@sneakers.spa.cl',
    icon: 'tiktok',
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

const logistics = {
  freePickup: [
    'La Florida: lunes a domingo (coordinación previa), cerca de Metro Mirador.',
    'Puente Alto: lunes a domingo (coordinación previa), cerca de Metro Sótero del Río.',
  ],
  metroFee: '$2.000 tarifa plana',
  metroSegment: 'Plaza de Puente Alto a Mirador',
  line4:
    'Plaza de Puente Alto, Hospital Sótero del Río, Elisa Correa, Los Quillayes, San José de la Estrella, Trinidad, Rojas Magallanes y Vicente Valdés.',
  line5: 'Bellavista de La Florida y Mirador.',
  regionalShipping: 'Despachos a regiones vía Starken (pago en destino).',
} as const

const servicePromise = {
  title: 'Nuestra Promesa de Cuidado y Transparencia',
  details:
    'Tratamos cada par de zapatillas con la máxima dedicación. Ten en cuenta que en calzados con suciedad extrema, manchas difíciles o desgaste por el tiempo, la limpieza profunda puede hacer más evidentes detalles preexistentes como decoloración o variaciones en la textura de las superficies (cuero, gamuza, lona o gomas).',
  guarantee:
    'Tu tranquilidad es lo primero: siempre evaluamos el estado de tu calzado antes de comenzar y te avisaremos si existe algún riesgo. Además, cuentas con un plazo de 24 horas desde la entrega para reportar cualquier disconformidad con el servicio. Nos aseguraremos de que quedes 100% satisfecho con tus pares.',
} as const

const transparencyDisclaimer =
  'Tratamos cada par con la máxima dedicación y un enfoque 100% personalizado. En calzados con uso intensivo o suciedad acumulada, nuestro servicio logrará una renovación profunda en higiene y estética. Al retirar las capas de suciedad, el material recupera su estado real y quedan a la vista los detalles propios del tiempo en superficies como cuero, gamuza, lona o goma. Para tu total tranquilidad, realizamos una evaluación inicial de tus pares antes de comenzar para confirmarte el resultado esperado.'

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

const buildServiceInquiryMessage = (serviceName: string) =>
  `Hola Sneakers' Spa, quiero agendar el servicio de ${serviceName}.\n\nPor favor, ayúdame con la disponibilidad y el proceso de retiro.`

type BenefitIconName = (typeof benefitCards)[number]['icon']
type SocialIconName = (typeof socialLinks)[number]['icon']

const BenefitIcon = ({ name }: { name: BenefitIconName }) => {
  if (name === 'clean') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3L13.9 8.1L19 10L13.9 11.9L12 17L10.1 11.9L5 10L10.1 8.1L12 3Z" />
      </svg>
    )
  }

  if (name === 'premium') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 17L6.7 8.5L12 13L17.3 8.5L20 17H4Z" />
        <path d="M7.2 7.2C7.86274 7.2 8.4 6.66274 8.4 6C8.4 5.33726 7.86274 4.8 7.2 4.8C6.53726 4.8 6 5.33726 6 6C6 6.66274 6.53726 7.2 7.2 7.2Z" />
        <path d="M16.8 7.2C17.4627 7.2 18 6.66274 18 6C18 5.33726 17.4627 4.8 16.8 4.8C16.1373 4.8 15.6 5.33726 15.6 6C15.6 6.66274 16.1373 7.2 16.8 7.2Z" />
      </svg>
    )
  }

  if (name === 'dry') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 4C8.8 8.2 7.2 10.5 7.2 13C7.2 15.651 9.349 17.8 12 17.8C14.651 17.8 16.8 15.651 16.8 13C16.8 10.5 15.2 8.2 12 4Z" />
        <path d="M18 8.2H21" />
        <path d="M17.2 11.2H20.2" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L20 6V12C20 17 16.6 21.2 12 22C7.4 21.2 4 17 4 12V6L12 2Z" />
      <path d="M9.4 11.8L11.2 13.6L14.8 10" />
    </svg>
  )
}

const SocialIcon = ({ name }: { name: SocialIconName }) => {
  if (name === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="4.8" />
        <circle cx="12" cy="12" r="3.7" />
        <circle cx="17.1" cy="6.9" r="1.05" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15.2 3.6C15.3 4.5 15.75 5.34 16.45 5.95C17.15 6.57 18.05 6.9 18.98 6.87V9.1C17.87 9.11 16.8 8.8 15.87 8.22V13.17C15.87 15.68 13.83 17.72 11.32 17.72C8.81 17.72 6.77 15.68 6.77 13.17C6.77 10.66 8.81 8.62 11.32 8.62C11.52 8.62 11.72 8.63 11.92 8.67V10.93C11.73 10.86 11.52 10.83 11.32 10.83C10.03 10.83 8.98 11.88 8.98 13.17C8.98 14.46 10.03 15.51 11.32 15.51C12.62 15.51 13.66 14.46 13.66 13.17V3.6H15.2Z" />
    </svg>
  )
}

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
            <h1>Devuélvele la vida a tus zapatillas favoritas.</h1>
            <p className="hero-text">
              Limpieza, restauración y cuidado profesional para tu calzado en Chile.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#servicios">
                Ver Servicios y Precios
              </a>
              <a
                className="button button-secondary"
                  href={buildWhatsAppLink('Hola Sneakers\' Spa, quiero cotizar limpieza o restauración para mis zapatillas.')}
                target="_blank"
                rel="noreferrer"
                onClick={() => handleWhatsAppClick('hero')}
              >
                📲 Agendar por WhatsApp
              </a>
            </div>

            <div className="trust-carousel" aria-label="Puntos clave del servicio">
              <div className="trust-track">
                {[...trustPoints, ...trustPoints].map((point, index) => (
                  <p className="trust-item" key={`${point}-${index}`}>
                    <span className="trust-dot" aria-hidden="true"></span>
                    {point}
                  </p>
                ))}
              </div>
            </div>
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
          {benefitCards.map((card) => (
            <article key={card.title}>
              <span className="benefit-icon" aria-hidden="true">
                <BenefitIcon name={card.icon} />
              </span>
              <strong>{card.title}</strong>
              <p>{card.description}</p>
            </article>
          ))}
        </section>

        <section className="section-frame services-section" id="servicios">
          <div className="section-heading">
            <p className="eyebrow">Nuestros servicios</p>
            <h2>Servicios y precios claros para devolverle vida a tus zapatillas.</h2>
            <p>
              Todos nuestros servicios incluyen lavado estándar de cordones y limpieza de suela.
            </p>
            <p className="service-global-note">
              Cada servicio se recomienda según material, nivel de suciedad y estado real del par.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.id}>
                <div className="service-header">
                  <h3>{service.name}</h3>
                  <strong>{service.price}</strong>
                </div>
                <p>{service.description}</p>
                <p className="service-best-for">{service.bestFor}</p>
                <ul className="service-includes" aria-label={`Incluye ${service.name}`}>
                  {service.badges.map((badge) => (
                    <li key={badge}>✓ {badge}</li>
                  ))}
                </ul>
                <a
                  className="button service-link"
                  href={buildWhatsAppLink(buildServiceInquiryMessage(service.name))}
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
                <h3>Complementos para casos especiales y restauración.</h3>
            </div>
            <ul>
              {addOns.map((item) => (
                <li key={item.title} className="addon-item">
                  <strong>{item.title}</strong>
                  <span>{item.price}</span>
                  <p>{item.description}</p>
                </li>
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
            <p className="eyebrow">Retiro gratuito</p>
            <h2>Puntos de retiro sin costo en comunas clave.</h2>
            <ul className="coverage-list">
              {logistics.freePickup.map((point) => (
                <li key={point}>📍 {point}</li>
              ))}
            </ul>
          </div>
          <div className="coverage-card">
            <p className="eyebrow">Entrega en Metro</p>
            <h2>{logistics.metroFee} en el tramo {logistics.metroSegment}.</h2>
            <p><strong>L4:</strong> {logistics.line4}</p>
            <p><strong>L5:</strong> {logistics.line5}</p>
          </div>
          <div className="coverage-card accent full-width">
            <p className="eyebrow">Envíos a regiones</p>
            <h2>También trabajamos fuera de Santiago.</h2>
            <p>{logistics.regionalShipping}</p>
          </div>
        </section>

        <section className="section-frame conditions-section" aria-labelledby="conditions-title">
          <div className="section-heading narrow">
            <p className="eyebrow">Condiciones del servicio</p>
            <h2 id="conditions-title">Cuidado profesional con transparencia y respaldo real.</h2>
          </div>

          <div className="conditions-panel">
            <h3>{servicePromise.title}</h3>
            <p>{servicePromise.details}</p>
            <p>{servicePromise.guarantee}</p>
          </div>
        </section>

        <section className="transparency-banner section-frame" aria-label="Promesa de transparencia">
          <p>{transparencyDisclaimer}</p>
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
                  className="social-handle-link"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => handleContactClick(link.name.toLowerCase())}
                >
                  <SocialIcon name={link.icon} />
                  <strong>{link.username}</strong>
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
        aria-label="Agendar por WhatsApp"
        onClick={() => handleWhatsAppClick('sticky-mobile')}
      >
        📲 Agendar por WhatsApp
      </a>
    </div>
  )
}

export default App
