// eslint-disable-next-line no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
  {/*<React.StrictMode>*/}
    <App />
  {/*</React.StrictMode>*/}
    </Router>
)
