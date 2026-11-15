import { services, servicePromo } from '../data/services'
import { ArrowRight } from './Icons'
import Picture from './Picture'
import './Services.css'

export default function Services({ onConsult }) {
  return (
    <section className="section services" id="services">
      <div className="container">
        <h2 className="section-title">Мої послуги</h2>
        <p className="section-subtitle">
          Надаємо вирішення будь-яких сантехнічних задач — швидко, професійно, з гарантією якості
        </p>

        <div className="services__grid">
          {services.map((s) => (
            <article className="service-card" key={s.id}>
              <div className="service-card__media">
                <Picture src={s.image} alt={s.title} />
              </div>
              <div className="service-card__body">
                <h3 className="service-card__title">{s.title}</h3>
                <button className="link-more" onClick={() => onConsult(s.title)}>
                  Детальніше <ArrowRight />
                </button>
              </div>
            </article>
          ))}

          <article className="service-promo">
            <div className="service-promo__content">
              <h3 className="service-promo__title">{servicePromo.title}</h3>
              <p className="service-promo__text">{servicePromo.text}</p>
            </div>
            <Picture className="service-promo__img" src={servicePromo.image} alt="" aria-hidden="true" />
          </article>
        </div>
      </div>
    </section>
  )
}
