import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import theme from './providers/mui/mui.theme'
import configureStore, { history } from './providers/redux/configureStore'
import CustomWeb3ReactProvider from './providers/web3/CustomWeb3ReactProvider'

import App from './App'
import * as serviceWorker from './serviceWorker'
import './index.css'

const store = configureStore()

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <CustomWeb3ReactProvider>
          <App />
        </CustomWeb3ReactProvider>
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
