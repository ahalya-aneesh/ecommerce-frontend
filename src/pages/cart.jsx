import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
} from "../redux/cartSlice";

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get cart items from Redux store
    const items = useSelector((state) => state.cart.items);

    // Calculate total quantity
    const totalItems = items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // Calculate total price
    const totalPrice = items.reduce(
        (total, item) =>
            total + Number(item.price) * item.quantity,
        0
    );

    // Show this when cart is empty
    if (items.length === 0) {
        return (
            <main className="min-h-[calc(100vh-4.5rem)] bg-[#f6f4ee] px-6 py-16">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-5xl">🛍️</p>

                    <h1 className="mt-5 text-3xl font-semibold text-[#263c2d]">
                        Your Cart is Empty
                    </h1>

                    <p className="mt-3 text-[#697067]">
                        You haven't added any products yet.
                    </p>

                    <Link
                        to="/products"
                        className="mt-7 inline-flex rounded-md bg-[#263c2d] px-6 py-3 font-semibold text-white hover:bg-[#3b5843]"
                    >
                        Continue Shopping →
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-[calc(100vh-4.5rem)] bg-[#f6f4ee] px-5 py-10 text-[#263c2d] sm:px-10">
            <div className="mx-auto max-w-6xl">

                {/* Back to products */}
                <Link
                    to="/products"
                    className="text-sm text-[#697067] hover:text-[#263c2d]"
                >
                    ← Continue Shopping
                </Link>

                <h1 className="mt-5 text-3xl font-semibold sm:text-4xl">
                    Your Shopping Cart
                </h1>

                <p className="mt-2 text-sm text-[#697067]">
                    {totalItems}{" "}
                    {totalItems === 1 ? "item" : "items"} in your cart
                </p>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">

                    {/* Cart products */}
                    <section className="space-y-4">
                        {items.map((item) => (
                            <article
                                key={item._id}
                                className="flex flex-col gap-4 rounded-2xl border border-[#e5e4dc] bg-white p-4 shadow-[0_8px_28px_rgba(38,60,45,0.04)] sm:flex-row sm:items-center"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-32 w-full rounded-xl bg-[#f6f4ee] object-contain p-2 sm:w-32"
                                />

                                <div className="min-w-0 flex-1">
                                    <p className="text-xs uppercase tracking-wider text-[#71836e]">
                                        {item.category}
                                    </p>

                                    <h2 className="mt-1 text-lg font-semibold">
                                        {item.name}
                                    </h2>

                                    <p className="mt-2 font-medium">
                                        ₹{Number(item.price).toLocaleString("en-IN")}
                                    </p>

                                    {/* Remove product */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            dispatch(removeFromCart(item._id))
                                        }
                                        className="mt-3 text-sm text-[#9a5147] underline underline-offset-4"
                                    >
                                        Remove
                                    </button>
                                </div>

                                {/* Quantity controls */}
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        aria-label="Decrease quantity"
                                        disabled={item.quantity <= 1}
                                        onClick={() =>
                                            dispatch(decreaseQuantity(item._id))
                                        }
                                        className="h-9 w-9 border border-[#d9ddd4] disabled:opacity-40"
                                    >
                                        −
                                    </button>

                                    <span className="min-w-5 text-center">
                                        {item.quantity}
                                    </span>

                                    <button
                                        type="button"
                                        aria-label="Increase quantity"
                                        disabled={item.quantity >= Number(item.stock)}
                                        onClick={() =>
                                            dispatch(increaseQuantity(item._id))
                                        }
                                        className="h-9 w-9 border border-[#d9ddd4] disabled:opacity-40"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Product subtotal */}
                                <p className="font-semibold sm:w-28 sm:text-right">
                                    ₹
                                    {(
                                        Number(item.price) * item.quantity
                                    ).toLocaleString("en-IN")}
                                </p>
                            </article>
                        ))}
                    </section>

                    {/* Order summary */}
                    <aside className="h-fit rounded-2xl border border-[#e5e4dc] bg-white p-6 shadow-[0_12px_36px_rgba(38,60,45,0.06)]">
                        <h2 className="text-xl font-semibold">
                            Order Summary
                        </h2>

                        <div className="mt-6 flex justify-between text-sm">
                            <span>Items ({totalItems})</span>
                            <span>
                                ₹{totalPrice.toLocaleString("en-IN")}
                            </span>
                        </div>

                        <div className="mt-4 flex justify-between border-t border-[#e5e4dc] pt-4 text-lg font-semibold">
                            <span>Total</span>
                            <span>
                                ₹{totalPrice.toLocaleString("en-IN")}
                            </span>
                        </div>

                        <p className="mt-3 text-xs text-[#697067]">
                            Delivery charges, if applicable, are not included.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/checkout")}
                            className="mt-6 w-full rounded-md bg-[#263c2d] px-5 py-3 font-semibold text-white transition hover:bg-[#3b5843] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#263c2d]"
                        >
                            Proceed to Checkout
                        </button>
                    </aside>
                </div>
            </div>
        </main>
    );
}

export default Cart;