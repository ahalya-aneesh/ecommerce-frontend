import { createSlice } from "@reduxjs/toolkit";

// Load cart items from localStorage
const loadCart = () => {
    try {
        return JSON.parse(localStorage.getItem("cartItems")) || [];
    } catch {
        return [];
    }
};

// Initial state
const initialState = {
    items: loadCart()
};

// Create cart slice
const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        // Add product to cart
        addToCart: (state, action) => {
            const product = action.payload;

            const existingProduct = state.items.find(
                (item) => item._id === product._id
            );

            if (existingProduct) {
                if (existingProduct.quantity < existingProduct.stock) {
                    existingProduct.quantity += 1;
                }
            } else {
                if (Number(product.stock) > 0) {
                    state.items.push({
                        ...product,
                        quantity: 1
                    });
                }
            }
        },

        // Increase product quantity
        increaseQuantity: (state, action) => {
            const item = state.items.find(
                (item) => item._id === action.payload
            );

            if (item && item.quantity < item.stock) {
                item.quantity += 1;
            }
        },

        // Decrease product quantity
        decreaseQuantity: (state, action) => {
            const item = state.items.find(
                (item) => item._id === action.payload
            );

            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },

        // Remove product from cart
        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item._id !== action.payload
            );
        },

        // Clear all cart items
        clearCart: (state) => {
            state.items = [];
        }
    }
});

// Export actions
export const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;