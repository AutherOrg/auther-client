import React from 'react'
import { useWeb3React } from '@web3-react/core'

import { injected } from '../../providers/web3/connectors'
import Web3NoEthereumProviderError from './Web3NoEthereumProviderError'
import Web3ActiveFalse from './Web3ActiveFalse'
import Web3UnsupportedChainIdError from './Web3UnsupportedChainIdError'

export default ({ children }) => {
  const context = useWeb3React()
  const { active, activate, error } = context

  if (error && error.name === 'NoEthereumProviderError') {
    return (
      <Web3NoEthereumProviderError />
    )
  }

  React.useEffect(() => {
    activate(injected)
  }, [activate])

  if (error && error.name === 'UnsupportedChainIdError') {
    return (
      <Web3UnsupportedChainIdError />
    )
  }

  if (!active) {
    return (
      <Web3ActiveFalse />
    )
  }

  return (
    <>
      {children}
    </>
  )
}
