import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { formatRelative, fromUnixTime } from 'date-fns'
import {
  Button,
  Card, CardHeader, CardContent,
  Fab,
  Grid,
  Table, TableBody, TableCell, TableHead, TableRow,
  Typography
} from '@material-ui/core'
import { Add, School } from '@material-ui/icons'

import actions from '../../actions/batches.actions'

export default function Batches () {
  const dispatch = useDispatch()

  const batchesReducer = useSelector(state => state.batchesReducer)

  React.useEffect(() => {
    dispatch(actions.get())
  }, [dispatch])

  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12} align='center'>
        <Typography variant='h1' gutterBottom>Batches</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Add new certificates batch'
            avatar={
              <Fab
                onClick={() => dispatch(push('/batches/create'))}
                color='primary'
              >
                <Add />
              </Fab>
            }
          />
          {batchesReducer.batches.length > 0 && (
            <CardContent>
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
                      <TableCell>
                        {formatRelative(fromUnixTime(batch.created), new Date())}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => dispatch(push(`/batches/${batch.id}`))}
                          startIcon={<School />}
                          color='primary'
                        >
                          View certificates
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          )}
        </Card>
      </Grid>
    </Grid>
  )
}
