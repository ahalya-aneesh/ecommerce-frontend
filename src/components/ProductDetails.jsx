
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";
import AddToCartButton from "./AddToCartButton";
import {
    addToWishlist,
    getWishlist,
    removeFromWishlist
} from "../redux/wishlistSlice";

function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { product, loading, error } = useSelector(
        (state) => state.product
    );
    const { wishlist, error: wishlistError } = useSelector(
        (state) => state.wishlist
    );

    useEffect(() => {
        dispatch(getProductById(id));
        dispatch(getWishlist());
    }, [dispatch, id]);

    const isInWishlist = product && wishlist.some(
        (item) =>
            String(typeof item === "string" ? item : item._id) ===
            String(product._id)
    );

    const handleWishlistToggle = () => {
        if (!product) {
            return;
        }

        dispatch(
            isInWishlist
                ? removeFromWishlist(product._id)
                : addToWishlist(product._id)
        );
    };

    const handleBuyNow = () => {
        dispatch(addToCart(product));
        navigate("/cart");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-[#697067]">Loading product...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p role="alert" className="text-[#8e473e]">{error}</p>
                <Link
                    to="/products"
                    className="rounded-md bg-[#263c2d] px-6 py-3 text-white"
                >
                    Back to Products
                </Link>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-lg text-[#697067]">Product not found.</p>
                <Link
                    to="/products"
                    className="rounded-md bg-[#263c2d] px-6 py-3 text-white"
                >
                    Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f6f4ee] px-5 py-12 text-[#263c2d]">
            <div className="mx-auto max-w-6xl">

                <Link
                    to="/products"
                    className="mb-8 inline-flex items-center text-sm font-medium text-[#263c2d] hover:underline"
                >
                    ← Back to Products
                </Link>

                <div className="grid gap-10 rounded-3xl border border-[#e5e4dc] bg-white p-6 shadow-[0_18px_50px_rgba(38,60,45,0.07)] md:grid-cols-2 md:p-10">

                    {/* Product Image */}
                    <div className="flex items-center justify-center rounded-2xl bg-[#f1f5ee] p-6">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-[450px] w-full object-contain"
                        />
                    </div>

                    {/* Product Information */}
                    <div className="flex flex-col justify-center">

                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#70816f]">
                            {product.category}
                        </p>

                        <h1 className="mb-4 text-3xl font-bold text-[#263c2d] md:text-4xl">
                            {product.name}
                        </h1>

                        <p className="mb-6 text-2xl font-semibold text-[#263c2d]">
                            ₹{Number(product.price).toLocaleString("en-IN")}
                        </p>

                        <p className="mb-8 leading-7 text-[#697067]">
                            {product.description}
                        </p>

                        <button
                            type="button"
                            onClick={handleWishlistToggle}
                            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                            aria-pressed={Boolean(isInWishlist)}
                            className="mb-6 inline-flex min-h-11 w-fit items-center gap-2 rounded-md border border-[#d9ddd4] px-4 text-sm font-semibold text-[#263c2d] transition-colors hover:bg-[#e8eee5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#263c2d]"
                        >
                            <span aria-hidden="true" className="text-xl text-[#a4615a]">
                                {isInWishlist ? "♥" : "♡"}
                            </span>
                            {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                        </button>

                        {wishlistError && (
                            <p role="alert" className="mb-6 text-sm text-[#8e473e]">
                                {wishlistError}
                            </p>
                        )}

                        <dl className="space-y-4 border-y border-[#e5e4dc] py-5">

                            <div className="flex justify-between gap-4">
                                <dt className="text-[#788174]">Category</dt>
                                <dd className="font-medium text-[#354439]">
                                    {product.category}
                                </dd>
                            </div>

                            <div className="flex justify-between gap-4">
                                <dt className="text-[#788174]">Availability</dt>
                                <dd
                                    className={
                                        Number(product.stock) > 0
                                            ? "font-medium text-[#3c6045]"
                                            : "font-medium text-[#9a5147]"
                                    }
                                >
                                    {Number(product.stock) > 0
                                        ? `${product.stock} in stock`
                                        : "Out of stock"}
                                </dd>
                            </div>

                        </dl>

                        {/* Add to Cart and View Cart Buttons */}
                        <div className="mt-9 flex flex-wrap gap-3">

                            <AddToCartButton
                                product={product}
                                className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#263c2d] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#3b5843] disabled:cursor-not-allowed disabled:opacity-50"
                            />

                            <button
                                type="button"
                                disabled={Number(product.stock) <= 0}
                                onClick={handleBuyNow}
                                className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#263c2d] px-6 text-sm font-semibold text-[#263c2d] transition-colors hover:bg-[#e8eee5] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Buy Now
                            </button>

                            <Link
                                to="/cart"
                                className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#263c2d] px-6 text-sm font-semibold text-[#263c2d] hover:bg-[#e8eee5]"
                            >
                                View Cart →
                            </Link>

                        </div>

                        <Link
                            to="/products"
                            className="mt-6 inline-flex items-center text-sm text-[#697067] hover:text-[#263c2d] hover:underline"
                        >
                            ← Continue shopping
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;