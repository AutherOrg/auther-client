import Cookies from 'js-cookie'
import { push } from 'connected-react-router'

import types from '../constants/actions.types.constants'
import service from '../services/auther-api/auth.auther-api.service'
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

const getFromToken = token => {
  return async dispatch => {
    dispatch(getBegin())
    Cookies.set('token', token, { expires: 30 })
    const result = await service.loginFromToken()
    if (result instanceof TypeError) {
      dispatch(getError(result.message))
    } else if (result.error) {
      dispatch(getError(result.error))
    } else {
      if (result.expiredToken) {
        dispatch(getFromTokenExpired())
        dispatch(push('/auth/login'))
      } else {
        dispatch(getSuccess(result.user))
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
      }
    }
  }
}

const getFromTokenExpired = () => ({
  type: types.GET_AUTH_ERROR_EXPIRED_TOKEN
})

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

const setPassword = password => {
  return async dispatch => {
    dispatch(setPasswordBegin())
    const result = await service.setPassword(password)
    if (result instanceof TypeError) {
      dispatch(setPasswordError(result.message))
    } else if (result.error) {
      dispatch(setPasswordError(result.error))
    } else {
      dispatch(setPasswordSuccess(result.user))
      dispatch(push('/certificates/my'))
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

const resetPassword = email => {
  return async dispatch => {
    dispatch(resetPasswordBegin())
    const result = await service.resetPassword(email)
    if (result instanceof TypeError) {
      dispatch(resetPasswordError(result.message))
    } else if (result.error) {
      dispatch(resetPasswordError(result.error))
    } else {
      dispatch(resetPasswordSuccess())
    }
  }
}

const resetPasswordBegin = () => ({
  type: types.RESET_PASSWORD_BEGIN
})

const resetPasswordSuccess = () => ({
  type: types.RESET_PASSWORD_SUCCESS
})

const resetPasswordError = error => ({
  type: types.RESET_PASSWORD_ERROR,
  error
})

const resetPasswordProcess = token => {
  return async dispatch => {
    dispatch(resetPasswordProcessBegin())
    Cookies.set('token', token, { expires: 30 })
    const result = await service.resetPasswordProcess()
    if (result instanceof TypeError) {
      dispatch(resetPasswordProcessError(result.message))
    } else if (result.error) {
      dispatch(resetPasswordProcessError(result.error))
    } else {
      dispatch(resetPasswordProcessSuccess())
      dispatch(push(`/auth/login/token/${token}`))
    }
  }
}

const resetPasswordProcessBegin = () => ({
  type: types.RESET_PASSWORD_PROCESS_BEGIN
})

const resetPasswordProcessSuccess = () => ({
  type: types.RESET_PASSWORD_PROCESS_SUCCESS
})

const resetPasswordProcessError = error => ({
  type: types.RESET_PASSWORD_PROCESS_ERROR,
  error
})

const setRole = role => ({
  type: types.SET_ROLE,
  role
})

export default {
  get,
  getFromToken,
  logout,
  setHasApi,
  setPassword,
  resetPassword,
  resetPasswordProcess,
  setRole
}
