// Netlify Function: приймає заявку з форм сайту і пересилає майстру в Telegram.
// Потрібні змінні середовища (Netlify → Site configuration → Environment variables):
//   TELEGRAM_BOT_TOKEN — токен бота від @BotFather
//   TELEGRAM_CHAT_ID   — chat_id майстра (можна кілька через кому: 111,222)

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

// Прибираємо керуючі символи й обрізаємо довжину (захист від сміття)
const clean = (value, max) =>
  typeof value === 'string'
    ? value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, ' ').trim().slice(0, max)
    : ''

const SOURCE_LABEL = {
  hero: 'Головний екран',
  contacts: 'Блок «Контакти»',
  'call-modal': 'Вікно «Викликати майстра»',
}

const TYPE_LABEL = {
  consult: 'Консультація',
  callout: 'Технічний виклик',
}

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatIds = (process.env.TELEGRAM_CHAT_ID || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)

  if (!token || chatIds.length === 0) {
    console.error('TELEGRAM_BOT_TOKEN або TELEGRAM_CHAT_ID не задані в змінних середовища')
    return json({ error: 'Server is not configured' }, 500)
  }

  let body
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  // Медова пастка: це заповнюють тільки боти — вдаємо успіх і нічого не шлемо
  if (clean(body.website, 100)) return json({ ok: true })

  const name = clean(body.name, 80)
  const phone = clean(body.phone, 30)
  const problem = clean(body.problem, 1000)
  const service = clean(body.service, 200)
  const type = TYPE_LABEL[body.type] ? body.type : 'consult'
  const source = SOURCE_LABEL[body.source] || clean(body.source, 40) || '—'

  if (name.length < 2 || phone.replace(/\D/g, '').length < 12) {
    return json({ error: 'Invalid name or phone' }, 400)
  }

  const lines = [
    `${type === 'callout' ? '🔧' : '💬'} Нова заявка: ${TYPE_LABEL[type]}`,
    '',
    `👤 Ім'я: ${name}`,
    `📞 Телефон: ${phone}`,
  ]
  if (service) lines.push(`🛠 Послуга: ${service}`)
  if (problem) lines.push(`📝 Проблема: ${problem}`)
  lines.push(`📍 Звідки: ${source}`)
  const text = lines.join('\n')

  const results = await Promise.all(
    chatIds.map(async (chat_id) => {
      try {
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id, text, disable_web_page_preview: true }),
        })
        if (!res.ok) console.error('Telegram error', res.status, await res.text())
        return res.ok
      } catch (err) {
        console.error('Telegram request failed', err?.message)
        return false
      }
    })
  )

  // Успіх, якщо дійшло хоча б одному отримувачу
  if (!results.some(Boolean)) return json({ error: 'Failed to deliver' }, 502)
  return json({ ok: true })
}
