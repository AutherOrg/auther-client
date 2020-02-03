import { InjectedConnector } from '@web3-react/injected-connector'

import constants from '../../constants/ethereum.constants'

export const injected = new InjectedConnector({
  supportedChainIds: [constants.NETWORK.ID[process.env.REACT_APP_ETHEREUM_NETWORK]]
})
