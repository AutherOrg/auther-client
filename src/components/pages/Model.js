import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Resizer from 'react-image-file-resizer'
import {
  Button,
  Card, CardHeader, CardContent,
  FormControl,
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
import constants from '../../constants/models.constants'
import templates from '../../templates/index.templates'

const useStyles = makeStyles(theme => ({
  templateScreenshot: {
    width: '100%',
    height: 'auto'
  }
}))

export default function Model ({ match }) {
  const classes = useStyles()

  const dispatch = useDispatch()

  const modelsReducer = useSelector(state => state.modelsReducer)

  const handleImageChange = (name, event) => {
    if (event.target.files[0]) {
      Resizer.imageFileResizer(
        event.target.files[0],
        200,
        200,
        'PNG',
        100,
        0,
        uri => {
          dispatch(actions.setValue(name, uri))
        }
      )
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
      modelsReducer.signatureJobTitle !== '' &&
      modelsReducer.signatureImage !== '' &&
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
      signatureJobTitle: modelsReducer.signatureJobTitle,
      signatureImage: modelsReducer.signatureImage,
      template: modelsReducer.template
    }
    if (modelsReducer.id > 0) {
      dispatch(actions.update(modelsReducer.id, model))
    } else {
      dispatch(actions.create(model))
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
        <Typography variant='h1'>Certificate model</Typography>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader title='Badge information' />
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
                    <img src={modelsReducer.image} alt={modelsReducer.name} />
                  </div>
                )}
                <input type='file' onChange={event => handleImageChange('image', event)} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={3}>
        <Card>
          <CardHeader title='Signature information' />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  id='signatureJobTitle'
                  label='Signature job title'
                  type='text'
                  value={modelsReducer.signatureJobTitle}
                  onChange={event => dispatch(actions.setValue('signatureJobTitle', event.target.value))}
                  required
                  fullWidth
                >
                  Signature job title
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Signature image</Typography>
                {modelsReducer.signatureImage !== '' && (
                  <div>
                    <img src={modelsReducer.signatureImage} alt={modelsReducer.signatureJobTitle} />
                  </div>
                )}
                <input type='file' onChange={event => handleImageChange('signatureImage', event)} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={3}>
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
