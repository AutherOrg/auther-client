import types from '../constants/actions.types.constants'
import apiService from '../services/openblockcerts-api/certificates.openblockcerts-api.service'
import dexieService from '../services/dexie/certificates.dexie.service'

const getAll = hasApi => {
  return async dispatch => {
    dispatch(getAllBegin())
    const service = hasApi ? apiService : dexieService
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

export default {
  getAll
}
