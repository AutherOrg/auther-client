import types from '../constants/actions.types.constants'

const initialState = {
  hasChanged: false,
  isSet: false,
  isSigned: false,
  preview: 'first',
  recipients: [],
  modelId: '',
  certificates: [],
  merkleTreeRoot: '',
  batches: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_BATCHES_SUCCESS:
      return {
        ...state,
        batches: action.batches
      }

    case types.SET_BATCH_SUCCESS:
      return {
        ...state,
        isSet: true,
        certificates: action.certificates,
        merkleTreeRoot: action.merkleTreeRoot
      }

    case types.SET_BATCH_PREVIEW:
      return {
        ...state,
        preview: action.data
      }

    case types.SET_BATCH_VALUE:
      return {
        ...state,
        [action.name]: action.value,
        hasChanged: true
      }

    case types.SIGN_BATCH_SUCCESS:
      return {
        ...state,
        certificates: action.certificates
      }

    case types.SEND_TRANSACTION_SUCCESS:
      return {
        ...state,
        isSigned: true
      }

    case types.RESET_BATCHES:
      return initialState

    default:
      return state
  }
}
