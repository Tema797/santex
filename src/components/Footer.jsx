import { site, nav } from '../data/site'
import { Logo, PhoneIcon } from './Icons'
import { track } from '../lib/analytics'
import { onPhoneClick } from '../lib/contact'
import './Footer.css'

export default function Footer({ onCallout }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#home" className="footer__brand">
          <Logo />
          <span className="brand-text">
            <span className="brand-name">Сантех</span>
            <span className="brand-sub">Майстер</span>
          </span>
        </a>

        <nav className="footer__nav">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="footer__link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="footer__right">
          <a
            href={site.phoneHref}
            className="footer__phone"
            onClick={(e) => { onPhoneClick(e); track('contact_click', { channel: 'phone', placement: 'footer' }) }}
          >
            <span className="footer__phone-icon"><PhoneIcon /></span>
            <span>
              <small>Телефон</small>
              {site.phone}
            </span>
          </a>
          <button className="btn btn--ghost footer__cta" onClick={() => onCallout()}>
            Викликати майстра
          </button>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          © {site.brand} Усі права захищені
        </div>
      </div>
    </footer>
  )
}
