import types from '../constants/actions.types.constants'

const initialState = {
  open: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_BACKDROP:
    case types.GET_BATCH_BEGIN:
      return {
        ...state,
        open: action.open
      }

    case types.RESET_BACKDROP:
    case types.GET_BATCH_SUCCESS:
      return initialState

    default:
      return state
  }
}
