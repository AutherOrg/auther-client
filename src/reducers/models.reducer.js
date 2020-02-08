import types from '../constants/actions.types.constants'
import constants from '../constants/models.constants'

const initialState = {
  models: [],
  m: [],
  hasChanged: false,
  id: 0,
  status: constants.STATUS.ACTIVE,
  name: '',
  description: '',
  image: '',
  signatureJobTitle: '',
  signatureImage: '',
  template: ''
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
        id: action.model.id,
        status: action.model.status,
        name: action.model.name,
        description: action.model.description,
        image: action.model.image,
        signatureJobTitle: action.model.signatureJobTitle,
        signatureImage: action.model.signatureImage,
        template: action.model.template
      }

    case types.SET_MODEL_VALUE:
      return {
        ...state,
        [action.name]: action.value,
        hasChanged: true
      }

    case types.RESET_MODEL:
      return initialState

    default:
      return state
  }
}
