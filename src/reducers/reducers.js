import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import batchesReducer from './batches.reducer'
import transactionsReducer from './transactions.reducer'

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  batchesReducer,
  transactionsReducer
})

export default createRootReducer
