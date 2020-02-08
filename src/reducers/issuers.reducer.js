import types from '../constants/actions.types.constants'
import constants from '../constants/issuers.constants'

const initialState = {
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
    case types.CREATE_ISSUER_SUCCESS:
    case types.GET_ISSUER_NO_RESULT:
    case types.UPDATE_ISSUER_SUCCESS:
      return {
        ...state,
        hasChanged: false
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
        image: action.issuer.image
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
