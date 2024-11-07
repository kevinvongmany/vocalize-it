import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GenClips from './components/GenClips'
import SavedClips from './components/SavedClips'

import './index.css'
import App from './App.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <GenClips />
      }, 
      {
        path: '/saved',
        element: <SavedClips />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
