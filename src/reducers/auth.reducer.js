import types from '../constants/actions.types.constants'
import constants from '../constants/users.constants'

const initialState = {
  isLogged: false,
  resetPasswordEmailSent: false,
  expiredToken: false,
  id: 0,
  email: '',
  status: constants.status.INACTIVE,
  role: constants.role.ANONYMOUS,
  createdAt: '',
  updatedAt: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_AUTH_SUCCESS:
      return {
        ...state,
        isLogged: true,
        id: action.id,
        email: action.email,
        status: action.status,
        role: action.role,
        createdAt: action.createdAt,
        updatedAt: action.updatedAt,
        expiredToken: false
      }

    case types.SET_PASSWORD_SUCCESS:
      return {
        ...state,
        status: action.status
      }

    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordEmailSent: true
      }

    case types.GET_AUTH_ERROR_EXPIRED_TOKEN:
      return {
        ...state,
        expiredToken: true
      }

    case types.SET_ROLE:
      return {
        ...state,
        role: action.role
      }

    case types.RESET_AUTH:
      return initialState

    default:
      return state
  }
}
