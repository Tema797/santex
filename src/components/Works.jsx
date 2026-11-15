import { useRef } from 'react'
import { works } from '../data/works'
import { ChevronLeft, ChevronRight } from './Icons'
import Picture from './Picture'
import './Works.css'

export default function Works({ onOpenWork }) {
  const trackRef = useRef(null)

  function scroll(dir) {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('.work-card')
    const amount = card ? card.offsetWidth + 24 : 320
    track.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <section className="section section--soft works" id="works">
      <div className="container">
        <h2 className="section-title">Наші роботи</h2>

        <div className="works__carousel">
          <button className="works__arrow works__arrow--prev" onClick={() => scroll(-1)} aria-label="Назад">
            <ChevronLeft />
          </button>

          <div className="works__track" ref={trackRef}>
            {works.map((w) => (
              <article className="work-card" key={w.id}>
                <div className="work-card__media">
                  <Picture src={w.image} alt={w.title} />
                </div>
                <div className="work-card__body">
                  <h3 className="work-card__title">{w.title}</h3>
                  <p className="work-card__text">{w.cardText}</p>
                  <button className="btn btn--teal work-card__btn" onClick={() => onOpenWork(w)}>
                    Детальніше про виконання
                  </button>
                </div>
              </article>
            ))}
          </div>

          <button className="works__arrow works__arrow--next" onClick={() => scroll(1)} aria-label="Вперед">
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}
