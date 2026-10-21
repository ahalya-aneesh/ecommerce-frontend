import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
    user: null,
    loading: false,
    authChecking: true,
    error: null,
};


// REGISTER USER
export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (user, { rejectWithValue }) => {
        try {
            const response = await api.post(
                "/user/register",
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
            const response = await api.post(
                "/user/login",
                user,
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
            const response = await api.get("/user/profile");

            return response.data.user;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch profile"
            );
        }
    }
);

export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.post("/user/logout");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "Logout failed"
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
                state.authChecking = false;
                state.user = action.payload;
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        // GET PROFILE
        builder
            .addCase(getProfile.pending, (state) => {
                state.authChecking = true;
                state.error = null;
            })

            .addCase(getProfile.fulfilled, (state, action) => {
                state.authChecking = false;
                state.user = action.payload;
            })

            .addCase(getProfile.rejected, (state) => {
                state.authChecking = false;
                state.user = null;
                state.error = null;
            });

        builder
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.authChecking = false;
                state.error = null;
            });
    }
});


export default userSlice.reducer;