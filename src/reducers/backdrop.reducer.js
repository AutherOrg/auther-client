import types from '../constants/actions.types.constants'

const initialState = {
  open: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_BACKDROP:
    case types.GET_AUTH_BEGIN:
    case types.SET_PASSWORD_BEGIN:
    case types.VALIDATE_PASSWORD_BEGIN:
    case types.GET_CERTIFICATES_BEGIN:
    case types.CREATE_ISSUER_BEGIN:
    case types.GET_ISSUER_BEGIN:
    case types.UPDATE_ISSUER_BEGIN:
    case types.ADD_MODEL_BEGIN:
    case types.DESTROY_MODEL_BEGIN:
    case types.GET_ALL_MODELS_BEGIN:
    case types.GET_ONE_MODEL_BEGIN:
    case types.GET_ALL_SIGNATURES_BEGIN:
    case types.GET_ONE_SIGNATURE_BEGIN:
    case types.CREATE_SIGNATURE_BEGIN:
    case types.DESTROY_SIGNATURE_BEGIN:
    case types.UPDATE_SIGNATURE_BEGIN:
    case types.ADD_BATCH_BEGIN:
    case types.GET_BATCH_BEGIN:
    case types.GET_ALL_BATCHES_BEGIN:
    case types.SET_BATCH_BEGIN:
    case types.SIGN_BATCH_BEGIN:
    case types.CREATE_REVOKED_BEGIN:
    case types.DESTROY_REVOKED_BEGIN:
    case types.GET_REVOKED_BEGIN:
    case types.DESTROY_CERTIFICATE_BEGIN:
    case types.GET_CERTIFICATE_BEGIN:
    case types.GET_SHARED_CERTIFICATE_BEGIN:
    case types.UPDATE_CERTIFICATE_BEGIN:
    case types.CREATE_JOB_BEGIN:
    case types.DESTROY_JOB_BEGIN:
    case types.GET_JOBS_BEGIN:
      return {
        ...state,
        open: true
      }

    case types.RESET_BACKDROP:
    case types.GET_AUTH_SUCCESS:
    case types.SET_PASSWORD_SUCCESS:
    case types.VALIDATE_PASSWORD_SUCCESS:
    case types.GET_CERTIFICATES_SUCCESS:
    case types.CREATE_ISSUER_SUCCESS:
    case types.GET_ISSUER_NO_RESULT:
    case types.GET_ISSUER_SUCCESS:
    case types.UPDATE_ISSUER_SUCCESS:
    case types.ADD_MODEL_SUCCESS:
    case types.DESTROY_MODEL_SUCCESS:
    case types.GET_ONE_MODEL_SUCCESS:
    case types.GET_ALL_MODELS_SUCCESS:
    case types.GET_ALL_SIGNATURES_SUCCESS:
    case types.GET_ONE_SIGNATURE_SUCCESS:
    case types.CREATE_SIGNATURE_SUCCESS:
    case types.DESTROY_SIGNATURE_SUCCESS:
    case types.UPDATE_SIGNATURE_SUCCESS:
    case types.ADD_BATCH_SUCCESS:
    case types.GET_BATCH_SUCCESS:
    case types.SET_BATCH_SUCCESS:
    case types.SIGN_BATCH_SUCCESS:
    case types.GET_ALL_BATCHES_SUCCESS:
    case types.CREATE_REVOKED_SUCCESS:
    case types.DESTROY_REVOKED_SUCCESS:
    case types.GET_REVOKED_SUCCESS:
    case types.DESTROY_CERTIFICATE_SUCCESS:
    case types.GET_CERTIFICATE_SUCCESS:
    case types.GET_SHARED_CERTIFICATE_SUCCESS:
    case types.UPDATE_CERTIFICATE_SUCCESS:
    case types.CREATE_JOB_SUCCESS:
    case types.DESTROY_JOB_SUCCESS:
    case types.GET_JOBS_SUCCESS:
      return initialState

    default:
      return state
  }
}
