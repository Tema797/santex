import { pricing } from '../data/pricing'
import './Pricing.css'

export default function Pricing() {
  return (
    <section className="section section--soft pricing" id="pricing">
      <div className="container">
        <h2 className="section-title">Ціни на сантехнічні роботи</h2>

        <div className="pricing__card">
          {pricing.map((row, i) => (
            <div className="pricing__row" key={i}>
              <span className="pricing__name">{row.title}</span>
              <span className="pricing__dots" aria-hidden="true" />
              <span className="pricing__price">{row.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
