
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes'
import { BrowserRouter } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalContext'

createRoot(document.getElementById('root')).render(

  <GlobalProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </GlobalProvider>

)
