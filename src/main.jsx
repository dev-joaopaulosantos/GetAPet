import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// configurando router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// importando pages
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import App from './App'
import Profile from './pages/User/Profile'
import MyPets from './pages/MyPets/MyPets'
import AddPet from './pages/AddPet/AddPet'
import EditPet from './pages/EditPet/EditPet'
import PetDetails from './pages/PetDetails/PetDetails'
import MyAdoptions from './pages/MyAdoptions/MyAdoptions'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/user/profile",
        element: <Profile />
      },
      {
        path: "/pet/mypets",
        element: <MyPets />
      },
      {
        path: "/pet/add",
        element: <AddPet />
      },
      {
        path: "/pet/:id",
        element: <PetDetails />
      },
      {
        path: "/pet/edit/:id",
        element: <EditPet />
      },
      {
        path: "/pet/myadoptions",
        element: <MyAdoptions />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
