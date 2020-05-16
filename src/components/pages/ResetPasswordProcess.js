import React from 'react'
import { useDispatch } from 'react-redux'

import actions from '../../actions/auth.actions'

export default function ResetPasswordProcess ({ match }) {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(actions.resetPasswordProcess(match.params.token))
  }, [dispatch, match.params.token])

  return null
}
