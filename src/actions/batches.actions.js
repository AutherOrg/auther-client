import { createBatch, signBatch } from 'blockcerts-issuer-helper'
import { getUnixTime } from 'date-fns'
import { push } from 'connected-react-router'

import types from '../constants/actions.types.constants'
import batchesConstants from '../constants/batches.constants'
import jobsConstants from '../constants/jobs.constants'
import service from '../services/dexie/batches.dexie.service'
import jobsActions from '../actions/jobs.actions'

const create = batch => {
  return async dispatch => {
    dispatch(createBegin())
    try {
      await service.create(batch)
      dispatch(createSuccess())
      dispatch(get())
    } catch (e) {
      dispatch(createError(e.message))
    }
  }
}

const createBegin = () => ({
  type: types.CREATE_BATCH_BEGIN
})

const createSuccess = () => ({
  type: types.CREATE_BATCH_SUCCESS
})

const createError = error => ({
  type: types.CREATE_BATCH_ERROR,
  error
})

const destroy = id => {
  return async dispatch => {
    dispatch(destroyBegin())
    const result = await service.destroy(id)
    if (result instanceof TypeError) {
      dispatch(destroyError(result.message))
    }
    dispatch(destroySuccess())
    dispatch(get())
  }
}

const destroyBegin = () => ({
  type: types.DESTROY_BATCH_BEGIN
})

const destroySuccess = () => ({
  type: types.DESTROY_BATCH_SUCCESS
})

const destroyError = error => ({
  type: types.DESTROY_BATCH_ERROR,
  error
})

const get = () => {
  return async dispatch => {
    dispatch(getAllBegin())
    try {
      const batches = await service.getAll()
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

const getOne = id => {
  return async dispatch => {
    dispatch(getOneBegin())
    const result = await service.getOne(id)
    if (result instanceof TypeError) {
      dispatch(getOneError(result.message))
    } else {
      dispatch(getOneSuccess(result))
    }
  }
}

const getOneBegin = () => ({
  type: types.GET_BATCH_BEGIN
})

const getOneSuccess = batch => ({
  type: types.GET_BATCH_SUCCESS,
  batch
})

const getOneError = error => ({
  type: types.GET_BATCH_ERROR,
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

const setValue = (name, value) => ({
  type: types.SET_BATCH_VALUE,
  name,
  value
})

const sign = (certificates, hash) => {
  return async dispatch => {
    dispatch(signBegin())
    const result = await signBatch(certificates, 'ETHData', hash, 'ethereumRopsten', { validate: true })
    if (result instanceof TypeError) {
      dispatch(signError(result.message))
    } else {
      dispatch(signSuccess(result))
      dispatch(create({
        status: batchesConstants.STATUS.SIGNED,
        created: getUnixTime(new Date()),
        certificates: JSON.stringify({
          certificates: result
        })
      }))
      dispatch(jobsActions.createJobs(result.map(certificate => {
        return {
          status: jobsConstants.STATUS.QUEUED,
          name: 'Upload certificate',
          action: 'uploadCertificate',
          data: certificate
        }
      })))
      dispatch(push('/batches'))
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
  create,
  destroy,
  get,
  getOne,
  reset,
  set,
  setValue,
  sign
}
