// Telegram: надійно працює посилання за username. Впишіть свій username БЕЗ @
// (Telegram → Налаштування → Ім'я користувача), наприклад 'santex_master'.
// Поки порожньо — посилання йде за номером телефону: воно відкриє чат лише якщо цей номер
// є в Telegram і в приватності дозволено пошук за номером.
const telegramUsername = ''

// Номер майстра — ЄДИНЕ місце. Формат: 380 + 9 цифр, без плюса і пробілів.
// Для тесту можна тимчасово вписати свій номер, а потім повернути робочий.
// ТЕСТ: зараз стоїть тестовий номер. РОБОЧИЙ номер майстра: 380638680505 — повернути перед запуском!
const phoneDigits = '380936411894'

export const site = {
  brand: 'Сантех Майстер',
  phone: `+${phoneDigits}`,
  phoneHref: `tel:+${phoneDigits}`,
  email: 'santexmayster@gmail.com',
  emailHref: 'mailto:santexmayster@gmail.com',
  // Viber: на телефоні — з %2B, у десктопному Viber — без плюса
  viber: `viber://chat?number=%2B${phoneDigits}`,
  viberDesktop: `viber://chat?number=${phoneDigits}`,
  telegram: telegramUsername ? `https://t.me/${telegramUsername}` : `https://t.me/+${phoneDigits}`,
}

export const nav = [
  { label: 'Головна', href: '#home' },
  { label: 'Послуги', href: '#services' },
  { label: 'Ціни', href: '#pricing' },
  { label: 'Про мене', href: '#about' },
  { label: 'Мої роботи', href: '#works' },
  { label: 'Контакти', href: '#contacts' },
]
