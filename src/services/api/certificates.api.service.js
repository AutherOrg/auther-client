import qs from 'qs'

import helper from './helper.api'

const route = `${process.env.REACT_APP_API}/certificates`

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

const destroy = async id => {
  try {
    const response = await window.fetch(
      `${route}/${Number(id)}`, {
        method: 'DELETE',
        headers: helper.setHeadersWithToken()
      }
    )
    return await response.json()
  } catch (e) {
    return e
  }
}

const getMany = async params => {
  try {
    let uri = route
    if (params) {
      uri = `${route}?${qs.stringify(params)}`
    }
    const response = await window.fetch(
      uri, {
        method: 'GET',
        headers: helper.setHeadersWithToken()
      }
    )
    return await response.json()
  } catch (e) {
    return e
  }
}

const getOne = async (id, params) => {
  try {
    let uri = `${route}/${Number(id)}`
    if (params) {
      uri = `${uri}?${qs.stringify(params)}`
    }
    const response = await window.fetch(
      uri, {
        method: 'GET',
        headers: helper.setHeadersWithToken()
      }
    )
    return await response.json()
  } catch (e) {
    return e
  }
}

const getShared = async sharingUuid => {
  try {
    const response = await window.fetch(
      `${route}/shared/${sharingUuid}`, {
        method: 'GET',
        headers: helper.setHeadersWithToken()
      }
    )
    return await response.json()
  } catch (e) {
    return e
  }
}

const reSendEmail = async id => {
  try {
    const response = await window.fetch(
      `${route}/${Number(id)}/resendemail`, {
        method: 'GET',
        headers: helper.setHeadersWithToken()
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
        body: JSON.stringify(data)
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
  getMany,
  getOne,
  getShared,
  reSendEmail,
  update
}
