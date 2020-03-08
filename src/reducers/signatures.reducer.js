import types from '../constants/actions.types.constants'
import constants from '../constants/signatures.constants'

const initialState = {
  signatures: [],
  hasChanged: false,
  id: 0,
  status: constants.STATUS.ACTIVE,
  name: '',
  jobTitle: '',
  image: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_SIGNATURE_SUCCESS:
      return {
        ...state,
        signatures: [...state.signatures, action.signature]
      }

    case types.DESTROY_SIGNATURE_SUCCESS:
      return {
        ...state,
        signatures: state.signatures.filter(e => e.id !== action.id)
      }

    case types.GET_ALL_SIGNATURES_SUCCESS:
      return {
        ...state,
        signatures: action.signatures
      }

    case types.GET_ONE_SIGNATURE_SUCCESS:
      return {
        ...state,
        id: action.id,
        status: action.signature.status,
        name: action.signature.name,
        jobTitle: action.signature.jobTitle,
        image: action.signature.image
      }

    case types.SET_SIGNATURE_VALUE:
      return {
        ...state,
        [action.name]: action.value,
        hasChanged: true
      }

    case types.UPDATE_SIGNATURE_SUCCESS:
      return {
        ...state,
        signatures: state.signatures.map(signature => {
          if (signature.id === action.id) {
            return action.signature
          }
          return signature
        })
      }

    case types.RESET_SIGNATURE:
      return {
        ...state,
        hasChanged: initialState.hasChanged,
        id: initialState.id,
        status: initialState.status,
        name: initialState.name,
        jobTitle: initialState.jobTitle,
        image: initialState.image
      }

    default:
      return state
  }
}
