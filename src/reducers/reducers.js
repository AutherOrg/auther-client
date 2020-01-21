import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import authReducer from './auth.reducer'
import batchesReducer from './batches.reducer'
import certificatesReducer from './certificates.reducer'
import transactionsReducer from './transactions.reducer'

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  authReducer,
  batchesReducer,
  certificatesReducer,
  transactionsReducer
})

export default createRootReducer
