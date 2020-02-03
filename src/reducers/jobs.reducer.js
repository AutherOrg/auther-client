import types from '../constants/actions.types.constants'

const initialState = {
  error: '',
  isRunning: false,
  jobs: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_JOB_BEGIN:
    case types.DESTROY_JOB_BEGIN:
    case types.GET_JOBS_BEGIN:
      return {
        ...state,
        isRunning: true
      }

    case types.CREATE_JOB_SUCCESS:
      return {
        ...state,
        isRunning: false,
        jobs: [...state.jobs, action.job]
      }

    case types.CREATE_JOB_ERROR:
    case types.DESTROY_JOB_ERROR:
    case types.GET_JOBS_ERROR:
      return {
        ...state,
        isRunning: false,
        error: action.error
      }

    case types.DESTROY_JOB_SUCCESS:
      return {
        ...state,
        isRunning: false,
        jobs: state.jobs.splice(state.jobs.find(e => e.id === action.id))
      }

    case types.GET_JOBS_SUCCESS:
      return {
        ...state,
        isRunning: false,
        jobs: action.jobs
      }

    default:
      return state
  }
}
