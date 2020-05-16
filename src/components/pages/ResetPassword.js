import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Grid,
  TextField,
  Typography
} from '@material-ui/core'
import { Send } from '@material-ui/icons'

import actions from '../../actions/auth.actions'

export default function ResetPassword () {
  const dispatch = useDispatch()

  const authReducer = useSelector(state => state.authReducer)

  const [values, setValues] = React.useState({
    email: ''
  })

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value
    })
  }

  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12} align='center'>
        <Typography variant='h1' gutterBottom>Reset password</Typography>
      </Grid>
      {
        authReducer.resetPasswordEmailSent
          ? (
            <Grid item xs={12} align='center'>
              <Typography>Please check your email, you should receive a message with a link to reset your password.</Typography>
            </Grid>
          ) : (
            <>
              <Grid item xs={12} align='center'>
                <TextField
                  id='email'
                  label='Email'
                  type='email'
                  value={values.email}
                  autoFocus
                  onChange={handleChange('email')}
                  required
                >
                  Email
                </TextField>
              </Grid>
              <Grid item xs={12} align='center'>
                <Button
                  onClick={() => dispatch(actions.resetPassword(values.email))}
                  disabled={values.email === ''}
                  variant='contained'
                  color='primary'
                  startIcon={<Send />}
                >
                  Reset password
                </Button>
              </Grid>
            </>
          )
      }
    </Grid>
  )
}
