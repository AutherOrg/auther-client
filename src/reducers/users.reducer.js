import types from '../constants/actions.types.constants'
import constants from '../constants/users.constants'

const initialState = {
  users: [],
  hasChanged: false,
  id: 0,
  email: '',
  password: '',
  passwordConfirmation: '',
  status: constants.status.INACTIVE,
  role: constants.role.ANONYMOUS
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.user]
      }

    case types.DESTROY_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(e => e.id !== action.id)
      }

    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.users
      }

    case types.GET_USER_SUCCESS:
      return {
        ...state,
        id: action.user.id,
        email: action.user.email,
        status: action.user.status,
        role: action.user.role
      }

    case types.SET_USER_VALUE:
      return {
        ...state,
        [action.name]: action.value,
        hasChanged: true
      }

    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.user.id) {
            return action.user
          }
          return user
        })
      }

    case types.RESET_USERS:
      return initialState

    default:
      return state
  }
}
