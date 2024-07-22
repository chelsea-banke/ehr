import { createSlice } from "@reduxjs/toolkit";

const centerSlice = createSlice({
    name: 'center',
    initialState: {},
    reducers: {
        updateCenter: (state, action)=>{
            return action.payload
        }
    }
})

export const { updateCenter } = centerSlice.actions;
export default centerSlice.reducer