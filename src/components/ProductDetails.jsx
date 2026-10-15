
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";

function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { product, loading, error } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        dispatch(getProductById(id));
    }, [dispatch, id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-gray-600">Loading product...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-red-600">{error}</p>
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
                <p className="text-lg text-gray-600">Product not found.</p>
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
        <div className="min-h-screen bg-[#f7f8f5] px-5 py-12">
            <div className="mx-auto max-w-6xl">

                <Link
                    to="/products"
                    className="mb-8 inline-flex items-center text-sm font-medium text-[#263c2d] hover:underline"
                >
                    ← Back to Products
                </Link>

                <div className="grid gap-10 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">

                    {/* Product Image */}
                    <div className="flex items-center justify-center rounded-xl bg-[#f2f3ef] p-6">
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

                        <p className="mb-8 leading-7 text-gray-600">
                            {product.description}
                        </p>

                        <dl className="space-y-4 border-y border-gray-200 py-5">

                            <div className="flex justify-between gap-4">
                                <dt className="text-gray-500">Category</dt>
                                <dd className="font-medium text-gray-800">
                                    {product.category}
                                </dd>
                            </div>

                            <div className="flex justify-between gap-4">
                                <dt className="text-gray-500">Availability</dt>
                                <dd
                                    className={
                                        Number(product.stock) > 0
                                            ? "font-medium text-green-700"
                                            : "font-medium text-red-600"
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

                            <button
                                type="button"
                                disabled={Number(product.stock) <= 0}
                                onClick={() => dispatch(addToCart(product))}
                                className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#263c2d] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#3b5843] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {Number(product.stock) > 0
                                    ? "Add to Cart"
                                    : "Out of Stock"}
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
                            className="mt-6 inline-flex items-center text-sm text-gray-600 hover:text-[#263c2d] hover:underline"
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