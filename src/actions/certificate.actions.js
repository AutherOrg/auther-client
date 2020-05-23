import { push } from 'connected-react-router'

import types from '../constants/actions.types.constants'
import service from '../services/api/certificates.api.service'

const destroy = id => {
  return async dispatch => {
    dispatch(destroyBegin())
    const result = await service.destroy(id)
    if (result instanceof TypeError) {
      dispatch(destroyError(result.message))
    } else {
      dispatch(destroySuccess())
      dispatch(push('/certificates/my'))
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
    const result = await service.getOne(id, { full: true })
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

const getSuccess = data => ({
  type: types.GET_CERTIFICATE_SUCCESS,
  data
})

const getError = error => ({
  type: types.GET_CERTIFICATE_ERROR,
  error
})

const getShared = sharingUuid => {
  return async dispatch => {
    dispatch(getSharedBegin())
    const result = await service.getShared(sharingUuid, { withJson: true })
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

const getSharedSuccess = data => ({
  type: types.GET_SHARED_CERTIFICATE_SUCCESS,
  data
})

const getSharedError = error => ({
  type: types.GET_SHARED_CERTIFICATE_ERROR,
  error
})

const update = (id, data) => {
  return async dispatch => {
    dispatch(updateBegin())
    const result = await service.update(id, data)
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

const updateSuccess = data => ({
  type: types.UPDATE_CERTIFICATE_SUCCESS,
  data
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
  getShared,
  update,
  reset
}
