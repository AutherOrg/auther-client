import helper from './helper.api'

const route = `${process.env.REACT_APP_API}/issuer`

const get = async () => {
  try {
    const response = await window.fetch(
      route, {
        method: 'GET',
        headers: helper.setHeadersWithToken()
      })
    const result = await response.json()
    return result
  } catch (e) {
    return e
  }
}

const update = async data => {
  try {
    const response = await window.fetch(
      route, {
        method: 'PATCH',
        headers: helper.setHeadersWithToken(),
        body: JSON.stringify(data)
      })
    const result = await response.json()
    return result
  } catch (e) {
    return e
  }
}

export default {
  get,
  update
}
