import React from 'react'
import { useSelector } from 'react-redux'
import {
  Dialog, DialogTitle, DialogContent, DialogContentText
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  dialogContentRoot: {
    marginTop: theme.spacing(1),
    textAlign: 'center'
  },
  dialogContentTextRoot: {
    wordWrap: 'break-word'
  }
}))

export default function ServicesDialog () {
  const classes = useStyles()
  // const authReducer = useSelector(state => state.authReducer)
  // const batchesReducer = useSelector(state => state.batchesReducer)
  // const certificatesReducer = useSelector(state => state.certificatesReducer)
  // const issuersReducer = useSelector(state => state.issuersReducer)
  // const modelsReducer = useSelector(state => state.modelsReducer)
  const errorsReducer = useSelector(state => state.errorsReducer)

  return (
    <Dialog open={errorsReducer.errors.length > 0}>
      <DialogTitle>
        {errorsReducer.errors.length > 1 ? 'Errors' : 'Error'}
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogContentRoot }}>
        {errorsReducer.errors.map((error, index) => (
          <DialogContentText
            key={index}
            color='error'
            classes={{ root: classes.dialogContentTextRoot }}
          >
            {error}
          </DialogContentText>
        ))}
      </DialogContent>
    </Dialog>
  )
}
