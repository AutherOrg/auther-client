import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { format } from 'date-fns'
import {
  Card, CardHeader, CardContent,
  Fab,
  Grid,
  IconButton,
  Table, TableBody, TableCell, TableHead, TableRow,
  Typography
} from '@material-ui/core'
import { Add, Delete, Edit } from '@material-ui/icons'

import actions from '../../actions/signatures.actions'

export default function Signatures () {
  const dispatch = useDispatch()

  const signaturesReducer = useSelector(state => state.signaturesReducer)

  React.useEffect(() => {
    dispatch(actions.getMany())
  }, [dispatch])

  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12} align='center'>
        <Typography variant='h1' gutterBottom>Signatures</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Add new signature'
            avatar={
              <Fab
                onClick={() => dispatch(push('/signatures/create'))}
                color='primary'
              >
                <Add />
              </Fab>
            }
          />
          {signaturesReducer.signatures.length > 0 && (
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Job title</TableCell>
                    <TableCell>Created at</TableCell>
                    <TableCell>Updated at</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {signaturesReducer.signatures.map((signature, index) => (
                    <TableRow key={index}>
                      <TableCell>{signature.name}</TableCell>
                      <TableCell>{signature.jobTitle}</TableCell>
                      <TableCell>{format(new Date(signature.createdAt), 'MM/dd/yyyy')}</TableCell>
                      <TableCell>{format(new Date(signature.updatedAt), 'MM/dd/yyyy')}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => dispatch(push(`/signatures/${signature.id}`))}
                        >
                          <Edit color='primary' />
                        </IconButton>
                        <IconButton
                          onClick={() => dispatch(actions.destroy(signature.id))}
                        >
                          <Delete />
                        </IconButton>
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
