import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Card, CardContent,
  Grid,
  TextField,
  Typography
} from '@material-ui/core'
import { Save } from '@material-ui/icons'

import actions from '../../actions/users.actions'
import constants from '../../constants/users.constants'

export default function User ({ match }) {
  const dispatch = useDispatch()
  const usersReducer = useSelector(state => state.usersReducer)

  React.useEffect(() => {
    dispatch(actions.reset())
  }, [dispatch])

  const handleValueChange = (name, event) => {
    dispatch(actions.setValue(name, event.target.value))
  }

  const isComplete = () => {
    return (
      usersReducer.email !== '' &&
      usersReducer.password !== '' &&
      usersReducer.passwordConfirmation !== '' &&
      usersReducer.password === usersReducer.passwordConfirmation
    )
  }

  const canSubmit = () => {
    return (
      usersReducer.hasChanged &&
      isComplete()
    )
  }

  const submit = () => {
    const user = {
      email: usersReducer.email,
      password: usersReducer.password,
      status: constants.status.ACTIVE,
      role: constants.role.MANAGER
    }
    dispatch(actions.create(user))
  }

  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12} align='center'>
        <Typography variant='h1'>Create user</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  id='email'
                  label='Email'
                  type='email'
                  value={usersReducer.email}
                  onChange={event => handleValueChange('email', event)}
                  required
                  fullWidth
                >
                  Email
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='password'
                  label='Password'
                  type='password'
                  value={usersReducer.password}
                  onChange={event => handleValueChange('password', event)}
                  autoComplete='new-password'
                  required
                  fullWidth
                >
                  Password
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='passwordConfirmation'
                  label='Password confirmation'
                  type='password'
                  value={usersReducer.passwordConfirmation}
                  onChange={event => handleValueChange('passwordConfirmation', event)}
                  autoComplete='new-password'
                  required
                  fullWidth
                  error={usersReducer.password !== '' && usersReducer.passwordConfirmation !== '' && usersReducer.passwordConfirmation !== usersReducer.password}
                >
                  Password confirmation
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button
          onClick={() => submit()}
          disabled={!canSubmit()}
          variant='contained'
          color='primary'
          startIcon={<Save />}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  )
}
