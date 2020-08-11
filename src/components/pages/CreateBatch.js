import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CSVReader from 'react-csv-reader'
import { Certificate } from 'blockcerts-issuer-helper'
import { useWeb3React } from '@web3-react/core'
import {
  Button,
  Card, CardHeader, CardContent,
  Divider,
  FormControl, FormControlLabel, FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio, RadioGroup,
  Select,
  Table, TableHead, TableBody, TableRow, TableCell,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Add, Attachment, Edit, Save } from '@material-ui/icons'

import batchesActions from '../../actions/batches.actions'
import issuersActions from '../../actions/issuers.actions'
import modelActions from '../../actions/models.actions'
import transactionsActions from '../../actions/transactions.actions'
import ethereumConstants from '../../constants/ethereum.constants'
import templates from '../../templates/templates'
import RecipientsFromSource from '../organisms/RecipientsFromSource'
import Web3Wrapper from '../web3/Web3Wrapper'
import Transaction from '../organisms/Transaction'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2)
  },
  dividerRoot: {
    height: '5px',
    backgroundColor: theme.palette.primary.main
  }
}))

export default function CreateBatch () {
  const classes = useStyles()
  const dispatch = useDispatch()
  const issuersReducer = useSelector(state => state.issuersReducer)
  const batchesReducer = useSelector(state => state.batchesReducer)
  const modelsReducer = useSelector(state => state.modelsReducer)
  const transactionsReducer = useSelector(state => state.transactionsReducer)
  const context = useWeb3React()

  const { account, library } = context

  const getCertificatePreview = index => {
    const recipient = batchesReducer.recipients[index]
    const certificate = buildCertificate(recipient)
    return <div dangerouslySetInnerHTML={{ __html: certificate.get().displayHtml }} />
  }

  const getPreview = () => {
    if (batchesReducer.preview === 'all') {
      return batchesReducer.recipients.map((recipient, index) => (
        <div key={index}>
          {getCertificatePreview(index)}
          <Divider classes={{ root: classes.dividerRoot }} />
        </div>
      ))
    }
    return getCertificatePreview(0)
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
        image: model.image,
        criteria: {
          narrative: model.narrative
        },
        issuer
      },
      recipientProfile: {
        name: recipient.name
      },
      verification: {
        publicKey: issuersReducer.publicKey
      }
    })
    certificate.setSignatureLines(model.Signatures)
    const displayHtml = template.build(certificate.get())
    certificate.setDisplayHtml(displayHtml)
    return certificate
  }

  const buildCertificates = () => {
    return batchesReducer.recipients.map(recipient => {
      return buildCertificate(recipient)
    })
  }

  const hasRecipients = () => {
    return batchesReducer.recipients.length > 0
  }

  const canEdit = () => {
    return (
      !batchesReducer.isSet
    )
  }

  const isComplete = () => {
    return (
      hasRecipients() &&
      batchesReducer.modelId > 0
    )
  }

  const isRunning = () => {
    return (
      batchesReducer.isRunning ||
      modelsReducer.isRunning ||
      transactionsReducer.isRunning
    )
  }

  const canSet = () => {
    return (
      batchesReducer.hasChanged &&
      !batchesReducer.isSigned &&
      isComplete() &&
      !isRunning() &&
      !canSign()
    )
  }

  const handleSet = () => {
    dispatch(batchesActions.set(buildCertificates()))
  }

  const canSign = () => {
    return (
      batchesReducer.isSet &&
      !batchesReducer.isSigned &&
      !isRunning()
    )
  }

  const handleSign = () => {
    const tx = {
      to: ethereumConstants.BURN_ADDRESS,
      gasLimit: ethereumConstants.GAS_LIMIT,
      data: '0x' + batchesReducer.merkleTreeRoot
    }
    dispatch(transactionsActions.send(tx, account, library))
  }

  const canFinalize = () => {
    return (
      batchesReducer.isSigned
    )
  }

  const handleFinalize = () => {
    dispatch(batchesActions.sign(
      batchesReducer.certificates,
      transactionsReducer.hash,
      ethereumConstants.NETWORK.CHAIN[context.chainId],
      batchesReducer.postFinalizationJob
    ))
  }

  React.useEffect(() => {
    dispatch(batchesActions.reset())
    dispatch(issuersActions.get())
    dispatch(modelActions.getMany({ withSignatures: true }))
  }, [dispatch])

  return (
    <Web3Wrapper>
      <Grid container spacing={5} justify='center'>
        <Grid item xs={12} align='center'>
          <Typography variant='h1'>Create certificates batch</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title='Recipients' />
            <CardContent>
              <Grid container spacing={5}>
                {canEdit() && (
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='CSV file method' avatar={<Attachment />} />
                      <CardContent>
                        <Typography>Select a CSV file</Typography>
                        <CSVReader
                          onFileLoaded={(data, fileName) => dispatch(batchesActions.loadRecipients(data))}
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
                      </CardContent>
                    </Card>
                  </Grid>
                )}
                {canEdit() && <RecipientsFromSource />}
                {batchesReducer.recipients.length > 0 && (
                  <Grid item xs={12}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {batchesReducer.recipients.slice(0, 5).map((recipient, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{recipient.name}</TableCell>
                            <TableCell>{recipient.email}</TableCell>
                          </TableRow>
                        ))}
                        {batchesReducer.recipients.length > 5 && (
                          <>
                            <TableRow>
                              <TableCell>...</TableCell>
                              <TableCell>...</TableCell>
                              <TableCell>...</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>{batchesReducer.recipients.length}</TableCell>
                              <TableCell>{batchesReducer.recipients[batchesReducer.recipients.length - 1].name}</TableCell>
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
                {canEdit() && (
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id='modelLabel'>
                        Select a model
                      </InputLabel>
                      <Select
                        labelId='modelLabel'
                        id='model'
                        value={batchesReducer.modelId}
                        onChange={event => dispatch(batchesActions.setValue('modelId', event.target.value))}
                        disabled={!canEdit()}
                      >
                        {modelsReducer.models.map((model, index) => (
                          <MenuItem key={index} value={model.id}>
                            {model.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                {isComplete() && (
                  <>
                    <Grid item xs={12}>
                      <FormControl component='fieldset' className={classes.formControl}>
                        <FormLabel component='legend'>Preview</FormLabel>
                        <RadioGroup name='gender1' value={batchesReducer.preview} onChange={event => dispatch(batchesActions.setPreview(event.target.value))}>
                          <FormControlLabel value='first' control={<Radio />} label='First recipient only' />
                          <FormControlLabel value='all' control={<Radio />} label='All recipients' />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      {getPreview()}
                    </Grid>
                  </>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} align='center'>
          <Button
            onClick={() => handleSet()}
            disabled={!canSet()}
            variant='contained'
            color='primary'
            startIcon={<Add />}
            classes={{ root: classes.button }}
          >
            Create
          </Button>
          <Button
            onClick={() => handleSign()}
            disabled={!canSign()}
            variant='contained'
            color='primary'
            startIcon={<Edit />}
            classes={{ root: classes.button }}
          >
            Sign
          </Button>
          <Button
            onClick={() => handleFinalize()}
            disabled={!canFinalize()}
            variant='contained'
            color='primary'
            startIcon={<Save />}
            classes={{ root: classes.button }}
          >
            Finalize
          </Button>
        </Grid>
      </Grid>
      <Transaction />
    </Web3Wrapper>
  )
}
