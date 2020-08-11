import helper from './source.helper'
import sourceConstants from '../../constants/source.constants'

const route = `${process.env.REACT_APP_SOURCE}/batches/`

const getBatches = async () => {
  try {
    const response = await window.fetch(
      `${route}`, {
        method: 'GET',
        headers: helper.setHeaders()
      }
    )
    const result = await response.json()
    return result
  } catch (e) {
    return e
  }
}

const getBatch = async id => {
  try {
    const response = await window.fetch(
      `${route}${id}/`, {
        method: 'GET',
        headers: helper.setHeaders()
      }
    )
    const result = await response.json()
    return result
  } catch (e) {
    return e
  }
}

const updateBatch = async (id, data) => {
  try {
    const processedData = {
      status: sourceConstants.STATUS.ISSUED,
      transaction: data.txHash
    }
    const response = await window.fetch(
      `${route}${id}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(processedData)
      }
    )
    const result = await response.json()
    return result
  } catch (e) {
    return e
  }
}

export default {
  getBatches,
  getBatch,
  updateBatch
}
