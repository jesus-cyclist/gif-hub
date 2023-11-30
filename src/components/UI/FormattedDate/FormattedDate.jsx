import React, { useEffect, useState } from 'react'
import styles from './FormattedDate.module.css'

const FormattedDate = ({ date = null }) => {
  const [createdAt, setCreatedAt] = useState(null)
  useEffect(() => {
    const isDateValid =
      /(\d{2})-(\d{2})-(\d{2})\w(\d{2}):(\d{2}):(\d{2}).(\d{3})\w{1}$/i.test(
        date
      )

    isDateValid
      ? setCreatedAt(date.split(/[A-Z]/i)[0])
      : setCreatedAt('Invalid date')
  }, [date])
  return <span className={styles.date}>{createdAt}</span>
}

export default FormattedDate
