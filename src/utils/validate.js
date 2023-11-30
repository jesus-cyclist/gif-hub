export function validateEmail(field = '') {
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  return emailPattern.test(field)
}

export function validateEmptyInput(field = '') {
  return !!field.length ? true : false
}
