import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Grid,
  Typography
} from '@material-ui/core'

import actions from '../../actions/auth.actions'

export default function ValidatePassword ({ match }) {
  const dispatch = useDispatch()

  const authReducer = useSelector(state => state.authReducer)

  React.useEffect(() => {
    dispatch(actions.validatePassword(match.params.passwordToken))
  }, [dispatch, match.params.passwordToken])

  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12} align='center'>
        <Typography variant='h1' gutterBottom>Password validation</Typography>
      </Grid>
      {authReducer.passwordValidated && (
        <Grid item xs={12} align='center'>
          <Typography>Password validated.</Typography>
        </Grid>
      )}
    </Grid>
  )
}
