import React from 'react'
import styles from './ModalOverlay.module.css'

const ModalOverlay = (props) => {
  const { closeModal } = props
  return <div className={styles.modalOverlay} onClick={closeModal}></div>
}

export default ModalOverlay
