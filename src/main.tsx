import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'


const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
  <RouterProvider router={router} />
</GoogleOAuthProvider>
  </StrictMode>,
)