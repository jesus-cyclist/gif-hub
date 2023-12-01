import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import serverService from '@api/ServerService'
import CustomButton from '@components/UI/CustomButton/CustomButton'
import CustomInput from '@components/UI/CustomInput/CustomInput'
import Hint from '@components/UI/Hint/Hint'
import { EMAIL, NAME, PASSWORD } from '@constants/input'
import { loginPagePath } from '@constants/path'
import { useFetching } from '@hooks/useFetching'
import useForm from '@hooks/useForm'
import { logIn } from '@services/reducers/user'
import { validateEmail, validateEmptyInput } from '@utils/validate'
import styles from './Register.module.css'

const Register = () => {
  const { values, setValues, handleChange } = useForm({
    [PASSWORD]: 'qwerty',
    [EMAIL]: 'semen@mail.ru',
    [NAME]: 'semen',
  })
  const [hintValue, setHintValue] = useState('')

  const [fetchRegister] = useFetching(async (form) => {
    await serverService.register(form).then((res) => {
      console.log(res.data)
      res.data.success
        ? dispatch(logIn(res.data.response))
        : setHintValue(res.data.response)
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

    if (!validateEmptyInput(values[NAME])) {
      setHintValue('Enter your name')
      return
    }

    fetchRegister(e.target)
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
        <div className={styles.name}>
          <CustomInput
            placeholder={'Name'}
            name={NAME}
            onChange={handleChange}
            value={values[NAME]}
            type={'text'}
            deleteValue={() => setValues({ ...values, [PASSWORD]: '' })}
          />
        </div>
        <Hint hintValue={hintValue} setHintValue={setHintValue} />
        <div className={styles.loginButtonWrapper}>
          <CustomButton
            label={'Register'}
            type={'submit'}
            alignment={'center'}
            dataTestId={'login-button'}
          />
        </div>

        <span className={styles.registerText}>
          Already registered?
          <NavLink to={loginPagePath} className={styles.registerLink}>
            Enter
          </NavLink>
        </span>
      </form>
    </div>
  )
}

export default Register
