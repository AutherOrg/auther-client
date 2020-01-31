import types from '../constants/actions.types.constants'
import constants from '../constants/certificateModels.constants'

const initialState = {
  isRunning: false,
  error: '',
  models: [],
  hasChanged: false,
  id: 0,
  status: constants.STATUS.ACTIVE,
  name: '',
  description: '',
  image: '',
  narrative: '',
  signatureJobTitle: '',
  signatureImage: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CERTIFICATEMODEL_BEGIN:
    case types.GET_ALL_CERTIFICATEMODELS_BEGIN:
    case types.GET_ONE_CERTIFICATEMODEL_BEGIN:
      return {
        ...state,
        isRunning: true
      }

    case types.ADD_CERTIFICATEMODEL_SUCCESS:
    case types.GET_ONE_CERTIFICATEMODEL_SUCCESS:
      return {
        ...state,
        isRunning: false
      }

    case types.ADD_CERTIFICATEMODEL_ERROR:
    case types.GET_ALL_CERTIFICATEMODELS_ERROR:
    case types.GET_ONE_CERTIFICATEMODEL_ERROR:
      return {
        ...state,
        isRunning: false,
        error: action.error
      }

    case types.GET_ALL_CERTIFICATEMODELS_SUCCESS:
      return {
        ...state,
        isRunning: false,
        models: action.models
      }

    case types.SET_CERTIFICATEMODEL:
      return {
        ...state,
        status: action.model.status,
        name: action.model.name,
        description: action.model.description,
        image: action.model.image,
        narrative: action.model.narrative,
        signatureJobTitle: action.model.signatureJobTitle,
        signatureImage: action.model.signatureImage
      }

    case types.SET_CERTIFICATEMODEL_VALUE:
      return {
        ...state,
        [action.name]: action.value,
        hasChanged: true
      }

    default:
      return state
  }
}
