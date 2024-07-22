import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    "username": "",
    "firstName": "",
    "lastName": "",
    "role": "",
    "status": ""
}

const staffSlice = createSlice({
    name: 'staff',
    initialState: initialState,
    reducers: {
        updateStaff: (state, action)=>{
            return action.payload
        }
    }
})

export const { updateStaff } = staffSlice.actions;
export default staffSlice.reducer