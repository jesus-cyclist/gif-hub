import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import CustomButton from '../../components/UI/CustomButton/CustomButton'
import CustomInput from '../../components/UI/CustomInput/CustomInput'
import { EMAIL, PASSWORD } from '../../constants/input'
import useForm from '../../hooks/useForm'
import { fetchLogin } from '../../services/reducers/user'
import { validateEmail, validateEmptyInput } from '../../utils/validate'
import styles from './Login.module.css'
import { serverUrl } from '../../constants/url'

const Login = () => {
  const { values, handleChange } = useForm({
    [PASSWORD]: 'qwerty',
    [EMAIL]: 'semen@mail.ru',
  })

  const dispatch = useDispatch()

  const [hint, setHint] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateEmail(values[EMAIL])) {
      return setHint('email')
    }
    if (!validateEmptyInput(values[PASSWORD])) {
      return setHint('password')
    }

    dispatch(fetchLogin({ email: values[EMAIL], password: values[PASSWORD] }))
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
            values={values[EMAIL]}
            type={EMAIL}
          />
        </div>
        <div className={styles.password}>
          <CustomInput
            placeholder={'Password'}
            name={PASSWORD}
            onChange={handleChange}
            values={values[PASSWORD]}
            type={PASSWORD}
          />
        </div>
        <CustomButton label={'Log in'} type={'submit'} alignment={'center'} />
        <span className={styles.hint}>{hint}</span>
      </form>

      {/* <button
        onClick={() =>
          fetch(`${serverUrl}/qwer`, { method: 'POST' })
            .then((res) =>
              res.ok ? res.json() : Promise.reject(`ERROR =>>${res.status}`)
            )
            .then((res) => console.log(res))
        }
      >
        /qwer
      </button>

      <button
        onClick={() =>
          fetch(`${serverUrl}/echo`, { method: 'POST' })
            .then((res) =>
              res.ok ? res.json() : Promise.reject(`ERROR =>>${res.status}`)
            )
            .then((res) => console.log(res))
        }
      >
        /echo
      </button>

      <button
        onClick={() =>
          fetch(`${serverUrl}/echo`, { method: 'POST' })
            .then((res) =>
              res.ok ? res.json() : Promise.reject(`ERROR =>>${res.status}`)
            )
            .then((res) => console.log(res))
        }
      >
        /echo
      </button> */}
    </div>
  )
}

export default Login
