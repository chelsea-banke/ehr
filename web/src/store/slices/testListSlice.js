import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requests from "../../services/requests";

const initialState = {
    tests: [],
    status: 'idle',
    error: ''
}

export const fetchTests = createAsyncThunk('patient/get-tests', async({role, patientUsername='', doctorUsername=''})=>{
    const response = await requests.getRequest(`http://localhost:3000/ehr/staff/${role}/get-tests?patientUsername=${patientUsername}&doctorUsername=${doctorUsername}`)
    console.log(response)
    return response
})

const testListSlice = createSlice({
    name: 'testList',
    initialState: initialState,
    reducers: {
        updateTestList: (state, action)=>{
            state.tests = action.payload
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchTests.fulfilled, (state, action)=>{
            state.tests = action.payload.data
            state.status = 'successful'
        })
        .addCase(fetchTests.pending, (state, action)=>{
            state.status = 'pending'
        })
    }
})

export const { updateTestList } = testListSlice.actions;
export default testListSlice.reducer