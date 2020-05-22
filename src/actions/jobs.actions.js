import types from '../constants/actions.types.constants'
import jobsDexieService from '../services/dexie/jobs.dexie.service'
import certificatesService from '../services/api/certificates.api.service'

const create = data => {
  return async dispatch => {
    dispatch(createBegin())
    const result = await jobsDexieService.create(data)
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
    const result = await jobsDexieService.destroy(id)
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
    const result = await jobsDexieService.get()
    if (result instanceof TypeError) {
      dispatch(getError(result.message))
    } else {
      dispatch(getSuccess(result))
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

const runJob = job => {
  return async dispatch => {
    dispatch(runJobBegin())
    const result = await certificatesService.create(job.data)
    if (result instanceof TypeError) {
      dispatch(runJobError(result.message))
    } else {
      dispatch(destroy(job.id))
      dispatch(runJobSuccess())
    }
  }
}

const runJobBegin = () => ({
  type: types.RUN_JOB_BEGIN
})

const runJobSuccess = () => ({
  type: types.RUN_JOB_SUCCESS
})

const runJobError = error => ({
  type: types.RUN_JOB_ERROR,
  error
})

const runJobs = jobs => {
  return async dispatch => {
    dispatch(runJobsBegin())
    await Promise.all(jobs.map(async job => {
      dispatch(runJobBegin())
      const result = await certificatesService.create(job.data)
      if (result instanceof TypeError) {
        dispatch(runJobError(result.message))
      } else {
        dispatch(runJobSuccess())
        dispatch(destroy(job.id))
      }
    }))
    dispatch(runJobsSuccess())
  }
}

const runJobsBegin = () => ({
  type: types.RUN_JOBS_BEGIN
})

const runJobsSuccess = () => ({
  type: types.RUN_JOBS_SUCCESS
})

export default {
  create,
  createJobs,
  destroy,
  get,
  runJob,
  runJobs
}
