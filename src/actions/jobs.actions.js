import types from '../constants/actions.types.constants'
import service from '../services/dexie/jobs.dexie.service'

const create = data => {
  return async dispatch => {
    dispatch(createBegin())
    const result = await service.create(data)
    if (result instanceof TypeError) {
      dispatch(createError(result.message))
    } else {
      dispatch(createSuccess(data))
    }
  }
}

const createBegin = () => ({
  type: types.CREATE_JOB_BEGIN
})

const createSuccess = job => ({
  type: types.CREATE_JOB_SUCCESS,
  job
})

const createError = error => ({
  type: types.CREATE_JOB_ERROR,
  error
})

const createJobs = jobs => {
  return async dispatch => {
    jobs.map(job => {
      return dispatch(create(job))
    })
  }
}

const destroy = id => {
  return async dispatch => {
    dispatch(destroyBegin())
    const result = await service.destroy(id)
    if (result instanceof TypeError) {
      dispatch(destroyError(result.message))
    } else {
      dispatch(destroySuccess(id))
    }
  }
}

const destroyBegin = () => ({
  type: types.DESTROY_JOB_BEGIN
})

const destroySuccess = id => ({
  type: types.DESTROY_JOB_SUCCESS,
  id
})

const destroyError = error => ({
  type: types.DESTROY_JOB_ERROR,
  error
})

const get = () => {
  return async dispatch => {
    dispatch(getBegin())
    const result = await service.get()
    if (result instanceof TypeError) {
      dispatch(getError(result.message))
    } else {
      dispatch(getSuccess())
    }
  }
}

const getBegin = () => ({
  type: types.GET_JOBS_BEGIN
})

const getSuccess = jobs => ({
  type: types.GET_JOBS_SUCCESS,
  jobs
})

const getError = error => ({
  type: types.GET_JOBS_ERROR,
  error
})

export default {
  create,
  createJobs,
  destroy,
  get
}
