import { createBatch, signBatch } from 'blockcerts-issuer-helper'
import { getUnixTime } from 'date-fns'
import { push } from 'connected-react-router'

import types from '../constants/actions.types.constants'
import batchesConstants from '../constants/batches.constants'
import jobsConstants from '../constants/jobs.constants'
import batchesService from '../services/dexie/batches.dexie.service'
import validateService from '../services/validate/validate.service'
import jobsActions from '../actions/jobs.actions'

const create = batch => {
  return async dispatch => {
    dispatch(createBegin())
    try {
      await batchesService.create(batch)
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
    const result = await batchesService.destroy(id)
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
    dispatch(getManyBegin())
    try {
      const batches = await batchesService.getMany()
      dispatch(getManySuccess(batches))
    } catch (e) {
      dispatch(getManyError(e.message))
    }
  }
}

const getManyBegin = () => ({
  type: types.GET_ALL_BATCHES_BEGIN
})

const getManySuccess = batches => ({
  type: types.GET_ALL_BATCHES_SUCCESS,
  batches
})

const getManyError = error => ({
  type: types.GET_ALL_BATCHES_ERROR,
  error
})

const getOne = id => {
  return async dispatch => {
    dispatch(getOneBegin())
    const result = await batchesService.getOne(id)
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

const loadRecipients = data => {
  return async dispatch => {
    if (!data.length > 0) {
      dispatch(createError('No recipients found in data source.'))
    }
    const invalidRecipients = data.filter((recipient, index) => {
      const isValidName = recipient.name && recipient.name !== ''
      const isValidEmail = recipient.email && validateService.isEmail(recipient.email)
      return !isValidName || !isValidEmail
    })
    if (invalidRecipients.length) {
      const errors = invalidRecipients.map(recipient => {
        return `Invalid item: name="${recipient.name}", email="${recipient.email}" `
      })
      const error = errors.join('\r\n')
      dispatch(createError(error))
    } else {
      dispatch(setValue('recipients', data))
    }
  }
}

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

const setPostFinalizationJob = data => ({
  type: types.SET_BATCH_POST_FINALIZATION_JOB,
  data
})

const setPreview = data => ({
  type: types.SET_BATCH_PREVIEW,
  data
})

const setValue = (name, value) => ({
  type: types.SET_BATCH_VALUE,
  name,
  value
})

const sign = (certificates, hash, chainId, postFinalizationJob) => {
  return async dispatch => {
    dispatch(signBegin())
    const result = await signBatch(certificates, 'ETHData', hash, chainId, { validate: true })
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
      if (postFinalizationJob.data) {
        postFinalizationJob.data.txHash = hash
        dispatch(jobsActions.create(postFinalizationJob))
      }
      dispatch(push('/certificates'))
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
  loadRecipients,
  reset,
  set,
  setPostFinalizationJob,
  setPreview,
  setValue,
  sign
}
