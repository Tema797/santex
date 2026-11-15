import Picture from './Picture'
import './WorkModalContent.css'

export default function WorkModalContent({ work, onOrder }) {
  const { modal, image, title } = work
  return (
    <div className="work-modal">
      <div className="work-modal__media">
        <Picture src={image} alt={title} loading="eager" />
        <div className="work-modal__caption">{modal.title}</div>
      </div>

      <div className="work-modal__body">
        <p className="work-modal__lead">{modal.lead}</p>

        <ol className="work-modal__steps">
          {modal.steps.map((s, i) => (
            <li key={i}>
              <span className="work-modal__num">{i + 1}</span>
              <span className="work-modal__step-text">
                <strong>{s.title}</strong> — {s.text}
              </span>
            </li>
          ))}
        </ol>

        <p className="work-modal__result">{modal.result}</p>

        <button className="btn btn--primary work-modal__btn" onClick={() => onOrder(modal.title)}>
          Замовити послугу
        </button>
      </div>
    </div>
  )
}
