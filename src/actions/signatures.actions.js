import { push } from 'connected-react-router'
import { getUnixTime } from 'date-fns'

import types from '../constants/actions.types.constants'
import service from '../services/dexie/signatures.dexie.service'

const create = signature => {
  return async dispatch => {
    dispatch(createBegin())
    signature.updatedAt = signature.createdAt = getUnixTime(new Date())
    const result = await service.create(signature)
    if (result instanceof TypeError) {
      dispatch(createError(result.message))
    } else {
      dispatch(createSuccess(signature))
      dispatch(push('/signatures'))
    }
  }
}

const createBegin = () => ({
  type: types.CREATE_SIGNATURE_BEGIN
})

const createSuccess = signature => ({
  type: types.CREATE_SIGNATURE_SUCCESS,
  signature
})

const createError = error => ({
  type: types.CREATE_SIGNATURE_ERROR,
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
      dispatch(push('/signatures'))
    }
  }
}

const destroyBegin = () => ({
  type: types.DESTROY_SIGNATURE_BEGIN
})

const destroySuccess = id => ({
  type: types.DESTROY_SIGNATURE_SUCCESS,
  id
})

const destroyError = error => ({
  type: types.DESTROY_SIGNATURE_ERROR,
  error
})

const getAll = () => {
  return async dispatch => {
    dispatch(getAllBegin())
    const result = await service.getAll()
    if (result instanceof TypeError) {
      dispatch(getAllError(result.message))
    } else {
      dispatch(getAllSuccess(result))
    }
  }
}

const getAllBegin = () => ({
  type: types.GET_ALL_SIGNATURES_BEGIN
})

const getAllSuccess = signatures => ({
  type: types.GET_ALL_SIGNATURES_SUCCESS,
  signatures
})

const getAllError = error => ({
  type: types.GET_ALL_SIGNATURES_ERROR,
  error
})

const getOne = id => {
  return async dispatch => {
    dispatch(getOneBegin())
    const result = await service.getOne(id)
    if (result instanceof TypeError) {
      dispatch(getOneError(result.message))
    } else {
      dispatch(getOneSuccess(id, result))
    }
  }
}

const getOneBegin = () => ({
  type: types.GET_ONE_SIGNATURE_BEGIN
})

const getOneSuccess = (id, signature) => ({
  type: types.GET_ONE_SIGNATURE_SUCCESS,
  id,
  signature
})

const getOneError = error => ({
  type: types.GET_ONE_SIGNATURE_ERROR,
  error
})

const setValue = (name, value) => ({
  type: types.SET_SIGNATURE_VALUE,
  name,
  value
})

const reset = () => ({
  type: types.RESET_SIGNATURE
})

const update = (id, signature) => {
  return async dispatch => {
    dispatch(updateBegin())
    signature.updatedAt = getUnixTime(new Date())
    const result = await service.update(id, signature)
    if (result instanceof TypeError) {
      dispatch(updateError(result.message))
    } else {
      dispatch(updateSuccess(id, signature))
      dispatch(push('/signatures'))
    }
  }
}

const updateBegin = () => ({
  type: types.UPDATE_SIGNATURE_BEGIN
})

const updateSuccess = (id, signature) => ({
  type: types.UPDATE_SIGNATURE_SUCCESS,
  id,
  signature
})

const updateError = error => ({
  type: types.UPDATE_SIGNATURE_ERROR,
  error
})

export default {
  create,
  destroy,
  getAll,
  getOne,
  reset,
  setValue,
  update
}
