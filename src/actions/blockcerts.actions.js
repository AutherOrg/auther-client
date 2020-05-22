import types from '../constants/actions.types.constants'
import service from '../services/api/blockcerts.api.service'

const getIssuer = () => {
  return async dispatch => {
    dispatch(getIssuerBegin())
    const result = await service.getIssuer()
    if (result instanceof TypeError) {
      dispatch(getIssuerError(result.message))
    } else {
      dispatch(getIssuerSuccess(result))
    }
  }
}

const getIssuerBegin = () => ({
  type: types.GET_BLOCKCERTS_ISSUER_BEGIN
})

const getIssuerSuccess = data => ({
  type: types.GET_BLOCKCERTS_ISSUER_SUCCESS,
  data
})

const getIssuerError = error => ({
  type: types.GET_BLOCKCERTS_ISSUER_ERROR,
  error
})

const getRevocations = () => {
  return async dispatch => {
    dispatch(getRevocationsBegin())
    const result = await service.getRevocations()
    if (result instanceof TypeError) {
      dispatch(getRevocationsError(result.message))
    } else {
      dispatch(getRevocationsSuccess(result))
    }
  }
}

const getRevocationsBegin = () => ({
  type: types.GET_BLOCKCERTS_REVOCATIONS_BEGIN
})

const getRevocationsSuccess = data => ({
  type: types.GET_BLOCKCERTS_REVOCATIONS_SUCCESS,
  data
})

const getRevocationsError = error => ({
  type: types.GET_BLOCKCERTS_REVOCATIONS_ERROR,
  error
})

export default {
  getIssuer,
  getRevocations
}
