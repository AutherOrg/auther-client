import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatRelative, fromUnixTime } from 'date-fns'
import slugify from 'slugify'
import { saveAs } from 'file-saver'
import {
  Button,
  Grid,
  Paper,
  TableContainer, Table, TableBody, TableCell, TableHead, TableRow,
  Typography
} from '@material-ui/core'
import { AddCircle, CloudDownload, RemoveCircle, School } from '@material-ui/icons'

import actions from '../../actions/batch.actions'
import revocationsActions from '../../actions/revocations.actions'
import constants from '../../constants/batches.constants'
import CertificateDialog from '../organisms/CertificateDialog'

export default function Batch ({ match }) {
  const dispatch = useDispatch()
  const batchReducer = useSelector(state => state.batchReducer)
  const certificateReducer = useSelector(state => state.certificateReducer)
  const revocationsReducer = useSelector(state => state.revocationsReducer)

  React.useEffect(() => {
    dispatch(actions.get(match.params.id))
    dispatch(revocationsActions.getMany())
  }, [dispatch, match.params.id])

  if (batchReducer.status === constants.STATUS.EMPTY) {
    return null
  }

  const { certificates } = JSON.parse(batchReducer.certificates)

  const handleDownload = certificate => {
    saveAs(
      new window.Blob([JSON.stringify(certificate)], { type: 'application/json;charset=utf-8' }),
      slugify(`${certificate.badge.name} ${certificate.recipientProfile.name}.json`)
    )
  }

  const isRevoked = certificate => {
    return revocationsReducer.revocations.findIndex(e => e.blockcertsUuid === certificate.id) > -1
  }

  const handleRevoke = certificate => {
    dispatch(revocationsActions.create({
      blockcertsUuid: certificate.id
    }))
  }

  const handleUnrevoke = certificate => {
    const revocation = revocationsReducer.revocations.find(e => e.blockcertsUuid === certificate.id)
    dispatch(revocationsActions.destroy(revocation.id))
  }

  return (
    <>
      <Grid container spacing={5} justify='center'>
        <Grid item xs={12} align='center'>
          <Typography variant='h1'>
            {`Batch #${match.params.id}`}
          </Typography>
          <Typography gutterBottom>Created {formatRelative(fromUnixTime(batchReducer.created), new Date())}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Certificate name</TableCell>
                  <TableCell>Recipient</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {certificates.length > 0 && certificates.map((certificate, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {certificate.badge.name}
                    </TableCell>
                    <TableCell>
                      {`${certificate.recipientProfile.name} (${certificate.recipient.identity})`}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => dispatch(actions.getCertificate(certificate))}
                        startIcon={<School />}
                        color='primary'
                      >
                        View
                      </Button>
                      <Button
                        onClick={() => handleDownload(certificate)}
                        startIcon={<CloudDownload />}
                        color='primary'
                      >
                        Download
                      </Button>
                      {
                        isRevoked(certificate)
                          ? (
                            <Button
                              onClick={() => handleUnrevoke(certificate)}
                              startIcon={<AddCircle />}
                            >
                              Unrevoke
                            </Button>
                          )
                          : (
                            <Button
                              onClick={() => handleRevoke(certificate)}
                              startIcon={<RemoveCircle />}
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
          </TableContainer>
        </Grid>
      </Grid>
      {certificateReducer.id > 0 && <CertificateDialog />}
    </>
  )
}
