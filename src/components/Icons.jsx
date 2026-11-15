import { useId } from 'react'

export function Logo({ className, size = 58 }) {
  // Унікальний id градієнта: Logo рендериться двічі (шапка + підвал)
  const gid = `logoG${useId().replace(/:/g, '')}`
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', flex: 'none' }}>
      <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true" style={{ display: 'block', flex: 'none' }}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#34A7E5" />
            <stop offset="1" stopColor="#1B6FB8" />
          </linearGradient>
        </defs>
        {/* «С» — труба з краплею всередині */}
        <path d="M51.8 43.9 A24 24 0 1 0 51.8 76.1" fill="none" stroke={`url(#${gid})`} strokeWidth="12" />
        <path d="M34 47 C34 47 25 57 25 63 a9 9 0 0 0 18 0 C43 57 34 47 34 47z" fill="#34A7E5" />
        {/* «М» — колір береться з тексту (білий на Hero, темний після скролу) */}
        <path d="M72 90 V36 L91 66 L110 36 V90" fill="none" stroke="currentColor" strokeWidth="12" strokeLinejoin="round" />
        <rect x="63" y="68" width="18" height="8" rx="2" fill={`url(#${gid})`} />
        <rect x="101" y="68" width="18" height="8" rx="2" fill={`url(#${gid})`} />
      </svg>
    </span>
  )
}

export const PhoneIcon = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...p}>
    <path
      d="M6.5 4h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 6a2 2 0 0 1 2-2z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
)

export const MailIcon = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  </svg>
)

export const ArrowRight = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" {...p}>
    <path d="M5 12h13m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const ChevronLeft = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...p}>
    <path d="m15 5-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const ChevronRight = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...p}>
    <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const CloseIcon = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...p}>
    <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const CheckIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...p}>
    <path d="m4 12 5 5L20 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const ViberIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}>
    <path d="M12 2C7 2 3 5.6 3 10c0 2.4 1.2 4.6 3.1 6v3.5l3.2-1.8c.8.2 1.7.3 2.7.3 5 0 9-3.6 9-8S17 2 12 2zm4.6 11.4c-.2.5-1 .9-1.5 1-.4.1-.9.1-1.5-.1-.3-.1-.8-.3-1.4-.5-2.4-1-4-3.4-4.1-3.6-.1-.2-1-1.3-1-2.5s.6-1.7.8-2c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.4l.6 1.5c.1.1.1.3 0 .5l-.3.4-.3.3c-.1.1-.2.3-.1.5.1.2.6 1 1.3 1.6.9.8 1.6 1 1.8 1.1.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.2.4.3.1.1.1.6-.1 1z" />
  </svg>
)

export const TelegramIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}>
    <path d="M21.5 4.3 2.9 11.5c-.9.4-.9 1.6.1 1.9l4.7 1.5 1.8 5.6c.2.6 1 .8 1.5.3l2.6-2.4 4.7 3.5c.6.4 1.4.1 1.6-.6l3.3-15.4c.2-.9-.7-1.6-1.5-1.1zM9.6 14.2l8-5-6.6 6.1c-.2.2-.3.4-.3.7l-.3 2.4-0.8-4.2z" />
  </svg>
)
