import types from '../constants/actions.types.constants'

const initialState = {
  open: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_BACKDROP:
    case types.GET_AUTH_BEGIN:
    case types.SET_PASSWORD_BEGIN:
    case types.RESET_PASSWORD_BEGIN:
    case types.RESET_PASSWORD_PROCESS_BEGIN:
    case types.GET_CERTIFICATES_BEGIN:
    case types.GET_ISSUER_BEGIN:
    case types.UPDATE_ISSUER_BEGIN:
    case types.CREATE_MODEL_BEGIN:
    case types.DESTROY_MODEL_BEGIN:
    case types.GET_ALL_MODELS_BEGIN:
    case types.GET_ONE_MODEL_BEGIN:
    case types.GET_ALL_SIGNATURES_BEGIN:
    case types.GET_ONE_SIGNATURE_BEGIN:
    case types.CREATE_SIGNATURE_BEGIN:
    case types.DESTROY_SIGNATURE_BEGIN:
    case types.UPDATE_SIGNATURE_BEGIN:
    case types.CREATE_BATCH_BEGIN:
    case types.GET_BATCH_BEGIN:
    case types.GET_ALL_BATCHES_BEGIN:
    case types.SET_BATCH_BEGIN:
    case types.SIGN_BATCH_BEGIN:
    case types.CREATE_REVOCATION_BEGIN:
    case types.DESTROY_REVOCATION_BEGIN:
    case types.GET_MANY_REVOCATION_BEGIN:
    case types.DESTROY_CERTIFICATE_BEGIN:
    case types.GET_CERTIFICATE_BEGIN:
    case types.GET_SHARED_CERTIFICATE_BEGIN:
    case types.UPDATE_CERTIFICATE_BEGIN:
    case types.RESEND_CERTIFICATE_EMAIL_BEGIN:
    case types.CREATE_JOB_BEGIN:
    case types.DESTROY_JOB_BEGIN:
    case types.GET_JOBS_BEGIN:
    case types.CREATE_USER_BEGIN:
    case types.GET_USERS_BEGIN:
    case types.GET_USER_BEGIN:
    case types.UPDATE_USER_BEGIN:
    case types.DESTROY_USER_BEGIN:
    case types.GET_BLOCKCERTS_ISSUER_BEGIN:
    case types.GET_BLOCKCERTS_REVOCATIONS_BEGIN:
    case types.GET_SOURCE_BATCHES_BEGIN:
    case types.GET_SOURCE_BATCH_BEGIN:
      return {
        ...state,
        open: true
      }

    case types.CLOSE_BACKDROP:
    case types.GET_AUTH_SUCCESS:
    case types.SET_PASSWORD_SUCCESS:
    case types.RESET_PASSWORD_SUCCESS:
    case types.RESET_PASSWORD_PROCESS_SUCCESS:
    case types.GET_AUTH_ERROR_EXPIRED_TOKEN:
    case types.GET_CERTIFICATES_SUCCESS:
    case types.GET_ISSUER_SUCCESS:
    case types.UPDATE_ISSUER_SUCCESS:
    case types.CREATE_MODEL_SUCCESS:
    case types.DESTROY_MODEL_SUCCESS:
    case types.GET_ONE_MODEL_SUCCESS:
    case types.GET_ALL_MODELS_SUCCESS:
    case types.GET_ALL_SIGNATURES_SUCCESS:
    case types.GET_ONE_SIGNATURE_SUCCESS:
    case types.CREATE_SIGNATURE_SUCCESS:
    case types.DESTROY_SIGNATURE_SUCCESS:
    case types.UPDATE_SIGNATURE_SUCCESS:
    case types.CREATE_BATCH_SUCCESS:
    case types.GET_BATCH_SUCCESS:
    case types.SET_BATCH_SUCCESS:
    case types.SIGN_BATCH_SUCCESS:
    case types.GET_ALL_BATCHES_SUCCESS:
    case types.CREATE_REVOCATION_SUCCESS:
    case types.DESTROY_REVOCATION_SUCCESS:
    case types.GET_MANY_REVOCATION_SUCCESS:
    case types.DESTROY_CERTIFICATE_SUCCESS:
    case types.GET_CERTIFICATE_SUCCESS:
    case types.GET_SHARED_CERTIFICATE_SUCCESS:
    case types.UPDATE_CERTIFICATE_SUCCESS:
    case types.RESEND_CERTIFICATE_EMAIL_SUCCESS:
    case types.CREATE_JOB_SUCCESS:
    case types.DESTROY_JOB_SUCCESS:
    case types.GET_JOBS_SUCCESS:
    case types.CREATE_USER_SUCCESS:
    case types.GET_USERS_SUCCESS:
    case types.GET_USER_SUCCESS:
    case types.UPDATE_USER_SUCCESS:
    case types.DESTROY_USER_SUCCESS:
    case types.GET_BLOCKCERTS_ISSUER_SUCCESS:
    case types.GET_BLOCKCERTS_REVOCATIONS_SUCCESS:
    case types.GET_SOURCE_BATCHES_SUCCESS:
    case types.GET_SOURCE_BATCH_SUCCESS:
      return initialState

    default:
      return state
  }
}
