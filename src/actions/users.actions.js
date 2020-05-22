import { push } from 'connected-react-router'

import types from '../constants/actions.types.constants'
import service from '../services/api/users.api.service'

const create = user => {
  return async dispatch => {
    dispatch(createBegin())
    const result = await service.create(user)
    if (result instanceof TypeError) {
      dispatch(createError(result.message))
    } else {
      dispatch(createSuccess(result))
      dispatch(push('/users'))
    }
  }
}

const createBegin = () => ({
  type: types.CREATE_USER_BEGIN
})

const createSuccess = data => ({
  type: types.CREATE_USER_SUCCESS,
  data
})

const createError = error => ({
  type: types.CREATE_USER_ERROR,
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
      dispatch(push('/users'))
    }
  }
}

const destroyBegin = () => ({
  type: types.DESTROY_USER_BEGIN
})

const destroySuccess = id => ({
  type: types.DESTROY_USER_SUCCESS,
  id
})

const destroyError = error => ({
  type: types.DESTROY_USER_ERROR,
  error
})

const getMany = params => {
  return async dispatch => {
    dispatch(getManyBegin())
    const result = await service.getMany(params)
    if (result instanceof TypeError) {
      dispatch(getManyError(result.message))
    } else {
      dispatch(getManySuccess(result))
    }
  }
}

const getManyBegin = () => ({
  type: types.GET_USERS_BEGIN
})

const getManySuccess = data => ({
  type: types.GET_USERS_SUCCESS,
  data
})

const getManyError = error => ({
  type: types.GET_USERS_ERROR,
  error
})

const getOne = id => {
  return async dispatch => {
    dispatch(getOneBegin())
    const result = await service.getOne(id)
    if (result instanceof TypeError) {
      dispatch(getOneError(result.message))
    } else {
      dispatch(getOneSuccess(result))
    }
  }
}

const getOneBegin = () => ({
  type: types.GET_USER_BEGIN
})

const getOneSuccess = data => ({
  type: types.GET_USER_SUCCESS,
  data
})

const getOneError = error => ({
  type: types.GET_USER_ERROR,
  error
})

const setValue = (name, value) => ({
  type: types.SET_USER_VALUE,
  name,
  value
})

const reset = () => ({
  type: types.RESET_USERS
})

const update = (id, data) => {
  return async dispatch => {
    dispatch(updateBegin())
    const result = await service.update(id, data)
    if (result instanceof TypeError) {
      dispatch(updateError(result.message))
    } else {
      dispatch(updateSuccess(id, data))
      dispatch(push('/users'))
    }
  }
}

const updateBegin = () => ({
  type: types.UPDATE_USER_BEGIN
})

const updateSuccess = data => ({
  type: types.UPDATE_USER_SUCCESS,
  data
})

const updateError = error => ({
  type: types.UPDATE_USER_ERROR,
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
