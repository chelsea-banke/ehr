import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requests from "../../services/requests";

const initialState = {
    staffs: [],
    status: 'idle',
    error: ''
}

export const fetchStaffs = createAsyncThunk('staffs/fetch-staffs', async(centerId)=>{
    console.log('getching');
    return (await requests.getRequest(`http://localhost:3000/ehr/admin/get-staffs?centerId=${centerId}`))
})

const staffsListSlice = createSlice({
    name: 'staffsList',
    initialState: initialState,
    reducers: {},
    extraReducers(builder){
        builder.
        addCase(fetchStaffs.fulfilled, (state, action)=>{
            state.staffs = action.payload.data
        }).
        addCase(fetchStaffs.pending, (state, action)=>{
            state.status = 'loading'
            state.staffs = []
        })
    }
})

export default staffsListSlice.reducer