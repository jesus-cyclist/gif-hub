import React, { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { getClassNamesForReactTransition } from '@utils/getClassNamesForTransition'
import styles from './Hint.module.css'

const Hint = ({ hintValue = '', setHintValue }) => {
  const [isHintActive, setIsHintActive] = useState(false)
  const hintRef = useRef(null)

  useEffect(() => {
    isHintActive && setTimeout(() => setIsHintActive(false), 4000)
  }, [isHintActive])

  useEffect(() => {
    if (hintValue) setIsHintActive(true)
  }, [hintValue])

  return (
    <CSSTransition
      in={isHintActive}
      timeout={500}
      nodeRef={hintRef}
      classNames={getClassNamesForReactTransition(styles, 'hint')}
      onExited={() => setHintValue('')}
    >
      {(state) => (
        <span className={styles.hint} ref={hintRef}>
          {hintValue}
        </span>
      )}
    </CSSTransition>
  )
}

export default Hint
