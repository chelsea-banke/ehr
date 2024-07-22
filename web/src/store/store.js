// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import roleSlice from './slices/roleSlice';
import statsSlice from './slices/statsSlice';
import userSlice from './slices/userSlice';
import patientsListSlice from './slices/patientsListSlice';
import patientSlice from './slices/patientSlice';
import reportSlice from './slices/reportSlice';
import reportListSlice from './slices/reportListSlice';
import vitalsSlice from './slices/vitalsSlice';
import testListSlice from './slices/testListSlice';
import testSlice from './slices/testSlice';
import staffsListSlice from './slices/staffsListSlice';
import staffSlice from './slices/staffSlice';
import centerSlice from './slices/centerSlice';

const store = configureStore({
    reducer: {
        'role': roleSlice,
        'stats': statsSlice,
        'user': userSlice,
        'patientsList': patientsListSlice,
        'patient': patientSlice,
        'reportsList': reportListSlice,
        'report': reportSlice,
        'vitals': vitalsSlice,
        'testsList': testListSlice,
        'test': testSlice,
        'staffsList':staffsListSlice,
        'staff': staffSlice,
        'center': centerSlice
    }
})

export default store;