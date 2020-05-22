import { push } from 'connected-react-router'

import types from '../constants/actions.types.constants'
import service from '../services/api/signatures.api.service'

const create = data => {
  return async dispatch => {
    dispatch(createBegin())
    const result = await service.create(data)
    if (result instanceof TypeError) {
      dispatch(createError(result.message))
    } else {
      dispatch(createSuccess(result))
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
  type: types.GET_ALL_SIGNATURES_BEGIN
})

const getManySuccess = signatures => ({
  type: types.GET_ALL_SIGNATURES_SUCCESS,
  signatures
})

const getManyError = error => ({
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

const update = (id, data) => {
  return async dispatch => {
    dispatch(updateBegin())
    const result = await service.update(id, data)
    if (result instanceof TypeError) {
      dispatch(updateError(result.message))
    } else {
      dispatch(updateSuccess(id, result))
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
  getMany,
  getOne,
  reset,
  setValue,
  update
}
