import types from '../constants/actions.types.constants'

const initialState = {
  open: false,
  title: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_CONFIRMATION:
      return {
        ...state,
        open: true,
        title: action.title
      }

    case types.RESET_CONFIRMATION:
    case types.CREATE_REVOKED_SUCCESS:
    case types.DESTROY_CERTIFICATE_SUCCESS:
      return initialState

    default:
      return state
  }
}
