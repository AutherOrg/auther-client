import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Card, CardHeader, CardContent, CardMedia, CardActions,
  CircularProgress,
  IconButton,
  Grid,
  Typography
} from '@material-ui/core'
import { Visibility } from '@material-ui/icons'

import actions from '../../actions/certificates.actions'

export default function MyCertificate ({ match }) {
  const dispatch = useDispatch()

  const certificatesReducer = useSelector(state => state.certificatesReducer)

  React.useEffect(() => {
    dispatch(actions.getOne(match.params.uuid))
  }, [dispatch, match.params.uuid])

  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12} align='center'>
        <Typography variant='h1' gutterBottom>My certificate</Typography>
      </Grid>
      {certificatesReducer.isRunning && (
        <Grid item xs={12} align='center'>
          <CircularProgress />
        </Grid>
      )}
      <Grid item xs={12}>
        todo
      </Grid>
    </Grid>
  )
}
