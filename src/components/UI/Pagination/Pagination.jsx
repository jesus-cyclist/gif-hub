import React from 'react'
import { ReactComponent as Left } from '../../../assets/svg/chevron-left.svg'
import { ReactComponent as Right } from '../../../assets/svg/chevron-right.svg'
import CustomButton from '../CustomButton/CustomButton'
import styles from './Pagination.module.css'

const Pagination = (props) => {
  const { totalPageCount, currentPage, changePage } = props
  if (!totalPageCount) return

  return (
    <div className={styles.container}>
      <div className={styles.prev}>
        <CustomButton
          icon={<Left />}
          onClick={() => changePage(currentPage - 1)}
          alignment={'left'}
        />
      </div>
      {currentPage}/{totalPageCount}
      <div className={styles.forw}>
        <CustomButton
          icon={<Right />}
          onClick={() => changePage(currentPage + 1)}
          alignment={'right'}
        />
      </div>
    </div>
  )
}

export default Pagination
