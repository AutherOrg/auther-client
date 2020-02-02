import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import authReducer from './auth.reducer'
import batchesReducer from './batches.reducer'
import certificatesReducer from './certificates.reducer'
import modelsReducer from './models.reducer'
import issuersReducer from './issuers.reducer'
import transactionsReducer from './transactions.reducer'

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  authReducer,
  batchesReducer,
  certificatesReducer,
  modelsReducer,
  issuersReducer,
  transactionsReducer
})

export default createRootReducer
