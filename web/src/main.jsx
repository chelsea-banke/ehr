import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider, Route, Link, createRoutesFromElements,} from "react-router-dom";
import './index.css'
import './fontawesome'

import CreateCenter from "./components/external/create-center/create-center"
import CreateAdmin from './components/external/create-admin/create-admin'
import Login from './components/external/login/login';
import Root from './components/internal/root/root';
import Dashboard from './components/internal/dashboard/dashboard';
import Patients from './components/internal/patients/patients';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div className='text-center mt-40'>
        <Link to="/create-center">create-center</Link><br/>
        <Link to="/create-admin">create-admin</Link><br/>
        <Link to="/login">login</Link><br/>
        <Link to='/verified'>verified</Link>
      </div>
  },
  {
    path:"/create-center",
    element: <CreateCenter/>
  },
  {
    path:"/create-admin",
    element: <CreateAdmin/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/verified',
    element: <Root/>,
    children: [
      {
        path: '/verified/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/verified/patients',
        element: <Patients/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)