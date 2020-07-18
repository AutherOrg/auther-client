import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Resizer from 'react-image-file-resizer'
import {
  Button,
  Card, CardHeader, CardContent, CardActions,
  Dialog, DialogTitle, DialogActions, DialogContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List, ListItem, ListItemText, ListItemSecondaryAction,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Add, Close, Delete, Save } from '@material-ui/icons'

import templates from '../../templates/templates'
import signaturesActions from '../../actions/signatures.actions'
import modelsActions from '../../actions/models.actions'

const useStyles = makeStyles(theme => ({
  modelImage: {
    width: '100%',
    maxWidth: '400px',
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
          dispatch(modelsActions.setValue(name, uri))
        }
      )
    }
  }

  const hasSignature = signature => {
    return modelsReducer.Signatures.findIndex(e => e.id === signature.id) > -1
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
      name: modelsReducer.name,
      description: modelsReducer.description,
      image: modelsReducer.image,
      signatures: modelsReducer.signatures,
      template: modelsReducer.template
    }
    if (modelsReducer.id > 0) {
      dispatch(modelsActions.update(modelsReducer.id, model))
    } else {
      dispatch(modelsActions.create(model))
    }
  }

  React.useEffect(() => {
    dispatch(signaturesActions.getMany())
    const { id } = match.params
    if (id > 0) {
      dispatch(modelsActions.getOne(id))
    } else {
      dispatch(modelsActions.reset())
    }
  }, [dispatch, match.params])

  return (
    <>
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
                    onChange={event => dispatch(modelsActions.setValue('name', event.target.value))}
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
                    onChange={event => dispatch(modelsActions.setValue('description', event.target.value))}
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
                  <input type='file' onChange={event => handleImageChange('image', 1000, 400, 'PNG', 100, event)} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card>
            <CardHeader title='Signature(s)' />
            <CardContent>
              <List>
                {modelsReducer.Signatures.map((Signature, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={Signature.name}
                      secondary={Signature.jobTitle}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() => dispatch(modelsActions.removeSignature(Signature))}
                        edge='end'
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => dispatch(modelsActions.toggleSignatureDialog())}
                color='primary'
                startIcon={<Add />}
              >
                Add signature
              </Button>
            </CardActions>
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
                      onChange={event => dispatch(modelsActions.setValue('template', event.target.value))}
                    >
                      {templates.map((template, index) => (
                        <MenuItem key={index} value={template.name}>
                          {template.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
      <Dialog open={modelsReducer.signatureDialog}>
        <DialogTitle>
          Click on a signature to add it
        </DialogTitle>
        <DialogContent>
          <List>
            {signaturesReducer.signatures.map((signature, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={signature.name}
                  secondary={signature.jobTitle}
                />
                <ListItemSecondaryAction>
                  {!hasSignature(signature) && (
                    <IconButton
                      onClick={() => dispatch(modelsActions.addSignature(signature))}
                      edge='end'
                    >
                      <Add />
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => dispatch(modelsActions.toggleSignatureDialog())}
            startIcon={<Close />}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
