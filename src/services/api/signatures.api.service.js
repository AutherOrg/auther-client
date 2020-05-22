import helper from './helper.api'

const route = `${process.env.REACT_APP_API}/signatures`

const create = async data => {
  try {
    const response = await window.fetch(
      route, {
        method: 'POST',
        headers: helper.setHeadersWithToken(),
        body: JSON.stringify(data)
      })
    const result = await response.json()
    return result
  } catch (e) {
    return e
  }
}

const getMany = async () => {
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

const getOne = async id => {
  try {
    const response = await window.fetch(
      `${route}/${id}`, {
        method: 'GET',
        headers: helper.setHeadersWithToken()
      })
    const result = await response.json()
    return result
  } catch (e) {
    return e
  }
}

const destroy = async id => {
  try {
    const response = await window.fetch(
      `${route}/${id}`, {
        method: 'DELETE',
        headers: helper.setHeadersWithToken()
      })
    const result = await response.json()
    return result
  } catch (e) {
    return e
  }
}

const update = async (id, data) => {
  try {
    const response = await window.fetch(
      `${route}/${id}`, {
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
  create,
  destroy,
  getMany,
  getOne,
  update
}
