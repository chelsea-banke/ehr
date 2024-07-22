import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requests from "../../services/requests";

const initialState = {
    report: {
        "diagnosis": "",
        "prescriptions": "",
        "doctorUsername": '',
        "doctorCenterCenterId":	'',
        "patientUsername": '',
        "dateCreated": ''
    },
    status: '',
    error: ''
}

export const fetchReport = createAsyncThunk('reports/fetch-report', async ({role, reportId})=>{
    const response = await requests.getRequest(`http://localhost:3000/ehr/staff/${role}/get-report?reportId=${reportId}`)
    return response
})

const reportSlice = createSlice({
    name: 'report',
    initialState: initialState,
    reducers: {
        updateReport: (state, action)=>{
            state.report = action.payload
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchReport.fulfilled, (state, action)=>{
            state.report = action.payload.data
            state.status = 'successful'
        })
        .addCase(fetchReport.pending, (state, action)=>{
            state.status = 'pending'
        })
    }
})

export const { updateReport } = reportSlice.actions;
export default reportSlice.reducer