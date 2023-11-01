import React, { useRef, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useClickOutSide } from '../../../hooks/useClickOutside'
import CustomButton from '../CustomButton/CustomButton'
import styles from './DropDown.module.css'

const DropDown = (props) => {
  const { icon, list } = props
  const dropdownRef = useRef(null)
  const [isDropDawnActive, setIsDropDawnActive] = useState(false)

  useClickOutSide(dropdownRef, () => {
    if (isDropDawnActive) setIsDropDawnActive(false)
  })

  const handleDropDawn = () => {
    setIsDropDawnActive(!isDropDawnActive)
  }

  //   return (
  //     <div className={styles.dropDawn} ref={dropdownRef}>
  //       <div className={styles.dropDawnButton}>
  //         <CustomButton
  //           type={'button'}
  //           icon={icon}
  //           isScalabale={false}
  //           onClick={handleDropDawn}
  //         />
  //       </div>
  //       {isDropDawnActive && (
  //         <ul className={styles.dropDawnMenu}>
  //           {list.map((item) => (
  //             <>
  //               <li
  //                 className={styles.dropDawnItem}
  //                 key={uniqid()}
  //                 onClick={item.onClick}
  //               >
  //                 {item.icon}
  //                 <span className={styles.dropDawnItemText}>{item.title}</span>
  //               </li>
  //             </>
  //           ))}
  //         </ul>
  //       )}
  //     </div>
  //   )
  // }

  return (
    <div className={styles.dropDawn} ref={dropdownRef}>
      <div className={styles.dropDawnButton}>
        <CustomButton
          type={'button'}
          icon={icon}
          isScalabale={false}
          onClick={handleDropDawn}
        />
      </div>
      {isDropDawnActive && (
        <ul className={styles.dropDawnMenu}>
          <TransitionGroup>
            {list.map((item) => (
              <CSSTransition
                key={item.title}
                nodeRef={item.ref}
                timeout={1500}
                classNames={{
                  enter: styles.dropDawnItemEnter,
                  enterActive: styles.dropDawnItemEnterActive,
                  exit: styles.dropDawnItemExit,
                  exitActive: styles.dropDawnItemExitActive,
                }}
              >
                <li className={styles.dropDawnItem} onClick={item.onClick}>
                  {item.icon}
                  <span className={styles.dropDawnItemText}>{item.title}</span>
                </li>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ul>
      )}
    </div>
  )
}

export default DropDown
