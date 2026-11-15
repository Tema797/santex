import { useState, useCallback } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Pricing from './components/Pricing'
import About from './components/About'
import Works from './components/Works'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import Modal from './components/Modal'
import WorkModalContent from './components/WorkModalContent'
import CallModalContent from './components/CallModalContent'
import { track } from './lib/analytics'

export default function App() {
  // modal:
  //   { kind: 'call', ...config }  — форма заявки (консультація або техвиклик)
  //   { kind: 'work', work }       — деталі кейсу
  //   null                         — закрито
  const [modal, setModal] = useState(null)
  // Змінюється при кожному відкритті — щоб форма монтувалась наново (скидання стану)
  const [openId, setOpenId] = useState(0)

  // Консультація — легкий намір (питання, орієнтовна ціна)
  const openConsult = useCallback(
    (prefill = null) => {
      track('open_form', { form_type: 'consult', service: prefill || undefined })
      setOpenId((n) => n + 1)
      setModal({
        kind: 'call',
        type: 'consult',
        title: 'Замовити консультацію',
        subtitle: 'Залиште контакти — підкажемо рішення та орієнтовну вартість.',
        withMessage: false,
        prefill,
        buttonText: 'Замовити',
      })
    },
    [],
  )

  // Технічний виклик — гарячий намір (майстер на адресу)
  const openCallout = useCallback(
    (prefill = null) => {
      track('open_form', { form_type: 'callout', service: prefill || undefined })
      setOpenId((n) => n + 1)
      setModal({
        kind: 'call',
        type: 'callout',
        title: 'Технічний виклик майстра',
        subtitle: 'Опишіть проблему — майстер виїде у зручний час.',
        withMessage: true,
        prefill,
        buttonText: 'Викликати майстра',
      })
    },
    [],
  )

  const openWork = useCallback((work) => {
    track('open_work', { work_id: work.id })
    setOpenId((n) => n + 1)
    setModal({ kind: 'work', work })
  }, [])
  const closeModal = useCallback(() => setModal(null), [])

  return (
    <>
      <Header onCallout={openCallout} />

      <main>
        <Hero onConsult={openConsult} onCallout={openCallout} />
        <Services onConsult={openConsult} />
        <Pricing />
        <About onConsult={openConsult} />
        <Works onOpenWork={openWork} />
        <Contact />
      </main>

      <Footer onCallout={openCallout} />

      <FloatingContact />

      <Modal
        open={modal?.kind === 'call'}
        onClose={closeModal}
        size="sm"
        label={modal?.title}
      >
        {modal?.kind === 'call' && (
          <CallModalContent
            key={openId}
            title={modal.title}
            subtitle={modal.subtitle}
            type={modal.type}
            withMessage={modal.withMessage}
            prefill={modal.prefill}
            buttonText={modal.buttonText}
          />
        )}
      </Modal>

      <Modal
        open={modal?.kind === 'work'}
        onClose={closeModal}
        size="md"
        label={modal?.work?.title}
      >
        {modal?.kind === 'work' && (
          <WorkModalContent key={openId} work={modal.work} onOrder={openCallout} />
        )}
      </Modal>
    </>
  )
}
