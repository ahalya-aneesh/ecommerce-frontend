import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { getProduct } from "../redux/productSlice";
import AddToCartButton from "../components/AddToCartButton";

function ProductCatalog() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, loading, error } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    const handleBuyNow = (product) => {
        dispatch(addToCart(product));
        navigate("/cart");
    };

    return (
        <main className="min-h-[calc(100vh-4.5rem)] bg-[#f6f4ee] px-5 py-10 text-[#263c2d] sm:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#e5e4dc] pb-6">
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#71836e]">
                            The collection
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Products</h1>
                    </div>
                    <p className="text-sm text-[#697067]">
                        {products.length} {products.length === 1 ? "item" : "items"}
                    </p>
                </header>

                {loading ? (
                    <p className="py-10 text-center text-sm text-[#697067]" role="status">
                        Loading products...
                    </p>
                ) : error ? (
                    <p className="py-10 text-center text-sm text-[#8e473e]" role="alert">
                        {error}
                    </p>
                ) : products.length === 0 ? (
                    <p className="py-10 text-center text-sm text-[#697067]">
                        There are no products to show yet.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (
                            <article
                                key={product._id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-[#e5e4dc] bg-white p-3 shadow-[0_8px_28px_rgba(38,60,45,0.04)] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(38,60,45,0.12)] motion-reduce:transition-none motion-reduce:hover:transform-none"
                            >
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="mb-4 h-72 w-full rounded-xl bg-[#f1f5ee] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                                    />
                                ) : (
                                    <div
                                        aria-hidden="true"
                                        className="mb-4 flex h-72 items-center justify-center rounded-xl bg-[#e8eee5] text-6xl font-semibold text-[#71836e]"
                                    >
                                        {product.name?.charAt(0)?.toUpperCase() || "?"}
                                    </div>
                                )}
                                <p className="mb-2 px-2 pt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#71836e]">
                                    {product.category || "Uncategorized"}
                                </p>
                                <h2 className="px-2 text-lg font-semibold leading-snug text-[#263c2d]">
                                    {product.name}
                                </h2>
                                <p className="mt-3 px-2 text-2xl font-semibold tracking-tight text-[#263c2d]">
                                    ₹{Number(product.price).toLocaleString("en-IN")}
                                </p>
                                <p className="mt-1 px-2 text-sm text-[#697067]">
                                    {product.stock} in stock
                                </p>
                                <div className="mt-auto flex flex-col gap-2 border-t border-[#eeede7] px-2 pt-4">
                                    <Link
                                        to={`/product/${product._id}`}
                                        className="text-sm font-semibold text-[#3c6045] underline decoration-[#b9c6b5] underline-offset-4 hover:text-[#263c2d]"
                                    >
                                        View details
                                    </Link>
                                    <AddToCartButton
                                        product={product}
                                        className="min-h-10 rounded-lg border border-[#cbd2c5] px-3 text-sm font-semibold text-[#263c2d] transition duration-200 hover:-translate-y-0.5 hover:bg-[#e8eee5] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none motion-reduce:hover:transform-none"
                                    />
                                    <button
                                        type="button"
                                        disabled={Number(product.stock) <= 0}
                                        onClick={() => handleBuyNow(product)}
                                        className="min-h-10 rounded-lg bg-[#263c2d] px-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#3b5843] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none motion-reduce:hover:transform-none"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

export default ProductCatalog;
