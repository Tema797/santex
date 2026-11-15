import { site } from '../data/site'
import ConsultForm from './ConsultForm'
import Picture from './Picture'
import { PhoneIcon, MailIcon, ViberIcon, TelegramIcon } from './Icons'
import { track } from '../lib/analytics'
import { onPhoneClick, onViberClick } from '../lib/contact'
import './Contact.css'

export default function Contact() {
  return (
    <section className="section contact" id="contacts">
      <div className="container">
        <div className="contact__card">
          <div className="contact__info">
            <a
              className="contact__item"
              href={site.phoneHref}
              onClick={(e) => { onPhoneClick(e); track('contact_click', { channel: 'phone', placement: 'contacts' }) }}
            >
              <span className="contact__icon"><PhoneIcon /></span>
              <span className="contact__meta">
                <small>Телефон</small>
                {site.phone}
              </span>
            </a>
            <a
              className="contact__item"
              href={site.emailHref}
              onClick={() => track('contact_click', { channel: 'email', placement: 'contacts' })}
            >
              <span className="contact__icon"><MailIcon /></span>
              <span className="contact__meta">
                <small>Email</small>
                {site.email}
              </span>
            </a>
            <div className="contact__messengers">
              <a
                className="messenger messenger--viber"
                href={site.viber}
                onClick={(e) => { onViberClick(e); track('contact_click', { channel: 'viber', placement: 'contacts' }) }}
              >
                <ViberIcon /> Viber
              </a>
              {site.telegram && (
                <a
                  className="messenger messenger--tg"
                  href={site.telegram}
                  onClick={() => track('contact_click', { channel: 'telegram', placement: 'contacts' })}
                >
                  <TelegramIcon /> Telegram
                </a>
              )}
            </div>
          </div>

          <div className="contact__photo">
            <Picture src="/images/master-cutout.png" alt="Сантех Майстер" />
          </div>

          <div className="contact__form">
            <h2 className="contact__title">Замовити консультацію</h2>
            <ConsultForm variant="teal" source="contacts" type="consult" />
          </div>
        </div>
      </div>
    </section>
  )
}
