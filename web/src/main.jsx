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
import ReportsList from './components/internal/reports-list/reports-list';
import TestsList from './components/internal/tests-list/tests-list';
import ReportView from './components/internal/report-view/report-view';
import PatientProfile from './components/internal/patient-profile/patient-profile';
import CreateNewReport from './components/internal/create-new-report/create-new-report';
import Staffs from './components/internal/staffs/staffs';
import StaffProfile from './components/internal/staff-profile/staff-profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div className='text-center mt-40'>
        <Link to="/create-center">create-center</Link><br/>
        <Link to="/create-admin">create-admin</Link><br/>
        <Link to="/login">login</Link><br/>
        <Link to='/verified/dashboard'>verified</Link>
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
        element: <Patients/>,
        children: [
          {
            path: '/verified/patients/:patientId',
            children: [
              {
                path: '/verified/patients/:patientId/profile',
                element: <PatientProfile/>
              },
              {
                path: '/verified/patients/:patientId/create-new-report',
                element: <CreateNewReport/>
              },
              {
                path: '/verified/patients/:patientId/reports',
                element: <ReportsList/>,
              },
              {
                path: '/verified/patients/:patientId/tests',
                element: <TestsList/>
              },                  {
                path: '/verified/patients/:patientId/reports/:reportId',
                element: <ReportView/>
              }
            ]
          }
        ]
      },
      {
        path: "/verified/staffs",
        element: <Staffs/>,
        children: [
          {
            path: "/verified/staffs/:staffId",
            children: [
              {
                path: "/verified/staffs/:staffId/profile",
                element: <StaffProfile/>
              },
              {
                path: '/verified/staffs/:staffId/reports',
                element: <ReportsList/>,
              },
              {
                path: '/verified/staffs/:staffId/tests',
                element: <TestsList/>
              },                  {
                path: '/verified/staffs/:staffId/reports/:reportId',
                element: <ReportView/>
              }
            ]
          }
        ]
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)