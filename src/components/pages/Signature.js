import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Resizer from 'react-image-file-resizer'
import {
  Button,
  Card, CardContent,
  Grid,
  TextField,
  Typography
} from '@material-ui/core'
import { Save } from '@material-ui/icons'

import actions from '../../actions/signatures.actions'

export default function Signature ({ match }) {
  const dispatch = useDispatch()

  const signaturesReducer = useSelector(state => state.signaturesReducer)

  const handleImageChange = event => {
    if (event.target.files[0]) {
      Resizer.imageFileResizer(
        event.target.files[0],
        400,
        100,
        'PNG',
        100,
        0,
        uri => {
          dispatch(actions.setValue('image', uri))
        }
      )
    }
  }

  const isComplete = () => {
    return (
      signaturesReducer.name !== '' &&
      signaturesReducer.jobTitle !== '' &&
      signaturesReducer.image !== ''
    )
  }

  const canSubmit = () => {
    return (
      signaturesReducer.hasChanged &&
      isComplete()
    )
  }

  const submit = () => {
    const signature = {
      name: signaturesReducer.name,
      jobTitle: signaturesReducer.jobTitle,
      image: signaturesReducer.image
    }
    if (signaturesReducer.id > 0) {
      dispatch(actions.update(signaturesReducer.id, signature))
    } else {
      dispatch(actions.create(signature))
    }
  }

  React.useEffect(() => {
    const { id } = match.params
    if (id > 0) {
      dispatch(actions.getOne(id))
    } else {
      dispatch(actions.reset())
    }
  }, [dispatch, match.params])

  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12} align='center'>
        <Typography variant='h1'>Signature</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  id='name'
                  label='Name'
                  type='text'
                  value={signaturesReducer.name}
                  onChange={event => dispatch(actions.setValue('name', event.target.value))}
                  required
                  fullWidth
                >
                  Name
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='jobTitle'
                  label='Job title'
                  type='text'
                  value={signaturesReducer.jobTitle}
                  onChange={event => dispatch(actions.setValue('jobTitle', event.target.value))}
                  required
                  fullWidth
                >
                  Job title
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Image</Typography>
                {signaturesReducer.image !== '' && (
                  <div>
                    <img src={signaturesReducer.image} alt={signaturesReducer.name} />
                  </div>
                )}
                <input type='file' onChange={event => handleImageChange(event)} />
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
