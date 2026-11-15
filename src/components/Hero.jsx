import ConsultForm from './ConsultForm'
import Picture from './Picture'
import './Hero.css'

export default function Hero({ onConsult, onCallout }) {
  return (
    <section className="hero" id="home">
      <div className="hero__bg" />
      <div className="hero__overlay" />

      <div className="container hero__inner">
        <div className="hero__panel">
          <h1 className="hero__title">
            Професійні<br />сантехнічні послуги
          </h1>
          <p className="hero__subtitle">
            Рішення будь-яких проблем від діагностики до монтажу — замовляйте майстра зараз!
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary" onClick={() => onConsult()}>
              Консультація з майстром
            </button>
            <button className="btn btn--ghost" onClick={() => onCallout()}>
              Технічний виклик майстра
            </button>
          </div>
        </div>

        <div className="hero__card">
          <Picture className="hero__card-photo" src="/images/hero-master.jpg" alt="Сантехнік" loading="eager" />
          <h2 className="hero__card-title">Замовити консультацію</h2>
          <ConsultForm variant="primary" source="hero" type="consult" />
        </div>
      </div>
    </section>
  )
}
