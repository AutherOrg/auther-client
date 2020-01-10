import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import createRootReducer from '../../reducers/reducers'

export const history = createBrowserHistory()

const middleware = [thunk]
middleware.push(routerMiddleware(history))
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default preloadedState => {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  )
  return store
}
