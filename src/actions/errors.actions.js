import types from '../constants/actions.types.constants'

const create = error => ({
  type: types.CREATE_ERROR,
  error
})

const reset = () => ({
  type: types.RESET_ERRORS
})

export default {
  create,
  reset
}
