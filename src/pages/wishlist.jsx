
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    getWishlist,
    removeFromWishlist
} from "../redux/wishlistSlice";

function Wishlist() {
    const dispatch = useDispatch();

    const { wishlist, loading, error } = useSelector(
        (state) => state.wishlist
    );

    useEffect(() => {
        dispatch(getWishlist());
    }, [dispatch]);

    const handleRemove = (productId) => {
        dispatch(removeFromWishlist(productId));
    };

    return (
        <div className="min-h-screen bg-[#faf8f6] text-[#302925]">

            {/* Navbar */}
            <nav className="flex items-center justify-between border-b border-[#eee6e1] bg-white px-6 py-5 md:px-16">
                <Link to="/" className="text-2xl font-bold tracking-tight">
                    Everyday
                </Link>

                <Link
                    to="/products"
                    className="text-sm font-medium transition hover:text-rose-500"
                >
                    Continue Shopping →
                </Link>
            </nav>

            {/* Wishlist heading */}
            <main className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-16">
                <div className="mb-10">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-rose-500">
                        Your favourites
                    </p>

                    <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                        My Wishlist <span className="text-rose-400">♡</span>
                    </h1>

                    <p className="mt-3 text-sm text-stone-500 md:text-base">
                        Your favourite finds, saved for another day.
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <p className="py-10 text-center text-stone-500">
                        Loading your wishlist...
                    </p>
                )}

                {/* Error */}
                {!loading && error && (
                    <p role="alert" className="rounded-xl bg-rose-50 p-4 text-rose-700">
                        {error}
                    </p>
                )}

                {/* Empty wishlist */}
                {!loading && !error && wishlist.length === 0 && (
                    <div className="rounded-2xl border border-[#eee6e1] bg-white px-6 py-16 text-center md:py-24">
                        <div className="mb-4 text-7xl text-rose-300">♡</div>

                        <h2 className="text-2xl font-semibold">
                            Your wishlist is empty
                        </h2>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
                            Found something you love? Save it here and come
                            back whenever you're ready.
                        </p>

                        <Link
                            to="/products"
                            className="mt-7 inline-flex rounded-full bg-[#302925] px-7 py-3 text-sm font-medium text-white transition hover:bg-rose-500"
                        >
                            Explore Products →
                        </Link>
                    </div>
                )}

                {/* Wishlist products */}
                {!loading && !error && wishlist.length > 0 && (
                    <>
                        <p className="mb-5 text-sm text-stone-500">
                            {wishlist.length} saved product(s)
                        </p>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {wishlist.map((product) => (
                                <article
                                    key={product._id}
                                    className="group overflow-hidden rounded-2xl border border-[#eee6e1] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    {/* Product image */}
                                    <div className="relative overflow-hidden bg-stone-100">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-64 items-center justify-center text-5xl text-stone-400">
                                                {product.name?.charAt(0) || "?"}
                                            </div>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => handleRemove(product._id)}
                                            aria-label={`Remove ${product.name} from wishlist`}
                                            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-rose-500 shadow-sm transition hover:scale-110 hover:bg-rose-50"
                                        >
                                            ♥
                                        </button>
                                    </div>

                                    {/* Product details */}
                                    <div className="p-5">
                                        <p className="mb-2 text-xs uppercase tracking-widest text-stone-400">
                                            {product.category || "Everyday collection"}
                                        </p>

                                        <h2 className="text-lg font-semibold">
                                            {product.name}
                                        </h2>

                                        <p className="mt-2 text-xl font-semibold">
                                            ₹{Number(product.price).toLocaleString("en-IN")}
                                        </p>

                                        <div className="mt-5 flex items-center justify-between gap-3">
                                            <Link
                                                to={`/product/${product._id}`}
                                                className="flex-1 rounded-full bg-[#302925] px-4 py-3 text-center text-sm text-white transition hover:bg-rose-500"
                                            >
                                                View Product
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() => handleRemove(product._id)}
                                                className="text-sm text-stone-500 underline underline-offset-4 transition hover:text-rose-500"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default Wishlist;
