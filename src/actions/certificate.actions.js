import { push } from 'connected-react-router'

import types from '../constants/actions.types.constants'
import apiService from '../services/openblockcerts-api/certificates.openblockcerts-api.service'
import dexieService from '../services/dexie/certificates.dexie.service'

const destroy = id => {
  return async dispatch => {
    dispatch(destroyBegin())
    const result = await apiService.destroy(id)
    if (result instanceof TypeError) {
      dispatch(destroyError(result.message))
    } else {
      dispatch(destroySuccess())
      dispatch(push('/certificates'))
    }
  }
}

const destroyBegin = () => ({
  type: types.DESTROY_CERTIFICATE_BEGIN
})

const destroySuccess = () => ({
  type: types.DESTROY_CERTIFICATE_SUCCESS
})

const destroyError = error => ({
  type: types.DESTROY_CERTIFICATE_ERROR,
  error
})

const get = id => {
  return async dispatch => {
    dispatch(getBegin())
    const result = await apiService.getOne(id)
    if (result instanceof TypeError) {
      dispatch(getError(result.message))
    } else {
      dispatch(getSuccess(result))
    }
  }
}

const getBegin = () => ({
  type: types.GET_CERTIFICATE_BEGIN
})

const getSuccess = certificate => ({
  type: types.GET_CERTIFICATE_SUCCESS,
  certificate
})

const getError = error => ({
  type: types.GET_CERTIFICATE_ERROR,
  error
})

const getFromDexie = id => {
  return async dispatch => {
    dispatch(getBegin())
    const result = await dexieService.getOne(id)
    if (result instanceof TypeError) {
      dispatch(getError(result.message))
    } else {
      dispatch(getSuccess(result))
    }
  }
}

const getShared = uuid => {
  return async dispatch => {
    dispatch(getSharedBegin())
    const result = await apiService.getShared(uuid)
    if (result instanceof TypeError) {
      dispatch(getSharedError(result.message))
    } else if (result.error) {
      dispatch(getSharedError(result.error))
    } else {
      dispatch(getSharedSuccess(result))
    }
  }
}

const getSharedBegin = () => ({
  type: types.GET_SHARED_CERTIFICATE_BEGIN
})

const getSharedSuccess = certificate => ({
  type: types.GET_SHARED_CERTIFICATE_SUCCESS,
  uuid: certificate.uuid,
  json: certificate.json
})

const getSharedError = error => ({
  type: types.GET_SHARED_CERTIFICATE_ERROR,
  error
})

const update = (id, data) => {
  return async dispatch => {
    dispatch(updateBegin())
    const result = await apiService.update(id, data)
    if (result instanceof TypeError) {
      dispatch(updateError(result.message))
    } else {
      dispatch(updateSuccess(result))
    }
  }
}

const updateBegin = () => ({
  type: types.UPDATE_CERTIFICATE_BEGIN
})

const updateSuccess = certificate => ({
  type: types.UPDATE_CERTIFICATE_SUCCESS,
  certificate
})

const updateError = error => ({
  type: types.UPDATE_CERTIFICATE_ERROR,
  error
})

const reset = () => ({
  type: types.RESET_CERTIFICATE
})

export default {
  destroy,
  get,
  getFromDexie,
  getShared,
  update,
  reset
}
