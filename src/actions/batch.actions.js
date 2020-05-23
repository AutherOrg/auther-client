import types from '../constants/actions.types.constants'
import service from '../services/dexie/batches.dexie.service'
import certificatesConstants from '../constants/certificates.constants'

const get = id => {
  return async dispatch => {
    dispatch(getBegin())
    const result = await service.getOne(id)
    if (result instanceof TypeError) {
      dispatch(getError(result.message))
    } else {
      dispatch(getSuccess(result))
    }
  }
}

const getBegin = () => ({
  type: types.GET_BATCH_BEGIN
})

const getSuccess = batch => ({
  type: types.GET_BATCH_SUCCESS,
  batch
})

const getError = error => ({
  type: types.GET_BATCH_ERROR,
  error
})

// This one is a little bit awful.
const getCertificate = certificateFromBatch => ({
  type: types.GET_CERTIFICATE_SUCCESS,
  data: {
    id: 1,
    status: certificatesConstants.STATUS.NOT_SHARED,
    sharingUuid: '',
    json: certificateFromBatch,
    createdAt: '',
    updatedAt: '',
    recipientId: 0,
    issuerId: 0
  }
})

const reset = () => ({
  type: types.RESET_BATCH
})

export default {
  get,
  getCertificate,
  reset
}
