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
        }),
        mode: 'no-cors'
      }
    )
    return await response.json()
  } catch (e) {
    return e
  }
}

const destroy = async id => {
  try {
    const response = await window.fetch(
      `${route}/${Number(id)}`, {
        method: 'DELETE',
        headers: helper.setHeadersWithToken(),
        mode: 'no-cors'
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
        headers: helper.setHeadersWithToken(),
        mode: 'no-cors'
      }
    )
    return await response.json()
  } catch (e) {
    return e
  }
}

const getOne = async id => {
  try {
    const response = await window.fetch(
      `${route}/${Number(id)}`, {
        method: 'GET',
        headers: helper.setHeadersWithToken(),
        mode: 'no-cors'
      }
    )
    return await response.json()
  } catch (e) {
    return e
  }
}

const getShared = async uuid => {
  try {
    const response = await window.fetch(
      `${route}/shared/${uuid}`, {
        method: 'GET',
        headers: helper.setHeaders(),
        mode: 'no-cors'
      }
    )
    return await response.json()
  } catch (e) {
    return e
  }
}

const update = async (id, data) => {
  try {
    const response = await window.fetch(
      `${route}/${Number(id)}`, {
        method: 'PATCH',
        headers: helper.setHeadersWithToken(),
        body: JSON.stringify(data),
        mode: 'no-cors'
      }
    )
    return await response.json()
  } catch (e) {
    return e
  }
}

export default {
  create,
  destroy,
  getAll,
  getOne,
  getShared,
  update
}
