import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { formatRelative, parseISO } from 'date-fns'
import {
  Card, CardHeader, CardContent,
  Fab,
  Grid,
  Table, TableBody, TableCell, TableHead, TableRow,
  Typography
} from '@material-ui/core'
import { Add } from '@material-ui/icons'

import actions from '../../actions/users.actions'
import constants from '../../constants/users.constants'

export default function Users () {
  const dispatch = useDispatch()
  const usersReducer = useSelector(state => state.usersReducer)

  React.useEffect(() => {
    dispatch(actions.getAll({ withoutRecipients: true }))
  }, [dispatch])

  return (
    <>
      <Grid container spacing={5} justify='center'>
        <Grid item xs={12} align='center'>
          <Typography variant='h1' gutterBottom>Users</Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title='Add new user'
              avatar={
                <Fab
                  onClick={() => dispatch(push('/users/create'))}
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
                    <TableCell>Email</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersReducer.users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatRelative(parseISO(user.createdAt), new Date())}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{constants.statusName[user.status]}</TableCell>
                      <TableCell>{constants.roleName[user.role]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
