import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from './Icons'
import './Modal.css'

export default function Modal({ open, onClose, children, size = 'md', label = 'Вікно' }) {
  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        className={`modal modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={onClose} aria-label="Закрити">
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
