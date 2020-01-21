import types from '../constants/actions.types.constants'
import service from '../services/openblockcerts-api/certificates.openblockcerts-api.service'

const getAll = () => {
  return async dispatch => {
    dispatch(getAllBegin())
    try {
      const result = await service.getAll()
      console.log(result)
      dispatch(getAllSuccess(result))
    } catch (e) {
      dispatch(getAllError(e.message))
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

export default {
  getAll
}
