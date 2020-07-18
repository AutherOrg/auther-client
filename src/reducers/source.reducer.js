import types from '../constants/actions.types.constants'

const initialState = {
  batches: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SOURCE_BATCHES_SUCCESS:
      return {
        ...state,
        batches: action.batches
      }

    default:
      return state
  }
}
