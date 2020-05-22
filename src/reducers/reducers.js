import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import authReducer from './auth.reducer'
import backdropReducer from './backdrop.reducer'
import batchReducer from './batch.reducer'
import batchesReducer from './batches.reducer'
import blockcertsReducer from './blockcerts.reducer'
import certificateReducer from './certificate.reducer'
import certificatesReducer from './certificates.reducer'
import confirmationReducer from './confirmation.reducer'
import errorsReducer from './errors.reducer'
import issuersReducer from './issuers.reducer'
import jobsReducer from './jobs.reducer'
import modelsReducer from './models.reducer'
import revocationsReducer from './revocations.reducer'
import signaturesReducer from './signatures.reducer'
import transactionsReducer from './transactions.reducer'
import usersReducer from './users.reducer'

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  authReducer,
  backdropReducer,
  batchReducer,
  batchesReducer,
  blockcertsReducer,
  certificateReducer,
  certificatesReducer,
  confirmationReducer,
  errorsReducer,
  issuersReducer,
  jobsReducer,
  modelsReducer,
  revocationsReducer,
  signaturesReducer,
  transactionsReducer,
  usersReducer
})

export default createRootReducer
