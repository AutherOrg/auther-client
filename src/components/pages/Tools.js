import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { exportDB, importDB } from 'dexie-export-import'
import downloadjs from 'downloadjs'
import {
  Button,
  Card, CardHeader, CardContent, CardActions,
  Grid,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CloudDownload } from '@material-ui/icons'

import db from '../../providers/dexie/db.dexie'
import backdropActions from '../../actions/backdrop.actions'
import batchesActions from '../../actions/batches.actions'
import issuersActions from '../../actions/issuers.actions'
import revokedActions from '../../actions/revoked.actions'

const useStyles = makeStyles(theme => ({
  cardHeaderRoot: {
    textTransform: 'uppercase'
  },
  typographyRoot: {
    wordWrap: 'break-word'
  }
}))

export default function Tools () {
  const classes = useStyles()
  const dispatch = useDispatch()
  const batchesReducer = useSelector(state => state.batchesReducer)
  const issuersReducer = useSelector(state => state.issuersReducer)
  const revokedReducer = useSelector(state => state.revokedReducer)

  const handleDownloadIssuerProfile = () => {
    const json = {
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
    const stringified = JSON.stringify(json)
    downloadjs(stringified, 'issuer.json', 'text/plain')
  }

  const handleDownloadRevocationList = () => {
    const revokedAssertions = revokedReducer.revoked.map(revokedAssertion => {
      return {
        id: revokedAssertion.certificateId,
        revocationReason: revokedAssertion.revocationReason
      }
    })
    const json = {
      '@context': 'https://w3id.org/openbadges/v2',
      id: issuersReducer.revocationListUrl,
      type: 'RevocationList',
      issuer: issuersReducer.issuerProfileUrl,
      revokedAssertions
    }
    const stringified = JSON.stringify(json)
    downloadjs(stringified, 'revocation.json', 'text/plain')
  }

  const handleBackupCertificates = () => {
    const json = batchesReducer.batches.flatMap(batch => {
      const { certificates } = JSON.parse(batch.certificates)
      return certificates
    })
    const stringified = JSON.stringify(json)
    downloadjs(stringified, 'certificates.json', 'text/plain')
  }

  const handleExportDb = async () => {
    const file = await exportDB(db)
    downloadjs(file, 'OpenBlockcerts.json', 'application/json')
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

  React.useEffect(() => {
    dispatch(batchesActions.get())
    dispatch(issuersActions.getMy())
    dispatch(revokedActions.get())
  }, [dispatch])

  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12} align='center'>
        <Typography variant='h1'>Tools</Typography>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader title='Profile and revocation list' classes={{ root: classes.cardHeaderRoot }} />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Card>
                  <CardHeader title='Issuer profile' />
                  <CardContent>
                    <Typography color='error' classes={{ root: classes.typographyRoot }}>
                      {`This file must be uploaded to this EXACT location: ${issuersReducer.issuerProfileUrl}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => handleDownloadIssuerProfile()}
                      startIcon={<CloudDownload />}
                      color='primary'
                    >
                      Download
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardHeader title='Revocation list JSON' />
                  <CardContent>
                    <Typography color='error' classes={{ root: classes.typographyRoot }}>
                      {`This file must be uploaded to this EXACT location: ${issuersReducer.revocationListUrl}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => handleDownloadRevocationList()}
                      startIcon={<CloudDownload />}
                      color='primary'
                    >
                      Download
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader title='Import / export' classes={{ root: classes.cardHeaderRoot }} />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Card>
                  <CardHeader title='Export certificates' />
                  <CardContent>
                    <Typography>
                      This file contains all the issued certificates.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => handleBackupCertificates()}
                      startIcon={<CloudDownload />}
                      color='primary'
                    >
                      Download
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardHeader title='Export local DB' />
                  <CardContent>
                    <Typography>
                      Export the local database of the browser (IndexedDB) to a file.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => handleExportDb()}
                      startIcon={<CloudDownload />}
                      color='primary'
                    >
                      Export
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardHeader title='Import local DB' />
                  <CardContent>
                    <Typography paragraph>
                      Import the local database of the browser (IndexedDB) from a file.
                    </Typography>
                    <Typography color='error'>
                      WARNING: This will replace ALL the local data.
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
    </Grid>
  )
}
