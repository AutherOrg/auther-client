import types from '../constants/actions.types.constants'
import constants from '../constants/models.constants'

const initialState = {
  models: [],
  m: [],
  hasChanged: false,
  signatureDialog: false,
  id: 0,
  status: constants.STATUS.ACTIVE,
  name: '',
  description: '',
  image: '',
  template: '',
  signatures: [],
  Signatures: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_MODELS_SUCCESS:
      return {
        ...state,
        models: action.models
      }

    case types.SET_MODEL:
      return {
        ...state,
        hasChanged: false,
        id: action.model.id,
        status: action.model.status,
        name: action.model.name,
        description: action.model.description,
        image: action.model.image,
        template: action.model.template,
        signatures: action.model.Signatures.map(Signature => {
          return Signature.id
        }),
        Signatures: action.model.Signatures
      }

    case types.SET_MODEL_VALUE:
      return {
        ...state,
        [action.name]: action.value,
        hasChanged: true
      }

    case types.TOGGLE_SIGNATURE_DIALOG:
      return {
        ...state,
        signatureDialog: !state.signatureDialog
      }

    case types.ADD_SIGNATURE_TO_MODEL:
      return {
        ...state,
        hasChanged: true,
        signatureDialog: false,
        signatures: [...state.signatures, action.signature.id],
        Signatures: [...state.Signatures, action.signature]
      }

    case types.REMOVE_SIGNATURE_FROM_MODEL:
      return {
        ...state,
        hasChanged: true,
        signatures: state.signatures.filter(id => id !== action.signature.id),
        Signatures: state.Signatures.filter(signature => signature.id !== action.signature.id)
      }

    case types.RESET_MODEL:
      return initialState

    default:
      return state
  }
}
