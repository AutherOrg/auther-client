import types from '../constants/actions.types.constants'

const send = (tx, account, library) => {
  return async dispatch => {
    dispatch(sendBegin())
    try {
      library
        .getSigner(account)
        .sendTransaction(tx)
        .then(transaction => {
          dispatch(sendTransactionSent(transaction.hash))
          return transaction.wait().then(() => dispatch(sendSuccess()))
        })
        .catch(e => {
          dispatch(sendError(e.message))
        })
    } catch (e) {
      dispatch(sendError(e.message))
    }
  }
}

const sendBegin = () => ({
  type: types.SEND_TRANSACTION_BEGIN
})

const sendTransactionSent = hash => ({
  type: types.SEND_TRANSACTION_SENT,
  hash
})

const sendSuccess = () => ({
  type: types.SEND_TRANSACTION_SUCCESS
})

const sendError = error => ({
  type: types.SEND_TRANSACTION_ERROR,
  error
})

const reset = () => ({
  type: types.RESET_TRANSACTION
})

export default {
  send,
  reset
}
