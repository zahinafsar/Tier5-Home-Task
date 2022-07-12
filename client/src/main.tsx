import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'rsuite/dist/rsuite.min.css'; // or 'rsuite/dist/rsuite.min.css'
import 'antd-css-utilities/utility.min.css'
import { persistor, store } from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
