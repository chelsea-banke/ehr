import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        updateUser: (state, action)=>{
            return action.payload
        }
    }
})

export const { updateUser } = userSlice.actions;
export default userSlice.reducer