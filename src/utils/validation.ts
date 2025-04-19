export const getLevelPassword = (password: string) => {
  const lengtLevelLow = Number(password.length >= 6)
  const lengtLevelHigh = Number(password.length >= 8)
  const hasLetters = Number(/[a-zA-Z]/.test(password))
  const hasUpper = Number(/[A-Z]/.test(password))
  const hasLower = Number(/[a-z]/.test(password))
  const hasNumbers = Number(/[0-9]/.test(password))
  const hasSpecial = Number(/[!@#$%^&*(),.?":{}|<>]/.test(password))
  const level = hasLetters + hasUpper + hasLower + hasNumbers + hasSpecial + lengtLevelLow + lengtLevelHigh

  if (level <= 4) {
    return "low"
  } else if (level <= 6) {
    return "medium"
  } else {
    return "high"
  }
}

export const getMessageCorrectMail = (email: string) => {
  const correctMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (email.length === 0) {
    return "The field is empty"
  } else if (!correctMail.test(email)) {
    return "Incorrect mail input"
  } else if (email.length > 120) {
    return "Max of 120 characters"
  } else {
    return ""
  }
}

export const getMessageCorrectLogin = (login: string) => {
  if (login.length === 0) {
    return "The field is empty"
  } else if (login.length < 2) {
    return "Min of 2 characters"
  } else if (login.length > 25) {
    return "Max of 25 characters"
  } else {
    return ""
  }
}
