import React from 'react'
import {
  Grid,
  Typography
} from '@material-ui/core'

export default function Unauthorized () {
  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12} align='center'>
        <Typography variant='h1' gutterBottom>Unauthorized</Typography>
      </Grid>
    </Grid>
  )
}
