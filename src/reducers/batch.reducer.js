import types from '../constants/actions.types.constants'

const initialState = {
  isRunning: false,
  error: '',
  certificates: [],
  merkleTreeRoot: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_BATCH_BEGIN:
      return {
        ...state,
        isRunning: true
      }

    case types.SET_BATCH_SUCCESS:
      return {
        ...state,
        isRunning: false,
        certificates: action.certificates,
        merkleTreeRoot: action.merkleTreeRoot
      }

    case types.SET_BATCH_ERROR:
      return {
        ...state,
        isRunning: false,
        error: action.error
      }

    case types.RESET_BATCH:
      return {
        ...state,
        isRunning: initialState.isRunning,
        error: initialState.error,
        certificates: initialState.certificates,
        merkleTreeRoot: initialState.merkleTreeRoot
      }

    default:
      return state
  }
}
