import types from '../constants/actions.types.constants'
import service from '../services/dexie/issuers.dexie.service'

const create = issuer => {
  return async dispatch => {
    dispatch(createBegin())
    try {
      const result = await service.create(issuer)
      if (result) {
        dispatch(createSuccess())
        dispatch(getMy())
      }
    } catch (e) {
      dispatch(createError(e.message))
    }
  }
}

const createBegin = () => ({
  type: types.CREATE_ISSUER_BEGIN
})

const createSuccess = () => ({
  type: types.CREATE_ISSUER_SUCCESS
})

const createError = error => ({
  type: types.CREATE_ISSUER_ERROR,
  error
})

const getOne = id => {
  return async dispatch => {
    dispatch(getOneBegin())
    try {
      const result = await service.getOne(id)
      dispatch(getOneSuccess(result))
    } catch (e) {
      dispatch(getOneError(e.message))
    }
  }
}

const getOneBegin = () => ({
  type: types.GET_ISSUER_BEGIN
})

const getOneSuccess = issuer => ({
  type: types.GET_ISSUER_SUCCESS,
  issuer
})

const getOneNoResult = () => ({
  type: types.GET_ISSUER_NO_RESULT
})

const getOneError = error => ({
  type: types.GET_ISSUER_ERROR,
  error
})

const getMy = () => {
  return async dispatch => {
    dispatch(getOneBegin())
    try {
      const issuer = await service.getOne(1)
      if (issuer) {
        dispatch(getOneSuccess(issuer))
        dispatch(setHasIssuer())
      } else {
        dispatch(getOneNoResult())
      }
    } catch (e) {
      dispatch(getOneError(e.message))
    }
  }
}

const setValue = (name, value) => ({
  type: types.SET_ISSUER_VALUE,
  name,
  value
})

const setHasIssuer = () => ({
  type: types.SET_HAS_ISSUER
})

const update = (id, issuer) => {
  return async dispatch => {
    dispatch(updateBegin())
    try {
      await service.update(id, issuer)
      dispatch(updateSuccess())
      dispatch(getOne(id))
    } catch (e) {
      dispatch(updateError(e.message))
    }
  }
}

const updateBegin = () => ({
  type: types.UPDATE_ISSUER_BEGIN
})

const updateSuccess = () => ({
  type: types.UPDATE_ISSUER_SUCCESS
})

const updateError = error => ({
  type: types.UPDATE_ISSUER_ERROR,
  error
})

export default {
  create,
  getOne,
  getMy,
  setValue,
  update
}
