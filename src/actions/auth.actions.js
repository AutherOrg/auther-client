import Cookies from 'js-cookie'
import { push } from 'connected-react-router'

import types from '../constants/actions.types.constants'
import service from '../services/openblockcerts-api/auth.openblockcerts-api.service'
import userConstants from '../constants/users.constants'

const get = (email, password) => {
  return async dispatch => {
    dispatch(getBegin())
    try {
      const result = await service.login(email, password)
      dispatch(getSuccess(result.user))
      Cookies.set('token', result.token, { expires: 1 })
      if (result.user.role === userConstants.role.RECIPIENT) {
        dispatch(push('/certificates/my'))
      } else if ([userConstants.role.ADMIN, userConstants.role.ISSUER].includes(result.user.role)) {
        dispatch(push('/certificates/all'))
      } else {
        dispatch(push('/'))
      }
    } catch (e) {
      dispatch(getError(e.message))
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
        } else if ([userConstants.role.ADMIN, userConstants.role.ISSUER].includes(result.user.role)) {
          dispatch(push('/certificates/all'))
        } else {
          dispatch(push('/'))
        }
      } else {
        dispatch(push('/'))
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
  type: types.LOGOUT_SUCCESS
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
  type: types.SET_USER_ROLE,
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
      dispatch(push('/'))
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
  setPassword,
  setRole,
  validatePassword
}
