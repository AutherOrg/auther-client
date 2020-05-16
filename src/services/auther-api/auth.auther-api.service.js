import helper from './helpers/headers.auther-api.helper'

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

const loginFromToken = async () => {
  try {
    const response = await window.fetch(
      `${route}`, {
        method: 'GET',
        headers: helper.setHeadersWithToken()
      }
    )
    let result
    if (response.ok) {
      result = await response.json()
    } else {
      result = {
        expiredToken: true
      }
    }
    return result
  } catch (e) {
    return e
  }
}

const setPassword = async password => {
  try {
    const response = await window.fetch(
      `${route}/password/set`, {
        method: 'POST',
        headers: helper.setHeadersWithToken(),
        body: JSON.stringify({
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

const resetPassword = async email => {
  try {
    const response = await window.fetch(
      `${route}/password/reset`, {
        method: 'POST',
        headers: helper.setHeaders(),
        body: JSON.stringify({
          email
        })
      }
    )
    const result = await response.json()
    return result
  } catch (e) {
    return e
  }
}

const resetPasswordProcess = async () => {
  try {
    const response = await window.fetch(
      `${route}/password/reset`, {
        method: 'GET',
        headers: helper.setHeadersWithToken()
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
  loginFromToken,
  setPassword,
  resetPassword,
  resetPasswordProcess
}
