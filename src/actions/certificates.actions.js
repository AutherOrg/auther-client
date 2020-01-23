import types from '../constants/actions.types.constants'
import apiService from '../services/openblockcerts-api/certificates.openblockcerts-api.service'
import dexieService from '../services/dexie/certificates.dexie.service'

const getAll = hasApi => {
  return async dispatch => {
    dispatch(getAllBegin())
    try {
      const service = hasApi ? apiService : dexieService
      const result = await service.getAll()
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
