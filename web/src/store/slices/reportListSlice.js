import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requests from "../../services/requests";
import { dateSort } from "../../services/utilities";

const initialState = {
    reports: [],
    status: 'idle',
    error: ''
}

export const fetchReports = createAsyncThunk('patient/get-reports', async({role, patientUsername='', doctorUsername=''})=>{
    const response = await requests.getRequest(`http://localhost:3000/ehr/staff/${role}/get-reports?patientUsername=${patientUsername}&doctorUsername=${doctorUsername}`)
    return response
})

const reportListSlice = createSlice({
    name: 'reportList',
    initialState: initialState,
    reducers: {
        updateReportList: (state, action)=>{
            state.reports = action.payload
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchReports.fulfilled, (state, action)=>{
            state.reports = dateSort(action.payload.data)
            state.status = 'successful'
        })
        .addCase(fetchReports.pending, (state, action)=>{
            state.status = 'pending'
        })
    }
})

export const { updateReportList } = reportListSlice.actions;
export default reportListSlice.reducer