import types from '../constants/actions.types.constants'
import service from '../services/source/source.service'

const getBatches = params => {
  return async dispatch => {
    dispatch(getBatchesBegin())
    const result = await service.getBatches(params)
    if (result instanceof TypeError) {
      dispatch(getBatchesError(result.message))
    } else {
      dispatch(getBatchesSuccess(result))
    }
  }
}

const getBatchesBegin = () => ({
  type: types.GET_SOURCE_BATCHES_BEGIN
})

const getBatchesSuccess = data => ({
  type: types.GET_SOURCE_BATCHES_SUCCESS,
  data
})

const getBatchesError = error => ({
  type: types.GET_SOURCE_BATCHES_ERROR,
  error
})

export default {
  getBatches
}
