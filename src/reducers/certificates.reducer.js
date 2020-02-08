import types from '../constants/actions.types.constants'

const initialState = {
  certificates: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CERTIFICATES_SUCCESS:
      return {
        ...state,
        certificates: action.certificates
      }

    default:
      return state
  }
}
