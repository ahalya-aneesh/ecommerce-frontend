
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/wishlist";

// Get wishlist
export const getWishlist = createAsyncThunk(
    "wishlist/getWishlist",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL, {
                withCredentials: true
            });

            return response.data.wishlist;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to get wishlist"
            );
        }
    }
);

// Add product to wishlist
export const addToWishlist = createAsyncThunk(
    "wishlist/addToWishlist",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                API_URL,
                { productId },
                { withCredentials: true }
            );

            return response.data.wishlist;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to add product"
            );
        }
    }
);

// Remove product from wishlist
export const removeFromWishlist = createAsyncThunk(
    "wishlist/removeFromWishlist",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${API_URL}/${productId}`,
                { withCredentials: true }
            );

            return response.data.wishlist;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to remove product"
            );
        }
    }
);

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlist: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload;
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.wishlist = action.payload;
                state.error = null;
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.wishlist = action.payload;
                state.error = null;
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export default wishlistSlice.reducer;
