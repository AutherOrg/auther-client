import types from '../constants/actions.types.constants'
import service from '../services/api/revocations.api.service'

const cancel = () => ({
  type: types.CANCEL_REVOCATION
})

const create = data => {
  return async dispatch => {
    dispatch(createBegin())
    const result = await service.create(data)
    if (result instanceof TypeError) {
      dispatch(createError(result.message))
    } else {
      dispatch(createSuccess(result))
    }
  }
}

const createBegin = () => ({
  type: types.CREATE_REVOCATION_BEGIN
})

const createSuccess = data => ({
  type: types.CREATE_REVOCATION_SUCCESS,
  data
})

const createError = error => ({
  type: types.CREATE_REVOCATION_ERROR,
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
  type: types.DESTROY_REVOCATION_BEGIN
})

const destroySuccess = id => ({
  type: types.DESTROY_REVOCATION_SUCCESS,
  id
})

const destroyError = error => ({
  type: types.DESTROY_REVOCATION_ERROR,
  error
})

const getMany = () => {
  return async dispatch => {
    dispatch(getManyBegin())
    const result = await service.getMany()
    if (result instanceof TypeError) {
      dispatch(getManyError(result.message))
    } else {
      dispatch(getManySuccess(result))
    }
  }
}

const getManyBegin = () => ({
  type: types.GET_MANY_REVOCATION_BEGIN
})

const getManySuccess = data => ({
  type: types.GET_MANY_REVOCATION_SUCCESS,
  data
})

const getManyError = error => ({
  type: types.GET_MANY_REVOCATION_ERROR,
  error
})

const reset = () => ({
  type: types.RESET_REVOCATIONS
})

const set = (certificateId, revocationReason) => ({
  type: types.SET_REVOCATION,
  certificateId,
  revocationReason
})

export default {
  cancel,
  create,
  destroy,
  getMany,
  reset,
  set
}
