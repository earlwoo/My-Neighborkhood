import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {ModalProvider} from "./context/Modal"
import './index.css';
import App from './App';
import configureStore from './store';
import { ChakraProvider } from "@chakra-ui/react"

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ModalProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ModalProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
