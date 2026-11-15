import { site } from '../data/site'

/** Телефон/планшет (включно з iPadOS, який видає себе за Mac). */
export function isMobileDevice() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  return (
    /Android|iPhone|iPad|iPod|Mobile/i.test(ua) ||
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
  )
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }
}

let toastEl = null
let toastTimer = null

export function showToast(message) {
  if (typeof document === 'undefined') return
  if (!toastEl) {
    toastEl = document.createElement('div')
    toastEl.className = 'toast'
    toastEl.setAttribute('role', 'status')
    toastEl.setAttribute('aria-live', 'polite')
    document.body.appendChild(toastEl)
  }
  toastEl.textContent = message
  // перезапуск анімації
  toastEl.classList.remove('is-visible')
  void toastEl.offsetWidth
  toastEl.classList.add('is-visible')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 4000)
}

/**
 * Клік по телефону.
 * Телефон/планшет: працює звичайне посилання tel: — відкривається набір номера.
 * Комп'ютер: tel: зазвичай нікуди не веде, тож копіюємо номер і показуємо підказку.
 */
export function onPhoneClick(e) {
  if (isMobileDevice()) return
  e.preventDefault()
  copyText(site.phone).then((ok) =>
    showToast(ok ? `Номер ${site.phone} скопійовано` : `Наш номер: ${site.phone}`)
  )
}

/**
 * Клік по Viber.
 * Телефон: посилання viber:// відкриває чат у застосунку.
 * Комп'ютер: відкриваємо десктопний Viber (формат без плюса) + копіюємо номер про запас.
 */
export function onViberClick(e) {
  if (isMobileDevice()) return
  e.preventDefault()
  window.location.href = site.viberDesktop
  copyText(site.phone).then((ok) =>
    showToast(
      ok
        ? `Відкриваємо Viber. Якщо не відкрився — номер ${site.phone} скопійовано`
        : `Якщо Viber не відкрився — наш номер: ${site.phone}`
    )
  )
}
