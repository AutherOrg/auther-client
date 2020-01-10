import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import batchReducer from './batch.reducer'
import transactionReducer from './transaction.reducer'

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  batchReducer,
  transactionReducer
})

export default createRootReducer
