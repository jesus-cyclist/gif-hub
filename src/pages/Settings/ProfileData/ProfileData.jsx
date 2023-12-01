import serverService from '@api/ServerService'
import CustomButton from '@components/UI/CustomButton/CustomButton'
import CustomInput from '@components/UI/CustomInput/CustomInput'
import Hint from '@components/UI/Hint/Hint'
import { EMAIL, NAME, PASSWORD } from '@constants/input'
import { useFetching } from '@hooks/useFetching'
import useForm from '@hooks/useForm'
import { selectUser } from '@services/selectors'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './ProfileData.module.css'

const ProfileData = () => {
  const user = useSelector(selectUser)
  const [hintValue, setHintValue] = useState('')
  const { values, setValues, handleChange } = useForm({
    [EMAIL]: '',
    [PASSWORD]: '',
    [NAME]: '',
  })
  const [fetchChangeUserData] = useFetching(
    async (email, password, name, userId) => {
      await serverService
        .changeUserData(email, password, name, userId)
        .then((res) => {
          setHintValue(res.data.response)
        })
    }
  )

  useEffect(() => {
    if (user) {
      const { email, password, name } = user.userData
      setValues({
        ...values,
        [EMAIL]: email,
        [PASSWORD]: password,
        [NAME]: name,
      })
    }
  }, [user])

  const isUserDataChanged = () => {
    return Object.keys(values).some((key) => values[key] !== user.userData[key])
  }

  const handleFormSend = (e) => {
    e.preventDefault()
    if (!isUserDataChanged()) {
      setHintValue('The data has not been changed')
      return
    }
    fetchChangeUserData(
      values[EMAIL],
      values[PASSWORD],
      values[NAME],
      user.userData.id
    )
  }

  return (
    <div className={styles.container}>
      <form>
        <div className={styles.inputWrapper}>
          <CustomInput
            value={values[EMAIL]}
            placeholder={'E-mail'}
            name={EMAIL}
            onChange={handleChange}
            deleteValue={(e) => setValues({ ...values, [EMAIL]: '' })}
          />
        </div>
        <div className={styles.inputWrapper}>
          <CustomInput
            value={values[PASSWORD]}
            placeholder={'Password'}
            name={PASSWORD}
            onChange={handleChange}
            deleteValue={(e) => setValues({ ...values, [PASSWORD]: '' })}
          />
        </div>
        <div className={styles.inputWrapper}>
          <CustomInput
            value={values[NAME]}
            placeholder={'Name'}
            name={NAME}
            onChange={handleChange}
            deleteValue={(e) => setValues({ ...values, [NAME]: '' })}
          />
        </div>
        <div className={styles.hintWrapper}>
          <Hint hintValue={hintValue} setHintValue={setHintValue} />
        </div>

        <div className={styles.buttonWrapper}>
          <CustomButton
            label={'Confirm'}
            alignment={'right'}
            onClick={handleFormSend}
          />
        </div>
      </form>
    </div>
  )
}

export default ProfileData
