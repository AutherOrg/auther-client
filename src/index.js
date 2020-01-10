import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'

import theme from './providers/mui/mui.theme'
import store from './providers/redux/redux.store'
import CustomWeb3ReactProvider from './providers/web3/CustomWeb3ReactProvider'

import App from './App'
import * as serviceWorker from './serviceWorker'
import './index.css'

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <CustomWeb3ReactProvider>
        <App />
      </CustomWeb3ReactProvider>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
