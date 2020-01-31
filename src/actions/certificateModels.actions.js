import { getUnixTime } from 'date-fns'

import types from '../constants/actions.types.constants'
import service from '../services/dexie/certificateModels.dexie.service'

const create = model => {
  return async dispatch => {
    dispatch(createBegin())
    try {
      model.updatedAt = model.createdAt = getUnixTime(new Date())
      const result = await service.create(model)
      if (result) {
        dispatch(createSuccess())
        dispatch(getAll())
      }
    } catch (e) {
      dispatch(createError(e.message))
    }
  }
}

const createBegin = () => ({
  type: types.CREATE_CERTIFICATEMODEL_BEGIN
})

const createSuccess = () => ({
  type: types.CREATE_CERTIFICATEMODEL_SUCCESS
})

const createError = error => ({
  type: types.CREATE_CERTIFICATEMODEL_ERROR,
  error
})

const getAll = () => {
  return async dispatch => {
    dispatch(getAllBegin())
    try {
      const result = await service.getAll()
      dispatch(getAllSuccess(result))
    } catch (e) {
      dispatch(getAllError(e.message))
    }
  }
}

const getAllBegin = () => ({
  type: types.GET_ALL_CERTIFICATEMODELS_BEGIN
})

const getAllSuccess = models => ({
  type: types.GET_ALL_CERTIFICATEMODELS_SUCCESS,
  models
})

const getAllError = error => ({
  type: types.GET_ALL_CERTIFICATEMODELS_ERROR,
  error
})

const getOne = id => {
  return async dispatch => {
    dispatch(getOneBegin())
    try {
      const result = await service.getOne(id)
      dispatch(getOneSuccess())
      console.log(result)
      dispatch(setModel(result))
    } catch (e) {
      dispatch(getOneError(e.message))
    }
  }
}

const getOneBegin = () => ({
  type: types.GET_ONE_CERTIFICATEMODEL_BEGIN
})

const getOneSuccess = model => ({
  type: types.GET_ONE_CERTIFICATEMODEL_SUCCESS
})

const getOneError = error => ({
  type: types.GET_ONE_CERTIFICATEMODEL_ERROR,
  error
})

const setModel = model => ({
  type: types.SET_CERTIFICATEMODEL,
  model
})

const setValue = (name, value) => ({
  type: types.SET_CERTIFICATEMODEL_VALUE,
  name,
  value
})

const reset = () => ({
  type: types.RESET_CERTIFICATEMODEL
})

const update = (id, model) => {
  return async dispatch => {
    dispatch(updateBegin())
    try {
      model.updatedAt = getUnixTime(new Date())
      await service.update(id, model)
      dispatch(updateSuccess())
      dispatch(getAll())
    } catch (e) {
      dispatch(updateError(e.message))
    }
  }
}

const updateBegin = () => ({
  type: types.UPDATE_CERTIFICATEMODEL_BEGIN
})

const updateSuccess = () => ({
  type: types.UPDATE_CERTIFICATEMODEL_SUCCESS
})

const updateError = error => ({
  type: types.UPDATE_CERTIFICATEMODEL_ERROR,
  error
})

export default {
  create,
  getAll,
  getOne,
  reset,
  setModel,
  setValue,
  update
}
