import Cookies from 'js-cookie'

const setHeadersWithToken = () => {
  const token = Cookies.get('token')
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token
  }
  return headers
}

const setHeaders = () => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  return headers
}

export default {
  setHeadersWithToken,
  setHeaders
}
