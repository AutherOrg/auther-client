import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { format, fromUnixTime } from 'date-fns'
import {
  Card, CardHeader, CardContent,
  Fab,
  Grid,
  IconButton,
  Table, TableBody, TableCell, TableHead, TableRow,
  Typography
} from '@material-ui/core'
import { Add, Edit } from '@material-ui/icons'

import actions from '../../actions/certificateModels.actions'

export default function CertificateModels () {
  const dispatch = useDispatch()

  const certificateModelsReducer = useSelector(state => state.certificateModelsReducer)

  React.useEffect(() => {
    dispatch(actions.getAll())
  }, [dispatch])

  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12} align='center'>
        <Typography variant='h1' gutterBottom>Certificate models</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Add new certificate model'
            avatar={
              <Fab
                onClick={() => dispatch(push('/models/create'))}
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
                  <TableCell>Name</TableCell>
                  <TableCell>Created at</TableCell>
                  <TableCell>Updated at</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {certificateModelsReducer.models.map((model, index) => (
                  <TableRow key={index}>
                    <TableCell>{model.name}</TableCell>
                    <TableCell>{format(fromUnixTime(model.createdAt), 'MM/dd/yyyy')}</TableCell>
                    <TableCell>{format(fromUnixTime(model.updatedAt), 'MM/dd/yyyy')}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => dispatch(push(`/models/${model.id}`))}
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
