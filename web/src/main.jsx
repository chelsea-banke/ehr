import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider, Route, Link, createRoutesFromElements,} from "react-router-dom";
import './index.css'
import './fontawesome'
import Cookies from 'js-cookie';

import store from './store/store';
import { Provider } from 'react-redux';

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
import EditReport from './components/internal/edit-report/edit-report';
import Staffs from './components/internal/staffs/staffs';
import StaffProfile from './components/internal/staff-profile/staff-profile';
import CreateNewStaff from './components/internal/create-new-staff/create-new-staff';
import Staff from './components/internal/staffs/staff';
import Vitals from './components/internal/vitals/vitals';
import TestView from './components/internal/test-view/test-view';
import AppButton from './components/shared/app-button/app-button';
import AiChat from './components/internal/ai-chat/ai-chat';
// create-center
const router = createBrowserRouter([
  {
    path: "/",
    element: <div className='text-center m-auto mt-40 w-1/2'>
        <Link to="/create-center"><AppButton text={'create-center'} style={'button'}/></Link><br/>
        <Link to="/login"><AppButton text={'login'} style={'button'}/></Link><br/>
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
                path: '/verified/patients/:patientId/vitals',
                element: <Vitals/>
              },
              {
                path: '/verified/patients/:patientId/tests',
                element: <TestsList/>
              },
              {
                path: '/verified/patients/:patientId/tests/:testId',
                element: <TestView/>
              },
              {
                path: '/verified/patients/:patientId/reports',
                element: <ReportsList/>,
              },
              {
                path: '/verified/patients/:patientId/ai-assist',
                element: <AiChat/>,
              },
              {
                path: '/verified/patients/:patientId/reports/:reportId',
                element: <ReportView/>
              },
              {
                path: '/verified/patients/:patientId/reports/:reportId/edit-report',
                element: <EditReport/>
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
            element: <Staff/>,
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
              },                  {
                path: '/verified/staffs/:staffId/tests/:tsestId',
                element: <TestView/>
              }
            ]
          },
          {
            path: "/verified/staffs/create-new-staff",
            element: <CreateNewStaff/>
          }
        ]
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)