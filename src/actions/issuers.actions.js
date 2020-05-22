import { push } from 'connected-react-router'

import types from '../constants/actions.types.constants'
import service from '../services/api/issuers.api.service'

const get = () => {
  return async dispatch => {
    dispatch(getBegin())
    try {
      const result = await service.get()
      dispatch(getSuccess(result))
    } catch (e) {
      dispatch(getError(e.message))
    }
  }
}

const getBegin = () => ({
  type: types.GET_ISSUER_BEGIN
})

const getSuccess = data => ({
  type: types.GET_ISSUER_SUCCESS,
  data
})

const getError = error => ({
  type: types.GET_ISSUER_ERROR,
  error
})

const setValue = (name, value) => ({
  type: types.SET_ISSUER_VALUE,
  name,
  value
})

const update = data => {
  return async dispatch => {
    dispatch(updateBegin())
    try {
      const result = await service.update(data)
      dispatch(updateSuccess(result))
      dispatch(push('/system'))
    } catch (e) {
      dispatch(updateError(e.message))
    }
  }
}

const updateBegin = () => ({
  type: types.UPDATE_ISSUER_BEGIN
})

const updateSuccess = data => ({
  type: types.UPDATE_ISSUER_SUCCESS,
  data
})

const updateError = error => ({
  type: types.UPDATE_ISSUER_ERROR,
  error
})

export default {
  get,
  setValue,
  update
}
