import helper from './source.helper'

const route = `${process.env.REACT_APP_SOURCE}/batches`

const getBatches = async () => {
  try {
    const response = await window.fetch(
      `${route}`, {
        method: 'GET',
        headers: helper.setHeaders()
      }
    )
    console.log(response)
    const result = await response.json()
    return result
  } catch (e) {
    return e
  }
}

export default {
  getBatches
}
