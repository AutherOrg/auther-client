import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  CircularProgress,
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
        authReducer.isRunning
          ? <CircularProgress />
          : (
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
            </>
          )
      }
    </Grid>
  )
}
