import React from 'react'
import { useSelector } from 'react-redux'
import {
  Button,
  CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from '@material-ui/icons'

import constants from '../../constants/ethereum.constants'

const useStyles = makeStyles(theme => ({
  dialogContentRoot: {
    marginTop: theme.spacing(1),
    textAlign: 'center'
  }
}))

export default function Transaction () {
  const classes = useStyles()
  const transactionsReducer = useSelector(state => state.transactionsReducer)

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
            href={`${constants.NETWORK.ETHERSCAN[process.env.REACT_APP_ETHEREUM_NETWORK]}${transactionsReducer.hash}`}
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
