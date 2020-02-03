import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Close, Link } from '@material-ui/icons'

import actions from '../../actions/transactions.actions'

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
    <Dialog open={transactionsReducer.isRunning || transactionsReducer.error !== ''}>
      <DialogTitle>
        Ethereum transaction
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogContentRoot }}>
        {!transactionsReducer.isMined && transactionsReducer.error === '' && (
          <>
            <DialogContentText gutterBottom>
              Please wait until the transaction is mined.
            </DialogContentText>
            <CircularProgress />
          </>
        )}
        {
          transactionsReducer.error !== '' && (
            <DialogContentText gutterBottom color='error'>{transactionsReducer.error}</DialogContentText>
          )
        }
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
        {transactionsReducer.error !== '' && (
          <Button
            onClick={() => dispatch(actions.reset())}
            startIcon={<Close />}
          >
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
