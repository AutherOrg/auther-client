import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { formatRelative, fromUnixTime } from 'date-fns'
import {
  Card, CardHeader, CardContent,
  Fab,
  Grid,
  IconButton,
  Paper,
  TableContainer, Table, TableBody, TableCell, TableHead, TableRow,
  Typography
} from '@material-ui/core'
import { Add, Delete } from '@material-ui/icons'

import actions from '../../actions/batch.actions'
import constants from '../../constants/batches.constants'

export default function Batch ({ match }) {
  const dispatch = useDispatch()

  const batchReducer = useSelector(state => state.batchReducer)

  React.useEffect(() => {
    dispatch(actions.get(match.params.id))
  }, [dispatch, match.params.id])

  if (batchReducer.status === constants.STATUS.EMPTY) {
    return null
  }

  const { certificates } = JSON.parse(batchReducer.certificates)

  return (
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
                    <IconButton
                      onClick={() => console.log()}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}
