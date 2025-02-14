import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import { Sidebar } from "./components/ui/sidebar.tsx";
import BaseEdubotHeader from './pages/customcomponents/BaseEdubotHeader.tsx'
// import BaseEdubotSidebar from './pages/customcomponents/BaseEdubotSidebar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='bg-blue'>
      <BaseEdubotHeader />
      {/* <Sidebar /> */}
      {/* <BaseEdubotSidebar/> */}
    </div>
    <App />
  </StrictMode>
)
