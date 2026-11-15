import { site } from '../data/site'
import { PhoneIcon, ViberIcon, TelegramIcon } from './Icons'
import { track } from '../lib/analytics'
import { onPhoneClick, onViberClick } from '../lib/contact'
import './FloatingContact.css'

/**
 * Плаваючий блок швидкого зв'язку — лише на мобільному/планшеті.
 * Дзвінок конвертує найкраще для локального сервісу, тож телефон — головна дія.
 */
export default function FloatingContact() {
  return (
    <div className="fab" aria-label="Швидкий зв'язок">
      {site.telegram && (
        <a
          className="fab__btn fab__btn--tg"
          href={site.telegram}
          aria-label="Написати в Telegram"
          onClick={() => track('contact_click', { channel: 'telegram', placement: 'fab' })}
        >
          <TelegramIcon />
        </a>
      )}
      <a
        className="fab__btn fab__btn--viber"
        href={site.viber}
        aria-label="Написати у Viber"
        onClick={(e) => { onViberClick(e); track('contact_click', { channel: 'viber', placement: 'fab' }) }}
      >
        <ViberIcon />
      </a>
      <a
        className="fab__btn fab__btn--call"
        href={site.phoneHref}
        aria-label="Зателефонувати"
        onClick={(e) => { onPhoneClick(e); track('contact_click', { channel: 'phone', placement: 'fab' }) }}
      >
        <span className="fab__pulse" aria-hidden="true" />
        <PhoneIcon />
      </a>
    </div>
  )
}
