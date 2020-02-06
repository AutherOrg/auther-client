import types from '../constants/actions.types.constants'

const initialState = {
  errors: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_ERROR:
    case types.GET_BATCH_ERROR:
    case types.CREATE_REVOKED_ERROR:
    case types.DESTROY_REVOKED_ERROR:
    case types.GET_REVOKED_ERROR:
    case types.DESTROY_CERTIFICATE_ERROR:
    case types.GET_CERTIFICATE_ERROR:
    case types.UPDATE_CERTIFICATE_ERROR:
    case types.CREATE_JOB_ERROR:
    case types.DESTROY_JOB_ERROR:
    case types.GET_JOBS_ERROR:
    case types.RUN_JOB_ERROR:
      return {
        ...state,
        errors: [...state.errors, action.error]
      }

    case types.RESET_ERRORS:
      return initialState

    default:
      return state
  }
}
