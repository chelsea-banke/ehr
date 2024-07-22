import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requests from "../../services/requests";

const initialState = {
    "username": "",
    "firstName": "",
    "lastName": "",
    "dob": "",
    "status": ""
}

export const fetchPatient = createAsyncThunk('patients/fetchPatient', async({role, patientUsername, centerCenterId})=>{
    const response = await requests.getRequest(`http://localhost:3000/ehr/staff/${role}/get-patient?patientUsername=${patientUsername}&centerCenterId=${centerCenterId}`)
    console.log(response);
    return response
})

const patientSlice = createSlice({
    name: 'patient',
    initialState: initialState,
    reducers: {
        updatePatient: (state, action)=>{
            return action.payload
        }
    },
    extraReducers(builder){
        builder.
        addCase(fetchPatient.fulfilled, (state, action)=>{
            return action.payload.data
        }).
        addCase(fetchPatient.pending, (state, action)=>{
            return initialState
        })
    }
})

export const { updatePatient } = patientSlice.actions;
export default patientSlice.reducer