import types from '../constants/actions.types.constants'
import constants from '../constants/batches.constants'

const initialState = {
  certificates: [],
  created: '',
  id: 0,
  status: constants.STATUS.EMPTY
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_BATCH_SUCCESS:
      return action.batch

    case types.RESET_BATCH:
      return initialState

    default:
      return state
  }
}
