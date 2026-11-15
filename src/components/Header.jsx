import { useEffect, useState } from 'react'
import { site, nav } from '../data/site'
import { Logo, PhoneIcon } from './Icons'
import { track } from '../lib/analytics'
import { onPhoneClick } from '../lib/contact'
import './Header.css'

export default function Header({ onCallout }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleNavClick() {
    setMenuOpen(false)
  }

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="#home" className="header__brand" onClick={handleNavClick}>
          <Logo />
          <span className="brand-text">
            <span className="brand-name">Сантех</span>
            <span className="brand-sub">Майстер</span>
          </span>
        </a>

        <nav className={`header__nav ${menuOpen ? 'is-open' : ''}`}>
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="header__link" onClick={handleNavClick}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__right">
          <a
            href={site.phoneHref}
            className="header__phone"
            onClick={(e) => { onPhoneClick(e); track('contact_click', { channel: 'phone', placement: 'header' }) }}
          >
            <span className="header__phone-icon">
              <PhoneIcon />
            </span>
            <span className="header__phone-text">
              <small>Телефон</small>
              {site.phone}
            </span>
          </a>
          <button className="btn btn--primary header__cta" onClick={() => onCallout()}>
            Викликати майстра
          </button>
          <button
            className={`header__burger ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Меню"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
