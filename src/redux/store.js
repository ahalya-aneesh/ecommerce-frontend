import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        cart: cartReducer,
        wishlist: wishlistReducer
    }
});

store.subscribe(() => {
    localStorage.setItem(
        "cartItems",
        JSON.stringify(store.getState().cart.items)
    );
});

export default store;