import { push } from 'connected-react-router'
import { getUnixTime } from 'date-fns'

import types from '../constants/actions.types.constants'
import service from '../services/dexie/models.dexie.service'

const create = model => {
  return async dispatch => {
    dispatch(createBegin())
    try {
      model.updatedAt = model.createdAt = getUnixTime(new Date())
      const result = await service.create(model)
      if (result) {
        dispatch(createSuccess())
        dispatch(getAll())
        dispatch(push('/models'))
      }
    } catch (e) {
      dispatch(createError(e.message))
    }
  }
}

const createBegin = () => ({
  type: types.CREATE_MODEL_BEGIN
})

const createSuccess = () => ({
  type: types.CREATE_MODEL_SUCCESS
})

const createError = error => ({
  type: types.CREATE_MODEL_ERROR,
  error
})

const destroy = id => {
  return async dispatch => {
    dispatch(destroyBegin())
    try {
      await service.destroy(id)
      dispatch(destroySuccess())
      dispatch(getAll())
    } catch (e) {
      dispatch(destroyError(e.message))
    }
  }
}

const destroyBegin = () => ({
  type: types.DESTROY_MODEL_BEGIN
})

const destroySuccess = model => ({
  type: types.DESTROY_MODEL_SUCCESS
})

const destroyError = error => ({
  type: types.DESTROY_MODEL_ERROR,
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
  type: types.GET_ALL_MODELS_BEGIN
})

const getAllSuccess = models => ({
  type: types.GET_ALL_MODELS_SUCCESS,
  models
})

const getAllError = error => ({
  type: types.GET_ALL_MODELS_ERROR,
  error
})

const getOne = id => {
  return async dispatch => {
    dispatch(getOneBegin())
    try {
      const result = await service.getOne(id)
      dispatch(getOneSuccess())
      dispatch(setModel(result))
    } catch (e) {
      dispatch(getOneError(e.message))
    }
  }
}

const getOneBegin = () => ({
  type: types.GET_ONE_MODEL_BEGIN
})

const getOneSuccess = model => ({
  type: types.GET_ONE_MODEL_SUCCESS
})

const getOneError = error => ({
  type: types.GET_ONE_MODEL_ERROR,
  error
})

const setModel = model => ({
  type: types.SET_MODEL,
  model
})

const setValue = (name, value) => ({
  type: types.SET_MODEL_VALUE,
  name,
  value
})

const reset = () => ({
  type: types.RESET_MODEL
})

const update = (id, model) => {
  return async dispatch => {
    dispatch(updateBegin())
    try {
      model.updatedAt = getUnixTime(new Date())
      await service.update(id, model)
      dispatch(updateSuccess())
      dispatch(getAll())
      dispatch(push('/models'))
    } catch (e) {
      dispatch(updateError(e.message))
    }
  }
}

const updateBegin = () => ({
  type: types.UPDATE_MODEL_BEGIN
})

const updateSuccess = () => ({
  type: types.UPDATE_MODEL_SUCCESS
})

const updateError = error => ({
  type: types.UPDATE_MODEL_ERROR,
  error
})

export default {
  create,
  destroy,
  getAll,
  getOne,
  reset,
  setModel,
  setValue,
  update
}
