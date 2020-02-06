import types from '../constants/actions.types.constants'

const initialState = {
  jobs: [],
  isRunning: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_JOB_SUCCESS:
      return {
        ...state,
        jobs: [...state.jobs, action.job]
      }

    case types.DESTROY_JOB_SUCCESS:
      return {
        ...state,
        jobs: state.jobs.filter(e => e.id !== action.id)
      }

    case types.GET_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.jobs
      }

    case types.RUN_JOBS_BEGIN:
      return {
        ...state,
        isRunning: true
      }

    case types.RUN_JOBS_SUCCESS:
      return {
        ...state,
        isRunning: false
      }

    default:
      return state
  }
}
