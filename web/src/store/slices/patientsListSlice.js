import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requests from "../../services/requests";

const initialState = {
    patients: [],
    status: 'idle',
    error: ''
}

export const fetchPatients = createAsyncThunk('patients/fetchPatients', async({role, centerId})=>{
    const response = await requests.getRequest(`http://localhost:3000/ehr/staff/${role}/get-patients?centerId=${centerId}`)
    return response
})

const patientsListSlice = createSlice({
    name: 'patientsList',
    initialState: initialState,
    reducers: {},
    extraReducers(builder){
        builder.
        addCase(fetchPatients.fulfilled, (state, action)=>{
            state.patients = action.payload.data
        }).
        addCase(fetchPatients.pending, (state, action)=>{
            state.status = 'loading'
        })
    }
})

export default patientsListSlice.reducer