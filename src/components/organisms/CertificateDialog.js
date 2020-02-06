import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  if (reducer.id === 0) {
    return null
  }

  return (
    <Dialog
      open={reducer.id > 0}
      onClose={() => dispatch(actions.reset())}
      maxWidth='md'
      fullWidth
      fullScreen={fullScreen}
    >
      <DialogContent classes={{ root: classes.dialogContentRoot }}>
        <div dangerouslySetInnerHTML={{ __html: reducer.json.displayHtml.replace(/(<? *script)/gi, 'illegalscript') }} />
      </DialogContent>
    </Dialog>
  )
}
