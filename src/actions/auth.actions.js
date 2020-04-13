import Cookies from 'js-cookie'
import { push } from 'connected-react-router'

import types from '../constants/actions.types.constants'
import service from '../services/openblockcerts-api/auth.openblockcerts-api.service'
import userConstants from '../constants/users.constants'
import issuersActions from './issuers.actions'

const get = (email, password) => {
  return async dispatch => {
    dispatch(getBegin())
    const result = await service.login(email, password)
    if (result instanceof TypeError) {
      dispatch(getError(result.message))
    } else if (result.error) {
      dispatch(getError(result.error))
    } else {
      dispatch(getSuccess(result.user))
      Cookies.set('token', result.token, { expires: 1 })
      if (result.user.role === userConstants.role.RECIPIENT) {
        dispatch(push('/certificates/my'))
      } else if ([
        userConstants.role.ADMIN,
        userConstants.role.MANAGER,
        userConstants.role.ISSUER
      ].includes(result.user.role)) {
        dispatch(issuersActions.getMy())
        dispatch(push('/'))
      } else {
        dispatch(push('/'))
      }
    }
  }
}

const getBegin = () => ({
  type: types.GET_AUTH_BEGIN
})

const getSuccess = ({ id, email, status, role, createdAt, updatedAt }) => ({
  type: types.GET_AUTH_SUCCESS,
  id,
  email,
  status,
  role,
  createdAt,
  updatedAt
})

const getError = error => ({
  type: types.GET_AUTH_ERROR,
  error
})

const getFromPermanentToken = permanentToken => {
  return async dispatch => {
    dispatch(getBegin())
    try {
      const result = await service.loginFromPermanentToken(permanentToken)
      dispatch(getSuccess(result.user))
      Cookies.set('token', result.token, { expires: 1 })
      if (result.user.status === userConstants.status.ACTIVE) {
        if (result.user.role === userConstants.role.RECIPIENT) {
          dispatch(push('/certificates/my'))
        } else if ([
          userConstants.role.ADMIN,
          userConstants.role.MANAGER,
          userConstants.role.ISSUER
        ].includes(result.user.role)) {
          dispatch(push('/batches'))
        }
      }
    } catch (e) {
      dispatch(getError(e.message))
    }
  }
}

const logout = () => {
  return dispatch => {
    dispatch(logoutSuccess())
    Cookies.remove('token')
    dispatch(push('/'))
  }
}

const logoutSuccess = () => ({
  type: types.RESET_AUTH
})

const setHasApi = () => ({
  type: types.SET_HAS_API
})

const setPassword = (email, password) => {
  return async dispatch => {
    dispatch(setPasswordBegin())
    try {
      const result = await service.setPassword(email, password)
      dispatch(setPasswordSuccess(result.user))
    } catch (e) {
      dispatch(setPasswordError(e.message))
    }
  }
}

const setPasswordBegin = () => ({
  type: types.SET_PASSWORD_BEGIN
})

const setPasswordSuccess = () => ({
  type: types.SET_PASSWORD_SUCCESS
})

const setPasswordError = error => ({
  type: types.SET_PASSWORD_ERROR,
  error
})

const setRole = role => ({
  type: types.SET_ROLE,
  role
})

const validatePassword = passwordToken => {
  return async dispatch => {
    dispatch(validatePasswordBegin())
    try {
      const result = await service.validatePassword(passwordToken)
      dispatch(validatePasswordSuccess())
      dispatch(getSuccess(result.user))
      Cookies.set('token', result.token, { expires: 1 })
      dispatch(push('/certificates/my'))
    } catch (e) {
      dispatch(validatePasswordError(e.message))
    }
  }
}

const validatePasswordBegin = () => ({
  type: types.VALIDATE_PASSWORD_BEGIN
})

const validatePasswordSuccess = () => ({
  type: types.VALIDATE_PASSWORD_SUCCESS
})

const validatePasswordError = error => ({
  type: types.VALIDATE_PASSWORD_ERROR,
  error
})

export default {
  get,
  getFromPermanentToken,
  logout,
  setHasApi,
  setPassword,
  setRole,
  validatePassword
}
