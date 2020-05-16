import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import {
  Button,
  Grid,
  TextField,
  Typography
} from '@material-ui/core'
import { LockOpen } from '@material-ui/icons'

import actions from '../../actions/auth.actions'

export default function Login () {
  const dispatch = useDispatch()
  const authReducer = useSelector(state => state.authReducer)
  const [values, setValues] = React.useState({
    email: '',
    password: ''
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
        <Typography variant='h1' gutterBottom>Login</Typography>
      </Grid>
      {
        authReducer.expiredToken && (
          <Grid item xs={12} align='center'>
            <Typography gutterBottom>The link has expired, please login again or request a new password if you never set one or forgot it.</Typography>
          </Grid>
        )
      }
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
        <TextField
          id='password'
          label='Password'
          type='password'
          value={values.password}
          onChange={handleChange('password')}
          required
        >
          Password
        </TextField>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button
          onClick={() => dispatch(actions.get(values.email, values.password))}
          variant='contained'
          color='primary'
          startIcon={<LockOpen />}
        >
          Login
        </Button>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button
          onClick={() => dispatch(push('/auth/password/reset'))}
          size='small'
        >
          Request new password
        </Button>
      </Grid>
    </Grid>
  )
}
