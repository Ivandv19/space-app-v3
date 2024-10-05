import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import GlobalStyleds from './components/Globalstyleds/Globalstyleds'



function App() {
  return (
    <>
      <GlobalStyleds />
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
