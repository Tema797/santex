import ConsultForm from './ConsultForm'
import './CallModalContent.css'

export default function CallModalContent({
  title = 'Викликати майстра',
  subtitle = null,
  type = 'callout',
  withMessage = false,
  prefill = null,
  buttonText = 'Замовити',
}) {
  return (
    <div className="call-modal">
      <h2 className="call-modal__title">{title}</h2>
      {subtitle && <p className="call-modal__subtitle">{subtitle}</p>}
      <ConsultForm
        variant="primary"
        source="call-modal"
        type={type}
        withMessage={withMessage}
        prefill={prefill}
        buttonText={buttonText}
      />
    </div>
  )
}
