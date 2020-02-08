import React from 'react'
import { useSelector } from 'react-redux'
import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

export default function ServicesDialog () {
  const classes = useStyles()
  const backdropReducer = useSelector(state => state.backdropReducer)

  return (
    <Backdrop
      open={backdropReducer.open}
      className={classes.backdrop}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}
