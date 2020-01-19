import React from 'react'
import { Grid, Typography } from '@material-ui/core'

function Home () {
  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12} align='center'>
        <Typography variant='h1' gutterBottom>{process.env.REACT_APP_APPLICATION_NAME}</Typography>
      </Grid>
    </Grid>
  )
}

export default Home
