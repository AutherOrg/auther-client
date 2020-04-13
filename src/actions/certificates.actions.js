import types from '../constants/actions.types.constants'
import service from '../services/openblockcerts-api/certificates.openblockcerts-api.service'

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
  type: types.GET_CERTIFICATES_BEGIN
})

const getAllSuccess = certificates => ({
  type: types.GET_CERTIFICATES_SUCCESS,
  certificates
})

const getAllError = error => ({
  type: types.GET_CERTIFICATES_ERROR,
  error
})

const setCertificate = certificate => ({
  type: types.GET_CERTIFICATE_SUCCESS,
  certificate
})

export default {
  getAll,
  setCertificate
}
