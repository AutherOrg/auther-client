import types from '../constants/actions.types.constants'
import constants from '../constants/users.constants'

const initialState = {
  isLogged: false,
  passwordEmailSent: false,
  passwordValidated: false,
  id: 0,
  email: '',
  status: constants.status.INACTIVE,
  role: constants.role.ANONYMOUS,
  createdAt: '',
  updatedAt: '',
  hasApi: process.env.REACT_APP_API !== 'none'
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
        updatedAt: action.updatedAt
      }

    case types.SET_HAS_API:
      return {
        ...state,
        hasApi: true
      }

    case types.SET_PASSWORD_SUCCESS:
      return {
        ...state,
        passwordEmailSent: true
      }

    case types.VALIDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        passwordValidated: true
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
