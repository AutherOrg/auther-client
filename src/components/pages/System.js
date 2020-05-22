import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { useWeb3React } from '@web3-react/core'
import { exportDB, importDB } from 'dexie-export-import'
import slugify from 'slugify'
import Jszip from 'jszip'
import { saveAs } from 'file-saver'
import {
  Button,
  Card, CardHeader, CardContent, CardActions,
  Grid,
  Table, TableHead, TableBody, TableRow, TableCell,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Check, CloudDownload, CloudUpload, Create, Error, Storage } from '@material-ui/icons'

import db from '../../providers/dexie/db.dexie'
import backdropActions from '../../actions/backdrop.actions'
import batchesActions from '../../actions/batches.actions'
import issuersActions from '../../actions/issuers.actions'
import blockcertsActions from '../../actions/blockcerts.actions'
import usersConstants from '../../constants/users.constants'
import Web3Wrapper from '../web3/Web3Wrapper'

const useStyles = makeStyles(theme => ({
  cardHeaderRoot: {
    textTransform: 'uppercase'
  },
  typographyRoot: {
    wordWrap: 'break-word'
  }
}))

export default function System () {
  const classes = useStyles()
  const dispatch = useDispatch()
  const authReducer = useSelector(state => state.authReducer)
  const batchesReducer = useSelector(state => state.batchesReducer)
  const issuersReducer = useSelector(state => state.issuersReducer)
  const blockcertsReducer = useSelector(state => state.blockcertsReducer)
  const [apiStatus, setApiStatus] = React.useState(false)
  const [issuerStatus, setIssuerStatus] = React.useState(false)
  const [revocationsStatus, setRevocationsStatus] = React.useState(false)
  const [web3Status, setWeb3Status] = React.useState(false)
  const context = useWeb3React()
  const { account } = context

  const handleCheckApi = async () => {
    const response = await window.fetch(process.env.REACT_APP_API)
    if (response.status === 200) {
      setApiStatus(true)
    }
  }

  const handleCheckIssuer = async () => {
    try {
      const response = await window.fetch(issuersReducer.issuerProfileUrl)
      if (response.status === 200) {
        setIssuerStatus(true)
      }
    } catch (e) {
      setIssuerStatus(false)
    }
  }

  const handleCheckRevocations = async () => {
    try {
      const response = await window.fetch(issuersReducer.revocationListUrl)
      if (response.status === 200) {
        setRevocationsStatus(true)
      }
    } catch (e) {
      setRevocationsStatus(false)
    }
  }

  const handleCheckWeb3 = () => {
    if (context.active) {
      if (issuersReducer.publicKey.toLowerCase() === account.toLowerCase()) {
        setWeb3Status(true)
      }
    }
  }

  React.useEffect(
    () => {
      handleCheckApi()
      handleCheckIssuer()
      handleCheckRevocations()
      handleCheckWeb3()
      dispatch(batchesActions.get())
      dispatch(issuersActions.get())
      dispatch(blockcertsActions.getIssuer())
      dispatch(blockcertsActions.getRevocations())
    },
    // eslint-disable-next-line
    [dispatch, context]
  )

  const handleDownloadIssuerProfile = () => {
    const issuer = blockcertsReducer.issuer
    saveAs(
      new window.Blob([JSON.stringify(issuer)], { type: 'application/json;charset=utf-8' }),
      'issuer.json'
    )
  }

  const handleDownloadRevocationList = () => {
    const revocationList = blockcertsReducer.revocations
    saveAs(
      new window.Blob([JSON.stringify(revocationList)], { type: 'application/json;charset=utf-8' }),
      'revocation.json'
    )
  }

  const handleBackupCertificates = async () => {
    const zip = new Jszip()
    const certificates = batchesReducer.batches.flatMap(batch => {
      const { certificates } = JSON.parse(batch.certificates)
      return certificates
    })
    certificates.forEach((certificate, index) => {
      zip.file(
        slugify(`${certificate.badge.name} ${certificate.recipientProfile.name} ${index}.json`),
        JSON.stringify(certificate)
      )
    })
    const blob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 9
      }
    })
    saveAs(blob, 'Certificates.zip')
  }

  const handleExportDb = async () => {
    const file = await exportDB(db)
    saveAs(
      new window.Blob([file], { type: 'application/json;charset=utf-8' }),
      'AutherIndexedDB.json'
    )
  }

  const handleImportDb = async event => {
    if (event && event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      dispatch(backdropActions.create())
      await db.delete()
      await importDB(file, {
        progressCallback
      })
      await db.open()
      dispatch(backdropActions.close())
    }
  }

  const progressCallback = ({ totalRows, completedRows }) => {
    console.log(`Progress: ${completedRows} of ${totalRows} rows completed`)
  }

  return (
    <Web3Wrapper>
      <Grid container spacing={5} justify='center'>
        <Grid item xs={12} align='center'>
          <Typography variant='h1'>System</Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title='System verification'
              classes={{ root: classes.cardHeaderRoot }}
            />
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Component</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>API</TableCell>
                    <TableCell>
                      {apiStatus ? <Check /> : <Error />}
                    </TableCell>
                    <TableCell>
                      {apiStatus ? 'The API server is available.' : 'The API server is NOT available'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Online issuer profile</TableCell>
                    <TableCell>
                      {issuerStatus ? <Check /> : <Error />}
                    </TableCell>
                    <TableCell>
                      {issuerStatus ? 'The online issuer profile is available.' : 'The online issuer profile is not available.'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Online revocation list</TableCell>
                    <TableCell>
                      {revocationsStatus ? <Check /> : <Error />}
                    </TableCell>
                    <TableCell>
                      {revocationsStatus ? 'The online revocation list is available.' : 'The online revocation list is not available.'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Ethereum account</TableCell>
                    <TableCell>
                      {web3Status ? <Check /> : <Error />}
                    </TableCell>
                    <TableCell>
                      {web3Status ? 'Your Ethereum account is available.' : 'Your Ethereum account is not the same as the Ethereum public key declared in your issuer profile.'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Local batches and certificates' classes={{ root: classes.cardHeaderRoot }} />
            <CardActions>
              <Button
                onClick={() => dispatch(push('/batches'))}
                startIcon={<Storage />}
                color='primary'
              >
                Explore local certificates batches
              </Button>
              <Button
                onClick={() => handleBackupCertificates()}
                startIcon={<CloudDownload />}
                color='primary'
              >
                Download local certificates
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Advanced' classes={{ root: classes.cardHeaderRoot }} />
            <CardActions>
              <Button
                onClick={() => handleExportDb()}
                startIcon={<CloudDownload />}
                color='primary'
              >
                Export local database
              </Button>
              <>
                <input
                  type='file'
                  accept='application/json'
                  id='import'
                  onChange={handleImportDb}
                  style={{ display: 'none' }}
                />
                <Button
                  htmlFor='import'
                  component='label'
                  startIcon={<CloudUpload />}
                  color='primary'
                >
                  Import local database
                </Button>
              </>
            </CardActions>
          </Card>
        </Grid>
        {
          authReducer.role === usersConstants.role.ADMIN && (
            <Grid item xs={12}>
              <Card>
                <CardHeader title='Administration' classes={{ root: classes.cardHeaderRoot }} />
                <CardActions>
                  <Button
                    onClick={() => dispatch(push('/system/issuer'))}
                    startIcon={<Create />}
                    color='primary'
                  >
                    Edit issuer profile
                  </Button>
                  <Button
                    onClick={() => handleDownloadIssuerProfile()}
                    startIcon={<CloudDownload />}
                    color='primary'
                  >
                    Download issuer profile
                  </Button>
                  <Button
                    onClick={() => handleDownloadRevocationList()}
                    startIcon={<CloudDownload />}
                    color='primary'
                  >
                    Download revocation list
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        }
      </Grid>
    </Web3Wrapper>
  )
}
