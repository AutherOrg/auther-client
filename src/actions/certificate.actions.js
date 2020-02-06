import types from '../constants/actions.types.constants'
import dexieService from '../services/dexie/certificates.dexie.service'

const get = id => {
  return async dispatch => {
    dispatch(getBegin())
    const result = await dexieService.getOne(id)
    if (result instanceof TypeError) {
      dispatch(getError(result.message))
    } else {
      dispatch(getSuccess(result))
    }
  }
}

const getBegin = () => ({
  type: types.GET_CERTIFICATE_BEGIN
})

const getSuccess = certificate => ({
  type: types.GET_CERTIFICATE_SUCCESS,
  certificate
})

const getError = error => ({
  type: types.GET_CERTIFICATE_ERROR,
  error
})

const reset = () => ({
  type: types.RESET_CERTIFICATE
})

export default {
  get,
  reset
}
