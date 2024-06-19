// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { addJob } from "../services/allAPI";

// //api call-createAsyncThunk        //sliceName/asyncThunkName
// export const addjobs = createAsyncThunk('products/fetchProducts', async () => {
//     const { data } = await addJob()
//     return data
// })

// //fetch data

// const addSlice = createSlice({
//     name: 'add',
//     initialState: {
//         loading: false,
//         job: {},
//         error: "",
//     },


//     extraReducers:(builder)=>{
//         builder.addCase(addjobs.pending,(state)=>{
//             state.loading=true
//         })
//         builder.addCase(addjobs.fulfilled,(state,action)=>{
//             state.loading=false
//             state.job=action.payload
//             state.error=""
//         })
//         builder.addCase(addjobs.rejected,(state,action)=>{
//             state.loading=false
//             state.job={}
//             state.error=action.payload
//         })
//     }

// })


// export default addSlice.reducer



