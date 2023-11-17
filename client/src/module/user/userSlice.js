import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../config"

export const login = createAsyncThunk('user/login', async({email, password}) => {
    try {
        console.log(" -pass: ", password, "-email: ", email);
        const response = await axios.post(`${baseUrl}/api/v1/login`, {email, password});
        console.log("TOKEN: ", response.data)
        window.localStorage.setItem('bookstore-token', response.data.token);
        return response.data
    } catch (error) {
        throw error;
    }
})

export const INITAL_USER_REDUCER_STATE = {
    token: window.localStorage.getItem('bookstore-token'),
    promise: 'uninitialized',
    error: null

}

const userSlice = createSlice({
    name: "user",
    initialState: INITAL_USER_REDUCER_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.promise = 'pending';
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.token = action.payload
            state.promise = "fulfilled";
        });
        builder.addCase(login.rejected, (state, action) => {
            state.promise = 'failed';
            state.error = action.error.message;
        });
    }
   
})

export const getUserToken = (state) => state.user
export const getLoginPromise = (state) => state.user

export default userSlice.reducer;