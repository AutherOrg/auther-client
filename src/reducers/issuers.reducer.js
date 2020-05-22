import types from '../constants/actions.types.constants'

const initialState = {
  issuers: [],
  hasChanged: false,
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
    case types.GET_ISSUER_SUCCESS:
    case types.UPDATE_ISSUER_SUCCESS:
      return {
        ...state,
        hasChanged: false,
        issuerProfileUrl: action.data.issuerProfileUrl,
        name: action.data.name,
        email: action.data.email,
        url: action.data.url,
        introductionUrl: action.data.introductionUrl,
        publicKey: action.data.publicKey,
        revocationListUrl: action.data.revocationListUrl,
        image: action.data.image
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
