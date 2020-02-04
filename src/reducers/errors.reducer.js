import types from '../constants/actions.types.constants'

const initialState = {
  errors: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_ERROR:
    case types.GET_BATCH_ERROR:
      return {
        ...state,
        errors: [...state.errors, action.error]
      }

    case types.RESET_ERRORS:
      return initialState

    default:
      return state
  }
}
