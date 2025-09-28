import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import AuthPage from './pages/AuthPage'
import LandingPage from './pages/LandingPage'
import Home from './pages/UserHome'
import AuthProvider from './utils/AuthProvider';
function App() {
    const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthProvider>
          <Outlet /> 
        </AuthProvider>
      ),
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "/auth/:value", element: <AuthPage /> },
        { path: "/home", element: <Home /> },
      ],
    },
  ]);
  return (
    <RouterProvider router={router}/>
  )
}

export default App
