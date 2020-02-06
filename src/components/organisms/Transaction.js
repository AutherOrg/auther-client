import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  dialogContentRoot: {
    marginTop: theme.spacing(1),
    textAlign: 'center'
  }
}))

export default function Transaction () {
  const classes = useStyles()
  const transactionsReducer = useSelector(state => state.transactionsReducer)
  const dispatch = useDispatch()

  return (
    <Dialog open={transactionsReducer.isRunning}>
      <DialogTitle>
        Ethereum transaction
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogContentRoot }}>
        {!transactionsReducer.isMined && (
          <CircularProgress />
        )}
      </DialogContent>
      <DialogActions>
        {transactionsReducer.hash.substring(0, 2) === '0x' && (
          <Button
            href={'https://' + process.env.REACT_APP_ETHEREUM_NETWORK.toLowerCase() + '.etherscan.io/tx/' + transactionsReducer.hash}
            target='etherscan'
            rel='noopener noreferrer'
            startIcon={<Link />}
          >
            Info
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
