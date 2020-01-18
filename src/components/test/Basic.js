import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Certificate } from 'blockcerts-issuer-helper'
import { useWeb3React } from '@web3-react/core'
import {
  Button,
  Card, CardHeader, CardContent, CardActions,
  CircularProgress,
  Typography
} from '@material-ui/core'
import { Add, Check, Edit } from '@material-ui/icons'

import batchesActions from '../../actions/batches.actions'
import transactionsActions from '../../actions/transactions.actions'
import ethereumConstants from '../../constants/ethereum.constants'
import Web3Wrapper from '../web3/Web3Wrapper'

export default () => {
  const dispatch = useDispatch()
  const batchesReducer = useSelector(state => state.batchesReducer)
  const transactionsReducer = useSelector(state => state.transactionsReducer)
  const certificate = new Certificate({
    recipient: {
      identity: 'alice@example.org'
    },
    badge: {
      name: 'Certificate #1',
      description: 'Fictional University delivers this Computer Science MS Degree.',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      criteria: {
        narrative: 'Fictional University delivers this Computer Science MS Degree.'
      },
      issuer: {
        id: 'https://raw.githubusercontent.com/guix77/blockcerts-certificates/master/ethereum/ropsten/issuers/fictionaluniversity/issuer.json',
        name: 'Fictional University',
        url: 'https://raw.githubusercontent.com/guix77/blockcerts-certificates/master/ethereum/ropsten/issuers/fictionaluniversity/www.md',
        email: 'fictionaluniversity@example.org',
        description: 'The Fictional University is a fictional university.',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
      },
      signatureLines: {
        jobTitle: 'President',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
      }
    },
    recipientProfile: {
      name: 'Alice'
    },
    displayHtml: '<h1>Computer Science MS Degree, Fictional University</h1>'
  })
  const context = useWeb3React()
  const { account, library } = context
  const handleSign = () => {
    const tx = {
      to: ethereumConstants.BURN_ADDRESS,
      gasLimit: ethereumConstants.GAS_LIMIT,
      data: '0x' + batchesReducer.merkleTreeRoot
    }
    dispatch(transactionsActions.send(tx, account, library))
  }
  const handleFinalize = () => {
    dispatch(batchesActions.sign(batchesReducer.certificates, transactionsReducer.hash))
  }
  const isRunning = () => {
    return batchesReducer.isRunning || transactionsReducer.isRunning
  }

  return (
    <Web3Wrapper>
      <Card>
        <CardHeader title='Basic issuing process' />
        <CardContent>
          {isRunning() && <CircularProgress />}
          {batchesReducer.merkleTreeRoot !== '' && (
            <Typography>
              Merkle tree root: {batchesReducer.merkleTreeRoot}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            onClick={() => dispatch(batchesActions.set([certificate], true))}
            disabled={isRunning()}
            startIcon={<Add />}
            color='primary'
            variant='contained'
          >
            Create certificates batch
          </Button>
          <Button
            onClick={() => handleSign()}
            disabled={isRunning()}
            startIcon={<Edit />}
            color='primary'
            variant='contained'
          >
            Sign certificates batch
          </Button>
          <Button
            onClick={() => handleFinalize()}
            disabled={isRunning()}
            startIcon={<Check />}
            color='primary'
            variant='contained'
          >
            Finalize certificates batch
          </Button>
        </CardActions>
      </Card>
    </Web3Wrapper>
  )
}
