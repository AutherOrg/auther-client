import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Resizer from 'react-image-file-resizer'
import {
  Button,
  CircularProgress,
  Card, CardHeader, CardContent,
  Grid,
  TextField,
  Typography
} from '@material-ui/core'
import { LockOpen } from '@material-ui/icons'

import actions from '../../actions/issuers.actions'
import constants from '../../constants/issuers.constants'

export default function Issuer () {
  const dispatch = useDispatch()

  const issuersReducer = useSelector(state => state.issuersReducer)

  const handleImageChange = event => {
    if (event.target.files[0]) {
      Resizer.imageFileResizer(
        event.target.files[0],
        200,
        200,
        'PNG',
        100,
        0,
        uri => {
          dispatch(actions.setValue('image', uri))
        }
      )
    }
  }

  const isProfileComplete = () => {
    return (
      issuersReducer.issuerProfileUrl !== '' &&
      issuersReducer.name !== '' &&
      issuersReducer.email !== '' &&
      issuersReducer.url !== '' &&
      issuersReducer.introductionUrl !== '' &&
      issuersReducer.publicKey !== '' &&
      issuersReducer.revocationListUrl !== '' &&
      issuersReducer.image !== ''
    )
  }

  const canSubmit = () => {
    return (
      issuersReducer.hasChanged &&
      isProfileComplete()
    )
  }

  const submit = () => {
    const issuer = {
      status: constants.status.ACTIVE,
      issuerProfileUrl: issuersReducer.issuerProfileUrl,
      name: issuersReducer.name,
      email: issuersReducer.email,
      url: issuersReducer.url,
      introductionUrl: issuersReducer.introductionUrl,
      publicKey: issuersReducer.publicKey,
      revocationListUrl: issuersReducer.revocationListUrl,
      image: issuersReducer.image
    }
    if (issuersReducer.hasIssuer) {
      dispatch(actions.update(issuersReducer.id, issuer))
    } else {
      dispatch(actions.create(issuer))
    }
  }

  React.useEffect(() => {
    dispatch(actions.getMy())
  }, [dispatch])

  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12} align='center'>
        <Typography variant='h1'>Issuer profile</Typography>
      </Grid>
      {issuersReducer.isRunning && (
        <Grid item xs={12} align='center'>
          <CircularProgress />
        </Grid>
      )}
      {issuersReducer.hasIssuer && (
        <Grid item xs={12} align='center'>
          <Typography color='error' gutterBottom>Warning: you should almost NEVER edit this.</Typography>
        </Grid>
      )}
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader title='General information' />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  id='name'
                  label='Name'
                  type='text'
                  value={issuersReducer.name}
                  onChange={event => dispatch(actions.setValue('name', event.target.value))}
                  required
                  fullWidth
                >
                  Name
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='email'
                  label='Email'
                  type='email'
                  value={issuersReducer.email}
                  onChange={event => dispatch(actions.setValue('email', event.target.value))}
                  required
                  fullWidth
                >
                  Email
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='url'
                  label='Website URL'
                  type='text'
                  value={issuersReducer.url}
                  onChange={event => dispatch(actions.setValue('url', event.target.value))}
                  required
                  fullWidth
                >
                  Website URL
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='introductionUrl'
                  label='Introduction URL'
                  type='text'
                  value={issuersReducer.introductionUrl}
                  onChange={event => dispatch(actions.setValue('introductionUrl', event.target.value))}
                  required
                  fullWidth
                >
                  Introduction URL
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Logo</Typography>
                {issuersReducer.image !== '' && (
                  <div>
                    <img src={issuersReducer.image} alt={issuersReducer.name} />
                  </div>
                )}
                <input type='file' onChange={handleImageChange} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader title='Technical critical information' />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  id='issuerProfileUrl'
                  label='Issuer profile URL'
                  type='text'
                  value={issuersReducer.issuerProfileUrl}
                  onChange={event => dispatch(actions.setValue('issuerProfileUrl', event.target.value))}
                  required
                  fullWidth
                  helperText={issuersReducer.hasIssuer ? 'Warning: changing this will invalid ALL your issued certificates.' : ''}
                >
                  Issuer profile URL
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='revocationListUrl'
                  label='Revocation list URL'
                  type='text'
                  value={issuersReducer.revocationListUrl}
                  onChange={event => dispatch(actions.setValue('revocationListUrl', event.target.value))}
                  required
                  fullWidth
                >
                  Revocation list URL
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='publicKey'
                  label='Ethereum public key'
                  type='text'
                  value={issuersReducer.publicKey}
                  onChange={event => dispatch(actions.setValue('publicKey', event.target.value))}
                  required
                  fullWidth
                  helperText={issuersReducer.hasIssuer ? 'Warning: changing this will invalid ALL your issued certificates.' : ''}
                >
                  Ethereum public key
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
          startIcon={<LockOpen />}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  )
}
