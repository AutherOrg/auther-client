import helper from './helper.api'

const route = `${process.env.REACT_APP_API}/blockcerts`

const getIssuer = async () => {
  try {
    const response = await window.fetch(
      `${route}/issuer`, {
        method: 'GET',
        headers: helper.setHeaders()
      }
    )
    const result = await response.json()
    return result
  } catch (e) {
    return e
  }
}

const getRevocations = async () => {
  try {
    const response = await window.fetch(
      `${route}/revocations`, {
        method: 'GET',
        headers: helper.setHeaders()
      }
    )
    const result = await response.json()
    return result
  } catch (e) {
    return e
  }
}

export default {
  getIssuer,
  getRevocations
}
