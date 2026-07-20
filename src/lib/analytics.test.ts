describe('analytics helper', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.unstubAllEnvs()
    document.head.innerHTML = ''
  })

  it('does not inject analytics when there is no measurement id', async () => {
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', '')

    const { initAnalytics, trackEvent } = await import('./analytics')

    initAnalytics()
    trackEvent('cta_whatsapp_click', { location: 'test' })

    expect(document.querySelector('script[data-ga-id]')).not.toBeInTheDocument()
  })

  it('injects the ga script and pushes config when a measurement id exists', async () => {
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', 'G-TEST123')

    const { initAnalytics } = await import('./analytics')

    initAnalytics()

    const script = document.querySelector('script[data-ga-id="G-TEST123"]')
    expect(script).toBeInTheDocument()
    expect((window as Window & { dataLayer?: unknown[] }).dataLayer).toBeDefined()
  })
})