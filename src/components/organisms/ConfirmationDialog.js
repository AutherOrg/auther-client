import React from 'react'
import { useSelector } from 'react-redux'
import {
  Dialog, DialogTitle, DialogActions
} from '@material-ui/core'

export default function ConfirmationDialog ({ actions }) {
  const { open, title } = useSelector(state => state.confirmationReducer)

  return (
    <Dialog
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogActions>
        {actions}
      </DialogActions>
    </Dialog>
  )
}
