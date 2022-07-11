import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import 'rsuite/dist/rsuite.min.css'; // or 'rsuite/dist/rsuite.min.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
