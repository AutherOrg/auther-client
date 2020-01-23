import types from '../constants/actions.types.constants'
import constants from '../constants/issuers.constants'

const initialState = {
  isRunning: false,
  error: '',
  issuers: [],
  hasIssuer: false,
  hasChanged: false,
  id: 0,
  status: constants.status.INACTIVE,
  issuerProfileUrl: '',
  name: '',
  email: '',
  url: '',
  introductionUrl: '',
  publicKey: '',
  revocationListUrl: '',
  image: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_ISSUER_BEGIN:
    case types.GET_ISSUER_BEGIN:
    case types.UPDATE_ISSUER_BEGIN:
      return {
        ...state,
        isRunning: true
      }

    case types.CREATE_ISSUER_SUCCESS:
    case types.UPDATE_ISSUER_SUCCESS:
      return {
        ...state,
        isRunning: false
      }

    case types.GET_ISSUER_SUCCESS:
      return {
        ...state,
        id: action.issuer.id,
        issuerProfileUrl: action.issuer.issuerProfileUrl,
        name: action.issuer.name,
        email: action.issuer.email,
        url: action.issuer.url,
        introductionUrl: action.issuer.introductionUrl,
        publicKey: action.issuer.publicKey,
        revocationListUrl: action.issuer.revocationListUrl,
        image: action.issuer.image,
        isRunning: false
      }

    case types.CREATE_ISSUER_ERROR:
    case types.GET_ISSUER_ERROR:
    case types.UPDATE_ISSUER_ERROR:
      return {
        ...state,
        isRunning: false,
        error: action.error
      }

    case types.SET_HAS_ISSUER:
      return {
        ...state,
        hasIssuer: true
      }

    case types.SET_ISSUER_VALUE:
      return {
        ...state,
        [action.name]: action.value,
        hasChanged: true
      }

    default:
      return state
  }
}
