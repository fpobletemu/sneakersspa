import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { initAnalytics, trackEvent, trackPageView } from './lib/analytics'

vi.mock('./lib/analytics', () => ({
  initAnalytics: vi.fn(),
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
}))

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the core landing sections and service cards', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /el cuidado que tus sneakers merecen/i })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /principal/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /tratamientos claros/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /un flujo simple/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /respuestas directas/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /lo que conviene saber/i })).toBeInTheDocument()
    expect(screen.getAllByText(/agendar este servicio/i)).toHaveLength(5)
  })

  it('initializes analytics and tracks the first page view', () => {
    render(<App />)

    expect(initAnalytics).toHaveBeenCalledTimes(1)
    expect(trackPageView).toHaveBeenCalledTimes(1)
  })

  it('tracks faq interaction when a question is toggled', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /qué métodos de pago aceptan/i }))

    expect(trackEvent).toHaveBeenCalledWith('faq_open', { faq_id: 'faq-pagos' })
    expect(screen.getByText(/transferencias bancarias directas/i)).toBeInTheDocument()
  })

  it('changes the showcase case and tracks the interaction', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /resultado real recuperación de uso diario/i }))

    expect(trackEvent).toHaveBeenCalledWith('before_after_interaction', {
      showcase_id: 'pair-case',
    })
    expect(screen.getByRole('img', { name: /recuperación de uso diario/i })).toBeInTheDocument()
  })

  it('sends analytics when the main whatsapp cta is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('link', { name: /agendar ahora/i }))

    expect(trackEvent).toHaveBeenCalledWith('cta_whatsapp_click', {
      location: 'header',
      service: 'general',
    })
  })

  it('renders direct contact links in the footer', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: /whatsapp \+56 9 8820 4697/i })).toHaveAttribute(
      'href',
      expect.stringContaining('wa.me/56988204697'),
    )
    expect(screen.getByRole('link', { name: /correo sneakerspa.cl@outlook.com/i })).toHaveAttribute(
      'href',
      'mailto:sneakerspa.cl@outlook.com',
    )
  })
})