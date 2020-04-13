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
import { Check, CloudDownload, Create, Error } from '@material-ui/icons'

import db from '../../providers/dexie/db.dexie'
import backdropActions from '../../actions/backdrop.actions'
import batchesActions from '../../actions/batches.actions'
import issuersActions from '../../actions/issuers.actions'
import revokedActions from '../../actions/revoked.actions'
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
  const revokedReducer = useSelector(state => state.revokedReducer)
  const [apiStatus, setApiStatus] = React.useState(false)
  const [issuerStatus, setIssuerStatus] = React.useState(false)
  const [web3Status, setWeb3Status] = React.useState(false)
  const context = useWeb3React()
  const { account } = context

  const handleCheckApi = async () => {
    if (authReducer.hasApi) {
      const response = await window.fetch(process.env.REACT_APP_API)
      if (response.status === 200) {
        setApiStatus(true)
      }
    }
  }

  const handleCheckIssuer = async () => {
    if (issuersReducer.hasIssuer) {
      const response = await window.fetch(issuersReducer.issuerProfileUrl)
      if (response.status === 200) {
        setIssuerStatus(true)
      }
    }
  }

  const handleCheckWeb3 = () => {
    if (issuersReducer.hasIssuer && context.active) {
      if (issuersReducer.publicKey.toLowerCase() === account.toLowerCase()) {
        setWeb3Status(true)
      }
    }
  }

  React.useEffect(
    () => {
      handleCheckApi()
      handleCheckIssuer()
      handleCheckWeb3()
      dispatch(batchesActions.get())
      dispatch(issuersActions.getMy())
      dispatch(revokedActions.get())
    },
    // eslint-disable-next-line
    [dispatch, context]
  )

  const handleDownloadIssuerProfile = () => {
    const issuer = {
      '@context': [
        'https://w3id.org/openbadges/v2',
        'https://w3id.org/blockcerts/v2'
      ],
      type: 'Profile',
      id: issuersReducer.issuerProfileUrl,
      name: issuersReducer.name,
      email: issuersReducer.email,
      url: issuersReducer.url,
      introductionURL: issuersReducer.introductionUrl,
      publicKey: [
        {
          id: issuersReducer.publicKey,
          created: '2019-10-25T10:51:53.490752+00:00'
        }
      ],
      revocationList: issuersReducer.revocationListUrl,
      image: issuersReducer.image
    }
    saveAs(
      new window.Blob([JSON.stringify(issuer)], { type: 'application/json;charset=utf-8' }),
      'issuer.json'
    )
  }

  const handleDownloadRevocationList = () => {
    const revokedAssertions = revokedReducer.revoked.map(revokedAssertion => {
      return {
        id: revokedAssertion.certificateId,
        revocationReason: revokedAssertion.revocationReason
      }
    })
    const revocation = {
      '@context': 'https://w3id.org/openbadges/v2',
      id: issuersReducer.revocationListUrl,
      type: 'RevocationList',
      issuer: issuersReducer.issuerProfileUrl,
      revokedAssertions
    }
    saveAs(
      new window.Blob([JSON.stringify(revocation)], { type: 'application/json;charset=utf-8' }),
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
      'OpenBlockcertsIndexedDB.json'
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
                  {authReducer.hasApi && (
                    <TableRow>
                      <TableCell>API</TableCell>
                      <TableCell>
                        {apiStatus ? <Check /> : <Error />}
                      </TableCell>
                      <TableCell>
                        {apiStatus ? 'The API server is available.' : 'The API server is NOT available'}
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell>Local issuer profile</TableCell>
                    <TableCell>
                      {issuersReducer.hasIssuer ? <Check /> : <Error />}
                    </TableCell>
                    <TableCell>
                      {issuersReducer.hasIssuer ? 'Your local issuer profile is available.' : 'You have no local issuer profile.'}
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
            <CardHeader title='Current operations' classes={{ root: classes.cardHeaderRoot }} />
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} lg={6}>
                  <Card>
                    <CardHeader title='Certificates' />
                    <CardActions>
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
                <Grid item xs={12} lg={6}>
                  <Card>
                    <CardHeader
                      title='Revocation list'
                      classes={{ root: classes.cardHeaderRoot }}
                    />
                    <CardActions>
                      <Button
                        onClick={() => handleDownloadRevocationList()}
                        startIcon={<CloudDownload />}
                        color='primary'
                      >
                        Download local revocation list
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Initial setup' classes={{ root: classes.cardHeaderRoot }} />
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} lg={6}>
                  <Card>
                    <CardHeader title='Import preconfigured local database' />
                    <CardContent>
                      <Typography color='error'>
                        WARNING: This will replace your local database. If you already have some data for this application, it will be lost.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <input type='file' onChange={handleImportDb} />
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Advanced' classes={{ root: classes.cardHeaderRoot }} />
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
                onClick={() => handleExportDb()}
                startIcon={<CloudDownload />}
                color='primary'
              >
                Export local database
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Web3Wrapper>
  )
}
