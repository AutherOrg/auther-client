import types from '../constants/actions.types.constants'
import constants from '../constants/certificates.constants'

const initialState = {
  id: 0,
  status: constants.STATUS.NOT_SHARED,
  name: '',
  recipientId: 0,
  issuerId: 0,
  createdAt: '',
  updatedAt: '',
  sharingUuid: '',
  blockcertsUuid: '',
  json: {},
  Revocation: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CERTIFICATE_SUCCESS:
    case types.UPDATE_CERTIFICATE_SUCCESS:
      return action.data

    case types.GET_SHARED_CERTIFICATE_SUCCESS:
      return {
        ...state,
        name: action.data.name,
        sharingUuid: action.data.sharingUuid,
        json: action.data.json
      }

    case types.RESET_CERTIFICATE:
    case types.DESTROY_CERTIFICATE_SUCCESS:
      return initialState

    default:
      return state
  }
}
