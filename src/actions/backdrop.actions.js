import types from '../constants/actions.types.constants'

const create = () => ({
  type: types.CREATE_BACKDROP
})

const close = () => ({
  type: types.CLOSE_BACKDROP
})

export default {
  create,
  close
}
