import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
    name: 'role',
    initialState: 'user',
    reducers: {
        updateRole: (state, action)=>{
            return action.payload
        }
    }
})

export const { updateRole } = roleSlice.actions;
export default roleSlice.reducer