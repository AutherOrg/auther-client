import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CSVReader from 'react-csv-reader'
import { Certificate } from 'blockcerts-issuer-helper'
import {
  Button,
  CircularProgress,
  Card, CardHeader, CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table, TableHead, TableBody, TableRow, TableCell,
  Typography
} from '@material-ui/core'
import { Save } from '@material-ui/icons'

import actions from '../../actions/batches.actions'
import modelActions from '../../actions/models.actions'
import constants from '../../constants/batches.constants'
import templates from '../../templates/index.templates'

export default function CreateBatch () {
  const dispatch = useDispatch()

  const issuersReducer = useSelector(state => state.issuersReducer)
  const batchesReducer = useSelector(state => state.batchesReducer)
  const modelsReducer = useSelector(state => state.modelsReducer)

  const getPreview = () => {
    const recipient = batchesReducer.recipients[0]
    const certificate = buildCertificate(recipient)
    return <div dangerouslySetInnerHTML={{ __html: certificate.get().displayHtml }} />
  }

  const buildCertificate = recipient => {
    const issuer = {
      id: issuersReducer.issuerProfileUrl,
      name: issuersReducer.name,
      url: issuersReducer.url,
      email: issuersReducer.email,
      description: issuersReducer.description,
      image: issuersReducer.image
    }
    const model = modelsReducer.models.find(e => e.id === batchesReducer.modelId)
    const template = templates.find(e => e.name === model.template)
    const certificate = new Certificate({
      recipient: {
        identity: recipient.email
      },
      badge: {
        name: model.name,
        description: model.description,
        image: model.name,
        criteria: {
          narrative: model.narrative
        },
        issuer,
        signatureLines: {
          jobTitle: model.signatureJobTitle,
          image: model.signatureImage
        }
      },
      recipientProfile: {
        name: `${recipient.firstname} ${recipient.lastname}`
      }
    })
    const displayHtml = template.build(certificate.get())
    certificate.setDisplayHtml(displayHtml)
    return certificate
  }

  const buildCertificates = () => {
    return batchesReducer.recipients.map(recipient => {
      return buildCertificate(recipient)
    })
  }

  const isValidCsv = () => {
    return (
      batchesReducer.recipients.length > 0 &&
      (batchesReducer.recipients.map(recipient => {
        return (
          recipient.firstname && recipient.firstname !== '' &&
          recipient.lastname && recipient.lastname !== '' &&
          recipient.email && recipient.email !== ''
        )
      }))
    )
  }

  const isComplete = () => {
    return (
      isValidCsv() &&
      batchesReducer.modelId > 0
    )
  }

  const canSubmit = () => {
    return (
      batchesReducer.hasChanged &&
      isComplete()
    )
  }

  const submit = () => {
    const model = {
      status: constants.STATUS.ACTIVE,
      name: batchesReducer.name,
      description: batchesReducer.description,
      image: batchesReducer.image,
      narrative: batchesReducer.narrative,
      signatureJobTitle: batchesReducer.signatureJobTitle,
      signatureImage: batchesReducer.signatureImage,
      template: batchesReducer.template
    }
    if (batchesReducer.id > 0) {
      dispatch(actions.update(batchesReducer.id, model))
    } else {
      dispatch(actions.create(model))
    }
  }

  React.useEffect(() => {
    dispatch(actions.reset())
    dispatch(modelActions.getAll())
  }, [dispatch])

  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12} align='center'>
        <Typography variant='h1'>Create certificates batch</Typography>
      </Grid>
      {batchesReducer.isRunning && (
        <Grid item xs={12} align='center'>
          <CircularProgress />
        </Grid>
      )}
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader title='Recipients' />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography>Select a CSV file</Typography>
                <CSVReader
                  onFileLoaded={(data, fileName) => dispatch(actions.setValue('recipients', data))}
                  parserOptions={{
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                    transformHeader: header =>
                      header
                        .toLowerCase()
                        .replace(/\W/g, '')
                  }}
                  inputId='csv'
                />
              </Grid>
              {batchesReducer.recipients.length > 0 && (
                <Grid item xs={12}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>First name</TableCell>
                        <TableCell>Last name</TableCell>
                        <TableCell>Email</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {batchesReducer.recipients.slice(0, 5).map((recipient, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{recipient.firstname}</TableCell>
                          <TableCell>{recipient.lastname}</TableCell>
                          <TableCell>{recipient.email}</TableCell>
                        </TableRow>
                      ))}
                      {batchesReducer.recipients.length > 5 && (
                        <>
                          <TableRow>
                            <TableCell>...</TableCell>
                            <TableCell>...</TableCell>
                            <TableCell>...</TableCell>
                            <TableCell>...</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>{batchesReducer.recipients.length}</TableCell>
                            <TableCell>{batchesReducer.recipients[batchesReducer.recipients.length - 1].firstname}</TableCell>
                            <TableCell>{batchesReducer.recipients[batchesReducer.recipients.length - 1].lastname}</TableCell>
                            <TableCell>{batchesReducer.recipients[batchesReducer.recipients.length - 1].email}</TableCell>
                          </TableRow>
                        </>
                      )}
                    </TableBody>
                  </Table>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader title='Model' />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='modelLabel'>
                    Select a model
                  </InputLabel>
                  <Select
                    labelId='modelLabel'
                    id='model'
                    value={batchesReducer.modelId}
                    onChange={event => dispatch(actions.setValue('modelId', event.target.value))}
                  >
                    {modelsReducer.models.map((model, index) => (
                      <MenuItem key={index} value={model.id}>
                        {model.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {isComplete() && (
                <Grid item xs={12}>
                  {getPreview()}
                </Grid>
              )}
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
