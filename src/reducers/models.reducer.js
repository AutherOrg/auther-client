import types from '../constants/actions.types.constants'
import constants from '../constants/models.constants'

const initialState = {
  isRunning: false,
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
    case types.ADD_MODEL_BEGIN:
    case types.DESTROY_MODEL_BEGIN:
    case types.GET_ALL_MODELS_BEGIN:
    case types.GET_ONE_MODEL_BEGIN:
      return {
        ...state,
        isRunning: true
      }

    case types.ADD_MODEL_SUCCESS:
    case types.DESTROY_MODEL_SUCCESS:
    case types.GET_ONE_MODEL_SUCCESS:
      return {
        ...state,
        isRunning: false
      }

    case types.GET_ALL_MODELS_SUCCESS:
      return {
        ...state,
        isRunning: false,
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

    default:
      return state
  }
}
