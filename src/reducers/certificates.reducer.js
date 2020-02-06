import types from '../constants/actions.types.constants'

const initialState = {
  isRunning: false,
  certificates: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CERTIFICATES_BEGIN:
      return {
        ...state,
        isRunning: true
      }

    case types.GET_CERTIFICATES_SUCCESS:
      return {
        ...state,
        certificates: action.certificates,
        isRunning: false
      }

    default:
      return state
  }
}
