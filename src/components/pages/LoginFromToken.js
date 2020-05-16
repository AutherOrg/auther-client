import React from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Grid,
  TextField,
  Typography
} from '@material-ui/core'
import { LockOpen } from '@material-ui/icons'

import actions from '../../actions/auth.actions'

export default function LoginFromToken ({ match }) {
  const dispatch = useDispatch()

  const [values, setValues] = React.useState({
    password: '',
    passwordConfirmation: ''
  })

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value
    })
  }

  React.useEffect(() => {
    dispatch(actions.getFromToken(match.params.token))
  }, [dispatch, match.params.token])

  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12} align='center'>
        <Typography variant='h1' gutterBottom>Set password</Typography>
      </Grid>
      <>
        <Grid item xs={12} align='center'>
          <TextField
            id='password'
            label='Please set a password'
            type='password'
            value={values.password}
            onChange={handleChange('password')}
            required
          >
            Please set a password
          </TextField>
        </Grid>
        <Grid item xs={12} align='center'>
          <TextField
            id='passwordConfirmation'
            label='Confirm your password'
            type='password'
            value={values.passwordConfirmation}
            onChange={handleChange('passwordConfirmation')}
            error={values.password !== '' && values.passwordConfirmation !== '' && values.passwordConfirmation !== values.password}
            required
          >
            Confirm your password
          </TextField>
        </Grid>
        <Grid item xs={12} align='center'>
          <Button
            onClick={() => dispatch(actions.setPassword(values.password))}
            disabled={values.password === '' || values.passwordConfirmation === '' || values.passwordConfirmation !== values.password}
            variant='contained'
            color='primary'
            startIcon={<LockOpen />}
          >
            Login
          </Button>
        </Grid>
      </>
    </Grid>
  )
}
