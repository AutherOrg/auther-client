import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Resizer from 'react-image-file-resizer'
import {
  Button,
  Card, CardHeader, CardContent,
  Checkbox,
  FormControl, FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Save } from '@material-ui/icons'

import actions from '../../actions/models.actions'
import signaturesActions from '../../actions/signatures.actions'
import constants from '../../constants/models.constants'
import templates from '../../templates/index.templates'

const useStyles = makeStyles(theme => ({
  modelImage: {
    maxWidth: '200px',
    height: 'auto'
  },
  templateScreenshot: {
    width: '100%',
    height: 'auto'
  }
}))

export default function Model ({ match }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const modelsReducer = useSelector(state => state.modelsReducer)
  const signaturesReducer = useSelector(state => state.signaturesReducer)

  const handleImageChange = (name, width, height, format, quality, event) => {
    if (event.target.files[0]) {
      Resizer.imageFileResizer(
        event.target.files[0],
        width,
        height,
        format,
        quality,
        0,
        uri => {
          dispatch(actions.setValue(name, uri))
        }
      )
    }
  }

  const hasSignature = signatureId => {
    return modelsReducer.signatures.findIndex(e => e === signatureId) > -1
  }

  const toggleSignature = signatureId => {
    if (hasSignature(signatureId)) {
      dispatch(actions.removeSignature(signatureId))
    } else {
      dispatch(actions.addSignature(signatureId))
    }
  }

  const getPreview = () => {
    if (modelsReducer.template !== '') {
      const template = templates.find(e => e.name === modelsReducer.template)
      if (template) {
        if (template.screenshot !== '') {
          return (
            <Grid item xs={12}>
              <img src={template.screenshot} alt={template.name} className={classes.templateScreenshot} />
            </Grid>
          )
        }
      }
    }
    return null
  }

  const isComplete = () => {
    return (
      modelsReducer.name !== '' &&
      modelsReducer.description !== '' &&
      modelsReducer.image !== '' &&
      modelsReducer.signatures.length > 0 &&
      modelsReducer.template !== ''
    )
  }

  const canSubmit = () => {
    return (
      modelsReducer.hasChanged &&
      isComplete()
    )
  }

  const submit = () => {
    const model = {
      status: constants.STATUS.ACTIVE,
      name: modelsReducer.name,
      description: modelsReducer.description,
      image: modelsReducer.image,
      signatures: modelsReducer.signatures,
      template: modelsReducer.template
    }
    if (modelsReducer.id > 0) {
      dispatch(actions.update(modelsReducer.id, model))
    } else {
      dispatch(actions.create(model))
    }
  }

  React.useEffect(() => {
    dispatch(signaturesActions.getAll())
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
        <Typography variant='h1'>Certificate model</Typography>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card>
          <CardHeader title='Badge' />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  id='name'
                  label='Name'
                  type='text'
                  value={modelsReducer.name}
                  onChange={event => dispatch(actions.setValue('name', event.target.value))}
                  required
                  fullWidth
                >
                  Name
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='description'
                  label='Description'
                  type='text'
                  value={modelsReducer.description}
                  onChange={event => dispatch(actions.setValue('description', event.target.value))}
                  multiline
                  required
                  fullWidth
                >
                  Description
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Image</Typography>
                {modelsReducer.image !== '' && (
                  <div>
                    <img src={modelsReducer.image} alt={modelsReducer.name} className={classes.modelImage} />
                  </div>
                )}
                <input type='file' onChange={event => handleImageChange('image', 1366, 1366, 'JPEG', 70, event)} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card>
          <CardHeader title='Signature(s)' />
          <CardContent>
            <Grid container>
              {signaturesReducer.signatures.map((signature, index) => (
                <Grid item xs={12} key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hasSignature(signature.id)}
                        onChange={event => toggleSignature(Number(event.target.value))}
                        value={signature.id}
                        color='primary'
                      />
                    }
                    label={`${signature.name}, ${signature.jobTitle}`}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card>
          <CardHeader title='Template' />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='label'>
                    Template
                  </InputLabel>
                  <Select
                    labelId='label'
                    id='template'
                    value={modelsReducer.template}
                    onChange={event => dispatch(actions.setValue('template', event.target.value))}
                  >
                    {templates.map((template, index) => (
                      <MenuItem key={index} value={template.name}>
                        {template.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {getPreview()}
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
