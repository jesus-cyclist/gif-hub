import { useState } from 'react'

const useForm = (inputValues = {}) => {
  const [values, setValues] = useState(inputValues)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  return { values, setValues, handleChange }
}

export default useForm
