import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import authReducer from './auth.reducer'
import backdropReducer from './backdrop.reducer'
import batchReducer from './batch.reducer'
import batchesReducer from './batches.reducer'
import certificateReducer from './certificate.reducer'
import certificatesReducer from './certificates.reducer'
import confirmationReducer from './confirmation.reducer'
import errorsReducer from './errors.reducer'
import issuersReducer from './issuers.reducer'
import jobsReducer from './jobs.reducer'
import modelsReducer from './models.reducer'
import revokedReducer from './revoked.reducer'
import transactionsReducer from './transactions.reducer'

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  authReducer,
  backdropReducer,
  batchReducer,
  batchesReducer,
  certificateReducer,
  certificatesReducer,
  confirmationReducer,
  errorsReducer,
  issuersReducer,
  jobsReducer,
  modelsReducer,
  revokedReducer,
  transactionsReducer
})

export default createRootReducer
