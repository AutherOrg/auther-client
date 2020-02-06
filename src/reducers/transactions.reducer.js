import types from '../constants/actions.types.constants'

const initialState = {
  isRunning: false,
  hash: '',
  mined: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SEND_TRANSACTION_BEGIN:
      return {
        ...state,
        isRunning: true
      }

    case types.SEND_TRANSACTION_SENT:
      return {
        ...state,
        hash: action.hash
      }

    case types.SEND_TRANSACTION_SUCCESS:
      return {
        ...state,
        isRunning: false,
        mined: true
      }

    case types.RESET_TRANSACTION:
      return {
        initialState
      }

    default:
      return state
  }
}
