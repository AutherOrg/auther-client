import types from '../constants/actions.types.constants'

const initialState = {
  batches: [],
  batch: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SOURCE_BATCHES_SUCCESS:
      return {
        ...state,
        batches: action.data
      }

    case types.GET_SOURCE_BATCH_SUCCESS:
      return {
        ...state,
        batch: action.data
      }

    case types.RESET_SOURCE:
      return initialState

    default:
      return state
  }
}
