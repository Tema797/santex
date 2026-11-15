/**
 * Тонка абстракція над аналітикою.
 * Події штовхаються у window.dataLayer (Google Tag Manager) і, якщо підключено,
 * у gtag (GA4). Жодних залежностей: поки тег не вставлено — події просто
 * накопичуються в dataLayer / логуються в dev-консоль.
 *
 * Підключення (пізніше): додати у index.html GTM або GA4 snippet —
 * і всі ці події одразу запрацюють без змін у коді.
 */
export function track(event, params = {}) {
  if (typeof window === 'undefined') return

  // Google Tag Manager
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })

  // GA4 (якщо підключено напряму)
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, params)
  }
}
