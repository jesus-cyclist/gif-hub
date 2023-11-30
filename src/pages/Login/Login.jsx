import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import CustomButton from '../../components/UI/CustomButton/CustomButton'
import CustomInput from '../../components/UI/CustomInput/CustomInput'
import { EMAIL, PASSWORD } from '../../constants/input'
import { useFetching } from '../../hooks/useFetching'
import useForm from '../../hooks/useForm'
import { validateEmail, validateEmptyInput } from '../../utils/validate'
import styles from './Login.module.css'
import serverService from '../../API/ServerService'
import Hint from '../../components/UI/Hint/Hint'

const Login = () => {
  const { values, setValues, handleChange } = useForm({
    [PASSWORD]: 'qwerty',
    [EMAIL]: 'semen@mail.ru',
  })
  const [hintValue, setHintValue] = useState('')

  const [fetchLogin] = useFetching(async (form) => {
    await serverService.login(form).then((res) => {
      console.log(res)
      return res
    })
  })

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateEmail(values[EMAIL])) {
      setHintValue('Enter your email')
      return
    }
    if (!validateEmptyInput(values[PASSWORD])) {
      setHintValue('Enter your password')
      return
    }

    fetchLogin(e.target)
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.container} onSubmit={handleSubmit} noValidate>
        <h2 className={styles.title}>Log In</h2>
        <div className={styles.email}>
          <CustomInput
            placeholder={'Email'}
            name={EMAIL}
            onChange={handleChange}
            value={values[EMAIL]}
            type={EMAIL}
            deleteValue={() => setValues({ ...values, [EMAIL]: '' })}
          />
        </div>
        <div className={styles.password}>
          <CustomInput
            placeholder={'Password'}
            name={PASSWORD}
            onChange={handleChange}
            value={values[PASSWORD]}
            type={PASSWORD}
            deleteValue={() => setValues({ ...values, [PASSWORD]: '' })}
          />
        </div>
        <Hint hintValue={hintValue} setHintValue={setHintValue} />
        <CustomButton label={'Log in'} type={'submit'} alignment={'center'} />
      </form>
    </div>
  )
}

export default Login
