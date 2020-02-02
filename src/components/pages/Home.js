import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  logo: {
    width: '20%'
  }
}))

function Home () {
  const classes = useStyles()

  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12} align='center'>
        <img src={process.env.REACT_APP_LOGO} alt={process.env.REACT_APP_NAME} className={classes.logo} />
      </Grid>
      <Grid item xs={12} align='center'>
        <Typography variant='h1'>{process.env.REACT_APP_NAME}</Typography>
      </Grid>
      <Grid item xs={12} align='center'>
        <Typography variant='h4' gutterBottom>{process.env.REACT_APP_SLOGAN}</Typography>
      </Grid>
      <Grid item xs={12} align='justify'>
        <Typography gutterBottom>{process.env.REACT_APP_INTRODUCTION}</Typography>
      </Grid>
    </Grid>
  )
}

export default Home
