import types from '../constants/actions.types.constants'

const initialState = {
  isRunning: false,
  error: '',
  hasChanged: false,
  isSet: false,
  batches: [],
  recipients: [],
  modelId: '',
  certificates: [],
  merkleTreeRoot: ''
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
        isSet: true,
        certificates: action.certificates,
        merkleTreeRoot: action.merkleTreeRoot
      }

    case types.SET_BATCH_VALUE:
      return {
        ...state,
        [action.name]: action.value,
        hasChanged: true
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

    case types.RESET_BATCHES:
      return initialState

    default:
      return state
  }
}
