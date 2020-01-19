import helper from './helpers/auth.blockcerts-api.helper'

const route = process.env.REACT_APP_API + 'auth/local'

const login = async (email, password) => {
  try {
    const response = await window.fetch(
      route, {
        method: 'POST',
        headers: helper.setHeaders(),
        body: JSON.stringify({
          user: {
            email,
            password
          }
        })
      }
    )
    const result = await response.json()
    return result
  } catch (e) {
    return e
  }
}

const loginFromPermanentToken = async permanentToken => {
  try {
    const response = await window.fetch(
      `${route}/permanent`, {
        method: 'POST',
        headers: helper.setHeaders(),
        body: JSON.stringify({
          permanentToken
        })
      }
    )
    const result = await response.json()
    return result
  } catch (e) {
    return e
  }
}

const setPassword = async (email, password) => {
  try {
    const response = await window.fetch(
      `${route}/password/set`, {
        method: 'POST',
        headers: helper.setHeaders(),
        body: JSON.stringify({
          email,
          password
        })
      }
    )
    const result = await response.json()
    return result
  } catch (e) {
    return e
  }
}

const validatePassword = async passwordToken => {
  try {
    const response = await window.fetch(
      `${route}/password/validate`, {
        method: 'POST',
        headers: helper.setHeaders(),
        body: JSON.stringify({
          passwordToken
        })
      }
    )
    const result = await response.json()
    return result
  } catch (e) {
    return e
  }
}

export default {
  login,
  loginFromPermanentToken,
  setPassword,
  validatePassword
}
