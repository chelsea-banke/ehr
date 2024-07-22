import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requests from "../../services/requests";

const initialState = {
    vitals: {
        "temperature": "[]",
        "pulseRate": "[]",
        "respiratoryRate": "[]",
        "bloodPressure": "[]",
        "weight": "[]",
        "height": "[]",
        "patientUsername": "johndoe"
    },
    status: '',
    error: ''
}

export const fetchVitals = createAsyncThunk('vitals/fetch-vitals', async ({role, patientUsername})=>{
    const response = await requests.getRequest(`http://localhost:3000/ehr/staff/${role}/get-vitals?patientUsername=${patientUsername}`)
    console.log(response);
    return response
})

const vitalsSlice = createSlice({
    name: 'vitals',
    initialState: initialState,
    reducers: {
        updateVitals: (state, action)=>{
            state.vitals = action.payload
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchVitals.fulfilled, (state, action)=>{
            state.vitals = action.payload.data
            state.status = 'successful'
        })
        .addCase(fetchVitals.pending, (state, action)=>{
            state.status = 'pending'
        })
        .addCase(fetchVitals.rejected, (state, action)=>{
            state.status = 'rejected'
            state.error = action.payload.data
            state.vitals = {
                "temperature": "[]",
                "pulseRate": "[]",
                "respiratoryRate": "[]",
                "bloodPressure": "[]",
                "weight": "[]",
                "height": "[]",
                "patientUsername": "johndoe"
            }
        })
    }
})

export const { updateVitals } = vitalsSlice.actions;
export default vitalsSlice.reducer