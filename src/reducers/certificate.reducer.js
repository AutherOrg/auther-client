import types from '../constants/actions.types.constants'
import constants from '../constants/certificates.constants'

const initialState = {
  id: 0,
  status: constants.STATUS.NOT_SHARED,
  uuid: '',
  json: {},
  createdAt: '',
  updatedAt: '',
  recipientId: 0,
  issuerId: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CERTIFICATE_SUCCESS:
      return action.certificate

    case types.RESET_CERTIFICATE:
      return initialState

    default:
      return state
  }
}
