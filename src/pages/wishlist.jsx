import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    getWishlist,
    removeFromWishlist
} from "../redux/wishlistSlice";

function Wishlist() {
    const dispatch = useDispatch();
    const { wishlist = [], loading, error } = useSelector(
        (state) => state.wishlist
    );

    useEffect(() => {
        dispatch(getWishlist());
    }, [dispatch]);

    const handleRemove = (productId) => {
        dispatch(removeFromWishlist(productId));
    };

    return (
        <main className="min-h-[calc(100vh-4.5rem)] overflow-hidden bg-[#f6f4ee] text-[#20231f]">
            <section className="relative isolate overflow-hidden border-b border-[#e5e4dc] bg-[#e9eee5]">
                <div
                    aria-hidden="true"
                    className="absolute -right-24 -top-32 -z-10 h-96 w-96 rounded-full bg-[#d5dfcf] opacity-70 blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="absolute -bottom-40 left-1/4 -z-10 h-80 w-80 rounded-full bg-[#f3e5d6] opacity-70 blur-3xl"
                />
                <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:flex-row lg:items-end lg:justify-between lg:px-12">
                    <div className="max-w-2xl">
                        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#cbd6c5] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#526c55]">
                            <span aria-hidden="true" className="text-base text-[#a4615a]">♡</span>
                            Your personal collection
                        </p>
                        <h1 className="text-4xl font-semibold tracking-tight text-[#263c2d] sm:text-6xl">
                            Saved for
                            <span className="block font-serif italic text-[#71836e]">a little later.</span>
                        </h1>
                        <p className="mt-5 max-w-xl text-base leading-7 text-[#697067] sm:text-lg">
                            Keep the things you love close by. Your favourite finds will be waiting here whenever you are ready.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 self-start rounded-2xl border border-white/80 bg-white/75 px-5 py-4 shadow-sm backdrop-blur sm:self-auto">
                        <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f6e9e5] text-2xl text-[#a4615a]">
                            ♡
                        </span>
                        <div>
                            <p className="text-2xl font-semibold text-[#263c2d]">{wishlist.length}</p>
                            <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#788174]">
                                {wishlist.length === 1 ? "saved find" : "saved finds"}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
                <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a9a82]">
                            A collection of your own
                        </p>
                        <h2 className="text-2xl font-semibold tracking-tight text-[#263c2d] sm:text-3xl">
                            Your favourites
                        </h2>
                    </div>
                    <Link
                        to="/products"
                        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#cbd2c5] bg-white px-5 text-sm font-semibold text-[#3c6045] transition hover:border-[#71836e] hover:bg-[#e8eee5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#263c2d]"
                    >
                        Discover more
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>

                {loading && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" role="status" aria-label="Loading wishlist">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="animate-pulse overflow-hidden rounded-2xl border border-[#e5e4dc] bg-white p-3">
                                <div className="aspect-[4/3] rounded-xl bg-[#e8eee5]" />
                                <div className="px-2 pb-2 pt-5">
                                    <div className="h-3 w-1/3 rounded bg-[#e8eee5]" />
                                    <div className="mt-3 h-5 w-2/3 rounded bg-[#e8eee5]" />
                                    <div className="mt-5 h-10 rounded-lg bg-[#e8eee5]" />
                                </div>
                            </div>
                        ))}
                        <span className="sr-only">Loading your wishlist...</span>
                    </div>
                )}

                {!loading && error && (
                    <div role="alert" className="rounded-2xl border border-[#e8c8c1] bg-[#fff7f5] px-6 py-8 text-center">
                        <p className="text-lg font-semibold text-[#8e473e]">We couldn’t load your saved finds.</p>
                        <p className="mt-2 text-sm text-[#805f59]">
                            {typeof error === "string" ? error : error.message || "Something went wrong. Please try again."}
                        </p>
                        <button
                            type="button"
                            onClick={() => dispatch(getWishlist())}
                            className="mt-5 rounded-full bg-[#263c2d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3b5843] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#263c2d]"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {!loading && !error && wishlist.length === 0 && (
                    <div className="relative overflow-hidden rounded-3xl border border-[#e5e4dc] bg-white px-6 py-16 text-center shadow-[0_20px_60px_rgba(38,60,45,0.06)] sm:px-12 sm:py-20">
                        <div aria-hidden="true" className="absolute -left-16 -top-20 h-52 w-52 rounded-full bg-[#f6e9e5]" />
                        <div aria-hidden="true" className="absolute -bottom-28 -right-12 h-64 w-64 rounded-full bg-[#e8eee5]" />
                        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f6e9e5] text-5xl text-[#a4615a]">
                            ♡
                        </div>
                        <p className="relative mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#8a9a82]">
                            A lovely place to start
                        </p>
                        <h2 className="relative mt-3 text-2xl font-semibold text-[#263c2d] sm:text-3xl">
                            Your wishlist is waiting
                        </h2>
                        <p className="relative mx-auto mt-3 max-w-md text-sm leading-6 text-[#697067] sm:text-base">
                            When something catches your eye, save it here and find it again whenever you like.
                        </p>
                        <Link
                            to="/products"
                            className="relative mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#263c2d] px-7 text-sm font-semibold text-white transition hover:bg-[#3b5843] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#263c2d]"
                        >
                            Explore the collection
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                )}

                {!loading && !error && wishlist.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {wishlist.map((product) => (
                            <article
                                key={product._id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-[#e5e4dc] bg-white p-3 shadow-[0_8px_28px_rgba(38,60,45,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(38,60,45,0.12)]"
                            >
                                <div className="relative overflow-hidden rounded-xl bg-[#f1f5ee]">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-80 w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                                        />
                                    ) : (
                                        <div className="flex h-80 items-center justify-center text-6xl font-semibold text-[#9baa93]">
                                            {product.name?.charAt(0)?.toUpperCase() || "♡"}
                                        </div>
                                    )}
                                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#526c55] shadow-sm backdrop-blur">
                                        {product.category || "Marketplace find"}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemove(product._id)}
                                        aria-label={`Remove ${product.name} from wishlist`}
                                        className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-xl text-[#a4615a] shadow-sm transition hover:scale-110 hover:bg-[#fff0ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a4615a]"
                                    >
                                        ♥
                                    </button>
                                </div>

                                <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                                    <h3 className="line-clamp-2 min-h-14 text-lg font-semibold leading-6 text-[#263c2d]">
                                        {product.name}
                                    </h3>
                                    <p className="mt-2 text-xl font-semibold tracking-tight text-[#526c55]">
                                        ₹{Number(product.price).toLocaleString("en-IN")}
                                    </p>
                                    <div className="mt-auto flex items-center gap-3 pt-5">
                                        <Link
                                            to={`/product/${product._id}`}
                                            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#263c2d] px-4 text-sm font-semibold text-white transition hover:bg-[#3b5843] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#263c2d]"
                                        >
                                            View product
                                            <span aria-hidden="true">→</span>
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => handleRemove(product._id)}
                                            aria-label={`Remove ${product.name} from wishlist`}
                                            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#e5e4dc] text-[#8a7772] transition hover:border-[#e8c8c1] hover:bg-[#fff7f5] hover:text-[#a4615a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a4615a]"
                                        >
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            <footer className="border-t border-[#e5e4dc] bg-white/70 px-5 py-7 text-center">
                <p className="text-sm text-[#697067]">
                    Good things are worth saving
                    <span aria-hidden="true" className="ml-2 text-[#a4615a]">♡</span>
                </p>
            </footer>
        </main>
    );
}

export default Wishlist;
