import types from '../constants/actions.types.constants'

const initialState = {
  issuer: {},
  revocations: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_BLOCKCERTS_ISSUER_SUCCESS:
      return {
        ...state,
        issuer: action.data
      }

    case types.GET_BLOCKCERTS_REVOCATIONS_SUCCESS:
      return {
        ...state,
        revocations: action.data
      }

    default:
      return state
  }
}
