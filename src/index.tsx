import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers';
import { Provider } from 'react-redux'
import store from './core/store';

function getLibrary(provider: any, connector: any) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 6000
  return library
}




ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
