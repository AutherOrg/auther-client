import types from '../constants/actions.types.constants'
import service from '../services/dexie/revoked.dexie.service'

const cancel = () => ({
  type: types.CANCEL_REVOKED
})

const create = data => {
  return async dispatch => {
    dispatch(createBegin())
    const result = await service.create(data)
    if (result instanceof TypeError) {
      dispatch(createError(result.message))
    } else {
      dispatch(createSuccess(data))
    }
  }
}

const createBegin = () => ({
  type: types.CREATE_REVOKED_BEGIN
})

const createSuccess = revoked => ({
  type: types.CREATE_REVOKED_SUCCESS,
  revoked
})

const createError = error => ({
  type: types.CREATE_REVOKED_ERROR,
  error
})

const destroy = id => {
  return async dispatch => {
    dispatch(destroyBegin())
    const result = await service.destroy(id)
    if (result instanceof TypeError) {
      dispatch(destroyError(result.message))
    } else {
      dispatch(destroySuccess(id))
    }
  }
}

const destroyBegin = () => ({
  type: types.DESTROY_REVOKED_BEGIN
})

const destroySuccess = id => ({
  type: types.DESTROY_REVOKED_SUCCESS,
  id
})

const destroyError = error => ({
  type: types.DESTROY_REVOKED_ERROR,
  error
})

const get = () => {
  return async dispatch => {
    dispatch(getBegin())
    const result = await service.get()
    if (result instanceof TypeError) {
      dispatch(getError(result.message))
    } else {
      dispatch(getSuccess(result))
    }
  }
}

const getBegin = () => ({
  type: types.GET_REVOKED_BEGIN
})

const getSuccess = revoked => ({
  type: types.GET_REVOKED_SUCCESS,
  revoked
})

const getError = error => ({
  type: types.GET_REVOKED_ERROR,
  error
})

const reset = () => ({
  type: types.RESET_REVOKED
})

const set = (certificateId, revocationReason) => ({
  type: types.SET_REVOKED,
  certificateId,
  revocationReason
})

export default {
  cancel,
  create,
  destroy,
  get,
  reset,
  set
}
