type AnalyticsParams = Record<string, string | number | boolean | undefined>

type AnalyticsWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim()

const getAnalyticsWindow = () => window as AnalyticsWindow

export const initAnalytics = () => {
  if (!measurementId || typeof window === 'undefined') {
    return
  }

  const analyticsWindow = getAnalyticsWindow()

  if (!analyticsWindow.dataLayer) {
    analyticsWindow.dataLayer = []
  }

  if (!analyticsWindow.gtag) {
    analyticsWindow.gtag = (...args: unknown[]) => {
      analyticsWindow.dataLayer?.push(args)
    }
  }

  if (!document.querySelector(`script[data-ga-id="${measurementId}"]`)) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    script.dataset.gaId = measurementId
    document.head.appendChild(script)
  }

  analyticsWindow.gtag('js', new Date())
  analyticsWindow.gtag('config', measurementId, {
    anonymize_ip: true,
    send_page_view: false,
  })
}

export const trackEvent = (name: string, params?: AnalyticsParams) => {
  if (!measurementId || typeof window === 'undefined') {
    return
  }

  getAnalyticsWindow().gtag?.('event', name, params ?? {})
}

export const trackPageView = (params: AnalyticsParams) => {
  trackEvent('page_view', params)
}