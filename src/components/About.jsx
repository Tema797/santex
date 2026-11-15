import { about } from '../data/about'
import { CheckIcon } from './Icons'
import Picture from './Picture'
import './About.css'

export default function About({ onConsult }) {
  return (
    <section className="section about" id="about">
      <div className="container about__inner">
        <div className="about__text">
          <span className="about__tag">{about.tag}</span>
          <h2 className="about__title">{about.title}</h2>
          <p className="about__lead">{about.text}</p>

          <h3 className="about__approach-title">{about.approachTitle}</h3>
          <ul className="about__list">
            {about.approach.map((item, i) => (
              <li key={i}>
                <span className="about__check">
                  <CheckIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <button className="btn btn--primary about__btn" onClick={() => onConsult()}>
            Консультація з майстром
          </button>
        </div>

        <div className="about__media">
          <Picture className="about__img" src={about.image} alt="Сантехнік за роботою" />
          <div className="about__badge">
            <strong>{about.badge.value}</strong>
            <span>{about.badge.label}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
