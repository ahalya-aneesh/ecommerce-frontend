import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    loading: false,
    error: null,
};


// REGISTER USER
export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/user/register",
                user
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "Registration failed"
            );
        }
    }
);


// LOGIN USER
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/user/login",
                user,
                {
                    withCredentials: true
                }
            );

            return response.data.user;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "Login failed"
            );
        }
    }
);


// GET PROFILE
export const getProfile = createAsyncThunk(
    "user/getProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                "http://localhost:3000/user/profile",
                {
                    withCredentials: true
                }
            );

            return response.data.user;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch profile"
            );
        }
    }
);


// USER SLICE
const userSlice = createSlice({
    name: "user",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        // REGISTER
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
            })

            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        // LOGIN
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        // GET PROFILE
        builder
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })

            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});


export default userSlice.reducer;