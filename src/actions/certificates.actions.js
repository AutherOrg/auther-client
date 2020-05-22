import types from '../constants/actions.types.constants'
import service from '../services/api/certificates.api.service'

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
  type: types.GET_CERTIFICATES_BEGIN
})

const getManySuccess = data => ({
  type: types.GET_CERTIFICATES_SUCCESS,
  data
})

const getManyError = error => ({
  type: types.GET_CERTIFICATES_ERROR,
  error
})

const setCertificate = data => ({
  type: types.GET_CERTIFICATE_SUCCESS,
  data
})

export default {
  getMany,
  setCertificate
}
