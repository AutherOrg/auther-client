import helper from './helpers/headers.openblockcerts-api.helper'

const route = process.env.REACT_APP_API + 'certificates'

const create = async certificate => {
  try {
    const response = await window.fetch(
      route, {
        method: 'POST',
        headers: helper.setHeadersWithToken(),
        body: JSON.stringify({
          certificate
        })
      }
    )
    return await response.json()
  } catch (e) {
    return e
  }
}

const getAll = async () => {
  try {
    const response = await window.fetch(
      route, {
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
  create,
  getAll
}
