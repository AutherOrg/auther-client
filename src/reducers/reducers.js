import { combineReducers } from 'redux'

import batchReducer from './batch.reducer'
import transactionReducer from './transaction.reducer'

const reducers = combineReducers({
  batchReducer,
  transactionReducer
})

export default (state, action) => {
  if (action.type === 'RESET_STORE') {
    state = undefined
  }
  return reducers(state, action)
}
