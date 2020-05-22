import types from '../constants/actions.types.constants'

const initialState = {
  revocations: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_REVOCATION_SUCCESS:
      return {
        ...state,
        revocations: [...state.revocations, action.data]
      }

    case types.DESTROY_REVOCATION_SUCCESS:
      return {
        ...state,
        revocations: state.revocations.filter(e => e.id !== action.id)
      }

    case types.GET_MANY_REVOCATION_SUCCESS:
      return {
        ...state,
        revocations: action.data
      }

    case types.RESET_REVOCATIONS:
      return initialState

    default:
      return state
  }
}
