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
  const authReducer = useSelector(state => state.authReducer)
  const batchesReducer = useSelector(state => state.batchesReducer)
  const certificatesReducer = useSelector(state => state.certificatesReducer)
  const issuersReducer = useSelector(state => state.issuersReducer)
  const modelsReducer = useSelector(state => state.modelsReducer)

  const isRunning = () => {
    return (
      authReducer.isRunning ||
      batchesReducer.isRunning ||
      certificatesReducer.isRunning ||
      issuersReducer.isRunning ||
      modelsReducer.isRunning
    )
  }

  return (
    <Backdrop className={classes.backdrop} open={isRunning()}>
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}
