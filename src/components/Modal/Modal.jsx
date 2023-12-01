import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Transition } from 'react-transition-group'
import { selectTheme } from '@services/selectors'
import {
  getBackgroundColorClass,
  getBorderClass,
  getColorClass,
} from '@utils/theme'
import styles from './Modal.module.css'
import ModalOverlay from './ModalOverlay/ModalOverlay'

const modalRoot = document.getElementById('modal-root')

const Modal = (props) => {
  const isDarkModeActive = useSelector(selectTheme)
  const [isComponentMounted, setIsComponentMounted] = useState(false)
  const modalRef = useRef(null)
  const { children } = props
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setIsComponentMounted(true)
  }, [])

  //navigate(-1)  нельзя это делать внутри Modal. Это хардкод действий, который может быть не нужен в будущем для других попапов. В этом смысл выноса этой логики наружу. Нужно передавать в пропсы функцию onClose
  const onClose = () => {
    navigate(-1)
  }

  const setClass = (state) => {
    if (location.pathname === '/create-post') {
      return `${styles.modalForTextBox} ${styles[state]}`
    }
    return `${styles.modal} ${styles[state]}`
  }

  return createPortal(
    <div className={styles.wrapper}>
      <Transition nodeRef={modalRef} in={isComponentMounted} timeout={300}>
        {(state) => (
          <div
            className={setClass(state)}
            ref={modalRef}
            style={{
              backgroundColor: getBackgroundColorClass(isDarkModeActive),
              border: getBorderClass(isDarkModeActive),
              color: getColorClass(isDarkModeActive),
            }}
          >
            {children}
          </div>
        )}
      </Transition>

      <ModalOverlay closeModal={onClose} />
    </div>,
    modalRoot
  )
}

export default Modal
