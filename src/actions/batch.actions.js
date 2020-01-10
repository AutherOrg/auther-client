import { createBatch, signBatch } from 'blockcerts-issuer-helper'

import types from '../constants/actions.types.constants'

const set = (certificates, validate = false) => {
  return async dispatch => {
    dispatch(setBegin())
    try {
      const batch = await createBatch(certificates, { validate })
      dispatch(setSuccess(batch))
    } catch (e) {
      dispatch(setError(e.message))
    }
  }
}

const setBegin = () => ({
  type: types.SET_BATCH_BEGIN
})

const setSuccess = ({ merkleTreeRoot, certificatesWithProofs }) => ({
  type: types.SET_BATCH_SUCCESS,
  merkleTreeRoot,
  certificates: certificatesWithProofs
})

const setError = error => ({
  type: types.SET_BATCH_ERROR,
  error
})

const sign = (certificates, hash) => {
  return async dispatch => {
    dispatch(signBegin())
    try {
      const signedCertificates = await signBatch(certificates, 'ETHData', hash, 'ethereumRopsten', { validate: true })
      dispatch(signSuccess(signedCertificates))
    } catch (e) {
      dispatch(signError(e.message))
    }
  }
}

const signBegin = () => ({
  type: types.SIGN_BATCH_BEGIN
})

const signSuccess = certificates => ({
  type: types.SIGN_BATCH_SUCCESS,
  certificates
})

const signError = error => ({
  type: types.SIGN_BATCH_ERROR,
  error
})

const reset = () => ({
  type: types.RESET_BATCH
})

export default {
  set,
  sign,
  reset
}
