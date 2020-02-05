import types from '../constants/actions.types.constants'

const create = title => ({
  type: types.CREATE_CONFIRMATION,
  title
})

const reset = () => ({
  type: types.RESET_CONFIRMATION
})

export default {
  create,
  reset
}
