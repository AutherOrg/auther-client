import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { formatRelative, parseISO } from 'date-fns'
import {
  Button,
  Card, CardContent, CardHeader, CardActions,
  Fab,
  Grid,
  Table, TableBody, TableCell, TableHead, TableRow,
  Typography
} from '@material-ui/core'
import { Add, Create, Link } from '@material-ui/icons'

import actions from '../../actions/certificates.actions'

export default function CertificatesIssuer () {
  const dispatch = useDispatch()
  const certificatesReducer = useSelector(state => state.certificatesReducer)
  const revocationsReducer = useSelector(state => state.revocationsReducer)
  const isRevoked = id => {
    return revocationsReducer.revocations.findIndex(e => e.certificateId === id) > -1
  }
  React.useEffect(() => {
    dispatch(actions.getMany())
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
                    <TableCell>Revoked</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {certificatesReducer.certificates.map((certificate, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatRelative(parseISO(certificate.createdAt), new Date())}</TableCell>
                      <TableCell>{certificate.Creator.email}</TableCell>
                      <TableCell>{certificate.Recipient.email}</TableCell>
                      <TableCell>{certificate.name}</TableCell>
                      <TableCell>
                        {isRevoked(certificate.id) ? 'Yes' : 'No'}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => dispatch(push(`/certificates/${certificate.id}`))}
                          startIcon={<Create />}
                          color='primary'
                        >
                          Manage
                        </Button>
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
    </>
  )
}
