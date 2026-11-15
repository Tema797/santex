import { useState } from 'react'
import { track } from '../lib/analytics'

/**
 * Універсальна форма заявки.
 * Props:
 *  - variant:    'primary' | 'teal'  — стиль кнопки
 *  - buttonText: текст кнопки
 *  - source:     звідки заявка (hero | contacts | call-modal)
 *  - type:       'consult' | 'callout' — намір клієнта (тегує лід)
 *  - withMessage: показати поле «опис проблеми» (для техвиклику)
 *  - prefill:    назва послуги/роботи, з якої прийшов клієнт (контекст ліда)
 *
 * Відправка: POST на Netlify Function /.netlify/functions/lead,
 * яка пересилає заявку майстру в Telegram (див. netlify/functions/lead.js).
 */

const TYPE_LABEL = {
  consult: 'Консультація',
  callout: 'Технічний виклик',
}

// ── Маска телефону ──────────────────────────────────────────
function formatPhone(value) {
  let digits = value.replace(/\D/g, '')
  if (digits.startsWith('380')) digits = digits.slice(3)
  if (digits.startsWith('0')) digits = digits.slice(1)
  digits = digits.slice(0, 9)
  let out = '+380'
  if (digits.length) out += ' ' + digits.slice(0, 2)
  if (digits.length > 2) out += ' ' + digits.slice(2, 5)
  if (digits.length > 5) out += ' ' + digits.slice(5, 7)
  if (digits.length > 7) out += ' ' + digits.slice(7, 9)
  return out
}

function digitsCount(value) {
  return value.replace(/\D/g, '').length
}

// ── Відправка заявки майстру ────────────────────────────────
// lead = { name, phone, type, typeLabel, source, service, problem, website }
async function submitLead(lead) {
  const res = await fetch('/.netlify/functions/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  })

  // `npm run dev` не запускає серверні функції (для цього — `netlify dev`),
  // тому локально просто логуємо заявку, щоб форма не здавалась зламаною.
  if (import.meta.env.DEV && res.status === 404) {
    console.warn('[dev] Функція lead недоступна (запустіть `netlify dev`). Заявка:', lead)
    return { ok: true, dev: true }
  }

  if (!res.ok) throw new Error(`Lead request failed: ${res.status}`)
  return res.json()
}

export default function ConsultForm({
  variant = 'primary',
  buttonText = 'Замовити',
  source = '',
  type = 'consult',
  withMessage = false,
  prefill = null,
}) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [problem, setProblem] = useState('')
  const [errors, setErrors] = useState({})
  const [trap, setTrap] = useState('') // «медова пастка» проти ботів
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  function validate() {
    const e = {}
    if (name.trim().length < 2) e.name = "Вкажіть ім'я"
    if (digitsCount(phone) < 12) e.phone = 'Вкажіть коректний номер'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    if (!validate()) return
    setStatus('sending')
    try {
      await submitLead({
        name: name.trim(),
        phone,
        type,
        typeLabel: TYPE_LABEL[type],
        source,
        service: prefill || null,
        problem: withMessage ? problem.trim() || null : null,
        website: trap,
      })
    } catch (err) {
      console.error(err)
      setStatus('error')
      return
    }
    track('lead_submit', {
      form_type: type,
      source,
      service: prefill || undefined,
      has_problem: withMessage ? Boolean(problem.trim()) : undefined,
    })
    setStatus('done')
    setName('')
    setPhone('')
    setProblem('')
  }

  if (status === 'done') {
    return (
      <div className="form-success">
        Дякуємо! Ми зв'яжемося з вами найближчим часом.
      </div>
    )
  }

  const btnClass = variant === 'teal' ? 'btn btn--teal btn--block' : 'btn btn--primary btn--block'

  return (
    <form className="consult-form" onSubmit={handleSubmit} noValidate>
      {prefill && (
        <div className="consult-form__context">
          Послуга: <strong>{prefill}</strong>
        </div>
      )}

      <div className="consult-form__row">
        <input
          className={`field ${errors.name ? 'field--error' : ''}`}
          type="text"
          placeholder="Ваше ім'я"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Ваше ім'я"
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="consult-form__row">
        <input
          className={`field ${errors.phone ? 'field--error' : ''}`}
          type="tel"
          inputMode="tel"
          placeholder="Ваш номер телефону"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          onFocus={() => !phone && setPhone('+380 ')}
          aria-label="Ваш номер телефону"
        />
        {errors.phone && <span className="field-error">{errors.phone}</span>}
      </div>

      {withMessage && (
        <div className="consult-form__row">
          <textarea
            className="field consult-form__textarea"
            placeholder="Коротко опишіть проблему (необов'язково)"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            rows={3}
            aria-label="Опис проблеми"
          />
        </div>
      )}

      {/* Приховане поле: люди його не бачать, боти заповнюють */}
      <input
        type="text"
        name="website"
        value={trap}
        onChange={(e) => setTrap(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

      {status === 'error' && (
        <div className="form-error" role="alert">
          Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам.
        </div>
      )}

      <button className={btnClass} type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Надсилання…' : buttonText}
      </button>
    </form>
  )
}
