import types from '../constants/actions.types.constants'

const initialState = {
  isRunning: false,
  error: '',
  certificates: [],
  merkleTreeRoot: '',
  batches: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_BATCH_BEGIN:
      return {
        ...state,
        isRunning: true
      }

    case types.ADD_BATCH_SUCCESS:
      return {
        ...state,
        isRunning: false
      }

    case types.ADD_BATCH_ERROR:
      return {
        ...state,
        isRunning: false,
        error: action.error
      }

    case types.GET_ALL_BATCHES_BEGIN:
      return {
        ...state,
        isRunning: true
      }

    case types.GET_ALL_BATCHES_SUCCESS:
      return {
        ...state,
        isRunning: false,
        batches: action.batches
      }

    case types.GET_ALL_BATCHES_ERROR:
      return {
        ...state,
        isRunning: false,
        error: action.error
      }

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

    case types.SIGN_BATCH_BEGIN:
      return {
        ...state,
        isRunning: true
      }

    case types.SIGN_BATCH_SUCCESS:
      return {
        ...state,
        isRunning: false,
        certificates: action.certificates
      }

    case types.SIGN_BATCH_ERROR:
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
        merkleTreeRoot: initialState.merkleTreeRoot,
        batches: initialState.batches
      }

    default:
      return state
  }
}
