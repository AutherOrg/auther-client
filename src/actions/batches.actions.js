import { createBatch, signBatch } from 'blockcerts-issuer-helper'
import { useIndexedDB } from 'react-indexed-db'
import { getUnixTime } from 'date-fns'

import types from '../constants/actions.types.constants'
import batchesConstants from '../constants/batches.constants'

const add = batch => {
  return async dispatch => {
    dispatch(addBegin())
    try {
      const { add } = useIndexedDB('batches')
      await add(batch)
      dispatch(addSuccess())
      dispatch(getAll())
    } catch (e) {
      dispatch(addError(e.message))
    }
  }
}

const addBegin = () => ({
  type: types.ADD_BATCH_BEGIN
})

const addSuccess = () => ({
  type: types.ADD_BATCH_SUCCESS
})

const addError = error => ({
  type: types.ADD_BATCH_ERROR,
  error
})

const getAll = () => {
  return async dispatch => {
    dispatch(getAllBegin())
    try {
      const { getAll } = useIndexedDB('batches')
      const batches = await getAll()
      dispatch(getAllSuccess(batches))
    } catch (e) {
      dispatch(getAllError(e.message))
    }
  }
}

const getAllBegin = () => ({
  type: types.GET_ALL_BATCHES_BEGIN
})

const getAllSuccess = batches => ({
  type: types.GET_ALL_BATCHES_SUCCESS,
  batches
})

const getAllError = error => ({
  type: types.GET_ALL_BATCHES_ERROR,
  error
})

const reset = () => ({
  type: types.RESET_BATCHES
})

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
      dispatch(add({
        status: batchesConstants.STATUS.SIGNED,
        created: getUnixTime(new Date()),
        certificates: JSON.stringify(signedCertificates)
      }))
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

export default {
  add,
  getAll,
  reset,
  set,
  sign
}
