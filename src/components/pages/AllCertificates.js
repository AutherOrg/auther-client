import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CircularProgress,
  Grid,
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography
} from '@material-ui/core'
// import { LockOpen } from '@material-ui/icons'

import actions from '../../actions/certificates.actions'

export default function AllCertificates () {
  const dispatch = useDispatch()

  const certificatesReducer = useSelector(state => state.certificatesReducer)

  React.useEffect(() => {
    dispatch(actions.getAll())
  }, [dispatch])

  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12} align='center'>
        <Typography variant='h1' gutterBottom>Certificates</Typography>
      </Grid>
      {certificatesReducer.isRunning && (
        <Grid item xs={12} align='center'>
          <CircularProgress />
        </Grid>
      )}
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Certificate</TableCell>
                <TableCell>Recipient</TableCell>
                <TableCell>Issuer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {certificatesReducer.certificates.map((certificate, index) => (
                <TableRow key={index}>
                  <TableCell>{certificate.json.badge.name}</TableCell>
                  <TableCell>{certificate.json.recipientProfile.name}</TableCell>
                  <TableCell>{certificate.json.badge.issuer.name}</TableCell>
                  <TableCell>{certificate.json.issuedOn}</TableCell>
                  <TableCell>TODO</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}
