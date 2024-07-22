import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCenterStats = createAsyncThunk('staff/get-center-stats', async({role, centerCenterId})=>{
    const response = await requests.getRequest(`http://localhost:3000/ehr/staff/${role}/get-center-stats?centerCenterId=${centerCenterId}`)
    console.log(response);
    return response
})


const statsSlice = createSlice({
    name: 'role',
    initialState: {
        'patientsCount': 0,
        'connectedPatientsCount': 0,
        'disconnectedPatientsCount': 0,
        'staffsCount': 0,
        'doctorsCount': 0,
        'nursesCount': 0,
        'labTechsCount': 0,
        'reportsCount': 0,
        'testsCount': 0
    },
    reducers: {
        updateStats: (state, action)=>{
            return action.payload
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchCenterStats.fulfilled, (state, action)=>{
            state = action.payload.data
        })
    }
})

export const { updateStats } = statsSlice.actions;
export default statsSlice.reducer