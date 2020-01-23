import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format, fromUnixTime } from 'date-fns'
import {
  Grid,
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography
} from '@material-ui/core'

import actions from '../../actions/batches.actions'

export default function Batches () {
  const dispatch = useDispatch()

  const batchesReducer = useSelector(state => state.batchesReducer)

  React.useEffect(() => {
    dispatch(actions.getAll())
  }, [dispatch])

  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12} align='center'>
        <Typography variant='h1' gutterBottom>Batches</Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {batchesReducer.batches.map((batch, index) => (
                <TableRow key={index}>
                  <TableCell>{format(fromUnixTime(batch.created), 'MM/dd/yyyy')}</TableCell>
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
