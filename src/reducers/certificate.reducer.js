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
    case types.UPDATE_CERTIFICATE_SUCCESS:
      return action.certificate

    case types.GET_SHARED_CERTIFICATE_SUCCESS:
      return {
        ...state,
        uuid: action.uuid,
        json: action.json
      }

    case types.RESET_CERTIFICATE:
    case types.DESTROY_CERTIFICATE_SUCCESS:
      return initialState

    default:
      return state
  }
}
