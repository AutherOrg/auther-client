import types from '../constants/actions.types.constants'

const initialState = {
  open: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_BACKDROP:
    case types.GET_BATCH_BEGIN:
    case types.CREATE_REVOKED_BEGIN:
    case types.DESTROY_REVOKED_BEGIN:
    case types.GET_REVOKED_BEGIN:
      return {
        ...state,
        open: action.open
      }

    case types.RESET_BACKDROP:
    case types.GET_BATCH_SUCCESS:
    case types.CREATE_REVOKED_SUCCESS:
    case types.DESTROY_REVOKED_SUCCESS:
    case types.GET_REVOKED_SUCCESS:
      return initialState

    default:
      return state
  }
}
