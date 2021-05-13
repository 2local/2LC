import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'
import bsc from '@binance-chain/bsc-use-wallet'

import {
  BscConnector,
  UserRejectedRequestError,
} from '@binance-chain/bsc-connector'
import {
  ConnectionRejectedError,
  useWallet,
  UseWalletProvider,
} from 'use-wallet'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <UseWalletProvider
        connectors={{
          bsc: {
            handleActivationError(err) {
              if (err instanceof UserRejectedRequestError) {
                return new ConnectionRejectedError()
              }
            },
          },
        }}
        chainId={56}
      >
        <App />
      </UseWalletProvider>
    </React.StrictMode>
  </Provider>,

  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
