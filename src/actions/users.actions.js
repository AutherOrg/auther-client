import { push } from 'connected-react-router'

import types from '../constants/actions.types.constants'
import service from '../services/auther-api/users.auther-api.service'

const create = user => {
  return async dispatch => {
    dispatch(createBegin())
    const result = await service.create(user)
    if (result instanceof TypeError) {
      dispatch(createError(result.message))
    } else {
      dispatch(createSuccess(result.user))
      dispatch(push('/users'))
    }
  }
}

const createBegin = () => ({
  type: types.CREATE_USER_BEGIN
})

const createSuccess = user => ({
  type: types.CREATE_USER_SUCCESS,
  user
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

const getAll = params => {
  return async dispatch => {
    dispatch(getAllBegin())
    const result = await service.getAll(params)
    if (result instanceof TypeError) {
      dispatch(getAllError(result.message))
    } else {
      dispatch(getAllSuccess(result))
    }
  }
}

const getAllBegin = () => ({
  type: types.GET_USERS_BEGIN
})

const getAllSuccess = users => ({
  type: types.GET_USERS_SUCCESS,
  users
})

const getAllError = error => ({
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

const getOneSuccess = user => ({
  type: types.GET_USER_SUCCESS,
  user
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

const update = (id, user) => {
  return async dispatch => {
    dispatch(updateBegin())
    const result = await service.update(id, user)
    if (result instanceof TypeError) {
      dispatch(updateError(result.message))
    } else {
      dispatch(updateSuccess(id, user))
      dispatch(push('/users'))
    }
  }
}

const updateBegin = () => ({
  type: types.UPDATE_USER_BEGIN
})

const updateSuccess = user => ({
  type: types.UPDATE_USER_SUCCESS,
  user
})

const updateError = error => ({
  type: types.UPDATE_USER_ERROR,
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
