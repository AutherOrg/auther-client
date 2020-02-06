import types from '../constants/actions.types.constants'
import constants from '../constants/users.constants'

const initialState = {
  isRunning: false,
  error: '',
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
    case types.GET_AUTH_BEGIN:
      return {
        ...state,
        isRunning: true
      }

    case types.GET_AUTH_SUCCESS:
      return {
        ...state,
        isRunning: false,
        isLogged: true,
        id: action.id,
        email: action.email,
        status: action.status,
        role: action.role,
        createdAt: action.createdAt,
        updatedAt: action.updatedAt
      }

    case types.GET_AUTH_ERROR:
      return {
        ...state,
        isRunning: false,
        error: action.error
      }

    case types.SET_HAS_API:
      return {
        ...state,
        hasApi: true
      }

    case types.SET_PASSWORD_BEGIN:
      return {
        ...state,
        isRunning: true
      }

    case types.SET_PASSWORD_SUCCESS:
      return {
        ...state,
        isRunning: false,
        passwordEmailSent: true
      }

    case types.SET_PASSWORD_ERROR:
      return {
        ...state,
        isRunning: false,
        error: action.error
      }

    case types.VALIDATE_PASSWORD_BEGIN:
      return {
        ...state,
        isRunning: true
      }

    case types.VALIDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isRunning: false,
        passwordValidated: true
      }

    case types.VALIDATE_PASSWORD_ERROR:
      return {
        ...state,
        isRunning: false,
        error: action.error
      }

    case types.LOGOUT_SUCCESS:
      return initialState

    case types.SET_ROLE:
      return {
        ...state,
        role: action.role
      }

    default:
      return state
  }
}
