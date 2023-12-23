import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Pages/Shared/Navbar/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
