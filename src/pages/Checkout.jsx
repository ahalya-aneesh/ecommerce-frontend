import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";

function createOrderMetadata() {
    const now = new Date();
    return {
        id: `DEMO-${now.getTime().toString(36).toUpperCase()}`,
        createdAt: now.toISOString(),
    };
}

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { orderId } = useParams();
    const items = useSelector((state) => state.cart.items);
    const totalPrice = items.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0
    );
    const [error, setError] = useState("");
    const completedOrder =
        orderId && location.state?.orderId === orderId ? location.state.order : null;

    if (orderId && !completedOrder) {
        return <Navigate to="/cart" replace />;
    }

    if (!orderId && items.length === 0) {
        return <Navigate to="/cart" replace />;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");

        const formData = new FormData(event.currentTarget);
        const orderMetadata = createOrderMetadata();
        const order = {
            ...orderMetadata,
            customer: {
                name: formData.get("name"),
                email: formData.get("email"),
                phone: formData.get("phone"),
                address: formData.get("address"),
            },
            items: items.map(({ _id, name, price, quantity }) => ({
                id: _id,
                name,
                price: Number(price),
                quantity,
            })),
            total: totalPrice,
        };

        try {
            const savedOrders = JSON.parse(localStorage.getItem("demoOrders") || "[]");
            localStorage.setItem("demoOrders", JSON.stringify([...savedOrders, order]));
            dispatch(clearCart());
            navigate(`/checkout/success/${order.id}`, {
                replace: true,
                state: { orderId: order.id, order },
            });
        } catch {
            setError("We couldn't save your demo order. Please check browser storage and try again.");
        }
    };

    return (
        <main className="min-h-[calc(100vh-4.5rem)] bg-[#f6f4ee] px-5 py-10 text-[#263c2d] sm:px-10">
            <div className="mx-auto max-w-3xl">
                {completedOrder ? (
                    <section className="rounded-2xl border border-[#e5e4dc] bg-white p-6 shadow-[0_12px_36px_rgba(38,60,45,0.06)] sm:p-10">
                        <p className="text-sm font-semibold uppercase tracking-wider text-[#71836e]">
                            Demo checkout complete
                        </p>
                        <h1 className="mt-3 text-3xl font-semibold">Thank you, {completedOrder.customer.name}!</h1>
                        <p className="mt-3 text-[#697067]">
                            Your demo order has been placed. No payment was collected.
                        </p>
                        <div className="mt-6 space-y-3 rounded-xl bg-[#f6f4ee] p-5">
                            <p><span className="font-semibold">Order number:</span> {completedOrder.id}</p>
                            <p><span className="font-semibold">Delivering to:</span> {completedOrder.customer.address}</p>
                            <p><span className="font-semibold">Total:</span> ₹{Number(completedOrder.total).toLocaleString("en-IN")}</p>
                        </div>
                        <h2 className="mt-7 font-semibold">Items</h2>
                        <ul className="mt-3 space-y-2">
                            {completedOrder.items.map((item) => (
                                <li key={item.id} className="flex justify-between gap-4 text-sm">
                                    <span>{item.name} × {item.quantity}</span>
                                    <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                                </li>
                            ))}
                        </ul>
                        <Link
                            to="/products"
                            className="mt-8 inline-flex rounded-md bg-[#263c2d] px-5 py-3 font-semibold text-white hover:bg-[#3b5843]"
                        >
                            Continue Shopping
                        </Link>
                    </section>
                ) : (
                    <section className="rounded-2xl border border-[#e5e4dc] bg-white p-6 shadow-[0_12px_36px_rgba(38,60,45,0.06)] sm:p-10">
                        <Link to="/cart" className="text-sm text-[#697067] hover:text-[#263c2d]">
                            ← Back to cart
                        </Link>
                        <h1 className="mt-5 text-3xl font-semibold">Checkout</h1>
                        <p className="mt-2 text-sm text-[#697067]">
                            Demo checkout only — no payment will be processed.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            <div>
                                <label htmlFor="checkout-name" className="mb-2 block text-sm font-medium">Full name</label>
                                <input id="checkout-name" name="name" autoComplete="name" required className="w-full rounded-lg border border-[#d9ddd4] px-3 py-3 focus:border-[#71836e] focus:outline-none focus:ring-2 focus:ring-[#71836e]/20" />
                            </div>
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="checkout-email" className="mb-2 block text-sm font-medium">Email</label>
                                    <input id="checkout-email" name="email" type="email" autoComplete="email" required className="w-full rounded-lg border border-[#d9ddd4] px-3 py-3 focus:border-[#71836e] focus:outline-none focus:ring-2 focus:ring-[#71836e]/20" />
                                </div>
                                <div>
                                    <label htmlFor="checkout-phone" className="mb-2 block text-sm font-medium">Phone</label>
                                    <input id="checkout-phone" name="phone" type="tel" autoComplete="tel" required className="w-full rounded-lg border border-[#d9ddd4] px-3 py-3 focus:border-[#71836e] focus:outline-none focus:ring-2 focus:ring-[#71836e]/20" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="checkout-address" className="mb-2 block text-sm font-medium">Delivery address</label>
                                <textarea id="checkout-address" name="address" autoComplete="street-address" rows="3" required className="w-full resize-y rounded-lg border border-[#d9ddd4] px-3 py-3 focus:border-[#71836e] focus:outline-none focus:ring-2 focus:ring-[#71836e]/20" />
                            </div>

                            <div className="rounded-xl bg-[#f6f4ee] p-5">
                                <h2 className="font-semibold">Order summary</h2>
                                <ul className="mt-3 space-y-2 text-sm">
                                    {items.map((item) => (
                                        <li key={item._id} className="flex justify-between gap-4">
                                            <span>{item.name} × {item.quantity}</span>
                                            <span>₹{(Number(item.price) * item.quantity).toLocaleString("en-IN")}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-4 flex justify-between border-t border-[#e5e4dc] pt-4 font-semibold">
                                    <span>Total</span>
                                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                                </p>
                            </div>

                            {error && <p role="alert" className="text-sm text-[#9a5147]">{error}</p>}

                            <button type="submit" className="w-full rounded-md bg-[#263c2d] px-5 py-3 font-semibold text-white transition hover:bg-[#3b5843] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#263c2d]">
                                Place Demo Order
                            </button>
                        </form>
                    </section>
                )}
            </div>
        </main>
    );
}

export default Checkout;
