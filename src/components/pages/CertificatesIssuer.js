import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { formatRelative, parseISO } from 'date-fns'
import slugify from 'slugify'
import { saveAs } from 'file-saver'
import {
  Button,
  Card, CardContent, CardHeader, CardActions,
  Fab,
  Grid,
  Table, TableBody, TableCell, TableHead, TableRow,
  Typography
} from '@material-ui/core'
import { Add, AddCircle, CloudDownload, Link, RemoveCircle, School } from '@material-ui/icons'

import actions from '../../actions/certificates.actions'
import constants from '../../constants/certificates.constants'
import revocationsActions from '../../actions/revocations.actions'
import CertificateDialog from '../organisms/CertificateDialog'

export default function CertificatesIssuer () {
  const dispatch = useDispatch()
  const certificatesReducer = useSelector(state => state.certificatesReducer)
  const certificateReducer = useSelector(state => state.certificateReducer)
  const revocationsReducer = useSelector(state => state.revocationsReducer)

  const handleDownload = certificate => {
    saveAs(
      new window.Blob([JSON.stringify(certificate)], { type: 'application/json;charset=utf-8' }),
      slugify(`${certificate.badge.name} ${certificate.recipientProfile.name}.json`)
    )
  }

  const isRevoked = certificate => {
    return revocationsReducer.revocations.findIndex(e => e.certificateId === certificate.id) > -1
  }

  const handleRevoke = certificateId => {
    dispatch(revocationsActions.create({
      certificateId,
      revocationReason: 'Revoked by the issuer.'
    }))
  }

  const handleUnrevoke = certificateId => {
    const revocation = revocationsReducer.revocations.find(e => e.certificateId === certificateId)
    if (revocation) {
      dispatch(revocationsActions.destroy(revocation.id))
    }
  }

  React.useEffect(() => {
    dispatch(actions.getMany())
    dispatch(revocationsActions.getMany())
  }, [dispatch])

  return (
    <>
      <Grid container spacing={5} justify='center'>
        <Grid item xs={12} align='center'>
          <Typography variant='h1' gutterBottom>Certificates</Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title='Create new certificates batch'
              avatar={
                <Fab
                  onClick={() => dispatch(push('/batches/create'))}
                  color='primary'
                >
                  <Add />
                </Fab>
              }
            />
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Creator</TableCell>
                    <TableCell>Recipient</TableCell>
                    <TableCell>Certificate</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {certificatesReducer.certificates.map((certificate, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatRelative(parseISO(certificate.createdAt), new Date())}</TableCell>
                      <TableCell>{certificate.Creator.email}</TableCell>
                      <TableCell>{certificate.Recipient.email}</TableCell>
                      <TableCell>{certificate.json.badge.name}</TableCell>
                      <TableCell>
                        {certificate.status === constants.STATUS.SHARED ? 'Shared' : 'Not shared'}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleDownload(certificate.json)}
                          startIcon={<CloudDownload />}
                          color='primary'
                        >
                          Download
                        </Button>
                        <Button
                          onClick={() => dispatch(actions.setCertificate(certificate))}
                          startIcon={<School />}
                          color='primary'
                        >
                          View
                        </Button>
                        {certificate.status === constants.STATUS.SHARED && (
                          <Button
                            href={`/certificates/shared/${certificate.sharingUuid}`}
                            target='shared'
                            rel='noopener noreferrer'
                            startIcon={<Link />}
                            color='primary'
                          >
                            Link
                          </Button>
                        )}
                        {
                          isRevoked(certificate)
                            ? (
                              <Button
                                onClick={() => handleUnrevoke(certificate.id)}
                                startIcon={<AddCircle />}
                                color='primary'
                              >
                                Unrevoke
                              </Button>
                            )
                            : (
                              <Button
                                onClick={() => handleRevoke(certificate.id)}
                                startIcon={<RemoveCircle />}
                                color='primary'
                              >
                                Revoke
                              </Button>
                            )
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => dispatch(push('/certificates/my'))}
                color='primary'
                startIcon={<Link />}
              >
                View your certificates as a recipient
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      {certificateReducer.id > 0 && <CertificateDialog />}
    </>
  )
}
