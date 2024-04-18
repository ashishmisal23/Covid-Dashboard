import React from 'react'
import Dashboard from './components/Dashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Dashboard />
    </>
  )
}

export default App