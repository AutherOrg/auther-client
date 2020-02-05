import types from '../constants/actions.types.constants'

const initialState = {
  revoked: [],
  certificateId: 0,
  revocationReason: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_REVOKED_SUCCESS:
      return {
        ...state,
        revoked: [...state.revoked, action.revoked],
        certificateId: initialState.certificateId,
        revocationReason: initialState.revocationReason
      }

    case types.DESTROY_REVOKED_SUCCESS:
      return {
        ...state,
        revoked: state.revoked.filter(e => e.id !== action.id)
      }

    case types.GET_REVOKED_SUCCESS:
      return {
        ...state,
        revoked: action.revoked
      }

    case types.SET_REVOKED:
      return {
        ...state,
        certificateId: action.certificateId,
        revocationReason: action.revocationReason
      }

    case types.CANCEL_REVOKED:
      return {
        ...state,
        certificateId: initialState.certificateId,
        revocationReason: initialState.revocationReason
      }

    case types.RESET_REVOKED:
      return initialState

    default:
      return state
  }
}
