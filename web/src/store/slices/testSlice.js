import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requests from "../../services/requests";

const initialState = {
    test: {
        'testId': '',
        'testName':	'',
        'results': '',
        'doctorUsername': '',
        'doctorCenterCenterId': '',
        'labtechUsername': '',
        'labtechCenterCenterId': '',
        'patientUsername': '',
        'reportReportId': '',
        'description':	'',
        'dateCreated': ''
    },
    status: '',
    error: ''
}

export const fetchTest = createAsyncThunk('tests/fetch-test', async ({role, testId})=>{
    const response = await requests.getRequest(`http://localhost:3000/ehr/staff/${role}/get-test?testId=${testId}`)
    return response
})

const TestSlice = createSlice({
    name: 'test',
    initialState: initialState,
    reducers: {
        updateTest: (state, action)=>{
            state.test = action.payload
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchTest.fulfilled, (state, action)=>{
            state.test = action.payload.data
            state.status = 'successful'
        })
        .addCase(fetchTest.pending, (state, action)=>{
            state.status = 'pending'
        })
    }
})

export const { updateTest } = TestSlice.actions;
export default TestSlice.reducer