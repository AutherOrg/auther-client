import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blockcerts from 'react-blockcerts'
import {
  Dialog, DialogContent,
  useMediaQuery
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import actions from '../../actions/certificate.actions'

const useStyles = makeStyles(theme => ({
  dialogContentRoot: {
    padding: '0 !important'
  }
}))

export default function CertificateDialog () {
  const dispatch = useDispatch()
  const reducer = useSelector(state => state.certificateReducer)
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'))

  if (reducer.id === 0) {
    return null
  }

  console.log(reducer.json)

  return (
    <Dialog
      open={reducer.id > 0}
      onClose={() => dispatch(actions.reset())}
      maxWidth='lg'
      fullWidth
      fullScreen={fullScreen}
    >
      <DialogContent classes={{ root: classes.dialogContentRoot }}>
        <Blockcerts src={reducer.json} />
      </DialogContent>
    </Dialog>
  )
}
