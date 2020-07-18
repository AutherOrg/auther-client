import React from 'react'
import { useSelector } from 'react-redux'
import {
  Button,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@material-ui/core'
import { Replay } from '@material-ui/icons'
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
  const reducer = useSelector(state => state.errorsReducer)

  return (
    <Dialog open={reducer.errors.length > 0}>
      <DialogTitle>
        {reducer.errors.length > 1 ? 'Errors' : 'Error'}
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogContentRoot }}>
        {reducer.errors.map((error, index) => (
          <DialogContentText
            key={index}
            color='error'
            classes={{ root: classes.dialogContentTextRoot }}
          >
            {error}
          </DialogContentText>
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => window.location.reload(false)}
          startIcon={<Replay />}
        >
          Reload app
        </Button>
      </DialogActions>
    </Dialog>
  )
}
