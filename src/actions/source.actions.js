import types from '../constants/actions.types.constants'
import jobsConstants from '../constants/jobs.constants'
import service from '../services/source/source.service'
import batchesActions from './batches.actions'

const getBatches = params => {
  return async dispatch => {
    dispatch(batchesActions.reset())
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

const getBatch = id => {
  return async dispatch => {
    dispatch(getBatchBegin())
    const result = await service.getBatch(id)
    if (result instanceof TypeError) {
      dispatch(getBatchError(result.message))
    } else {
      dispatch(getBatchSuccess(result))
      dispatch(batchesActions.loadRecipients(result.recipients))
      dispatch(batchesActions.setPostFinalizationJob({
        status: jobsConstants.STATUS.QUEUED,
        name: 'Update source',
        action: 'updateSource',
        data: result
      }))
      dispatch(reset())
    }
  }
}

const getBatchBegin = () => ({
  type: types.GET_SOURCE_BATCH_BEGIN
})

const getBatchSuccess = data => ({
  type: types.GET_SOURCE_BATCH_SUCCESS,
  data
})

const getBatchError = error => ({
  type: types.GET_SOURCE_BATCH_ERROR,
  error
})

const reset = () => ({
  type: types.RESET_SOURCE
})

export default {
  getBatches,
  getBatch,
  reset
}
