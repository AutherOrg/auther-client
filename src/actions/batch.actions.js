import types from '../constants/actions.types.constants'
import service from '../services/dexie/batches.dexie.service'

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

const reset = () => ({
  type: types.RESET_BATCH
})

export default {
  get,
  reset
}
