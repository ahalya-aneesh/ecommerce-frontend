import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/productSlice";

function ProductForm() {

    const dispatch = useDispatch();

    const { loading, error } = useSelector(
        (state) => state.product
    );

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: ""
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        const product = new FormData();

        product.append("name", formData.name);
        product.append("price", formData.price);
        product.append("description", formData.description);
        product.append("category", formData.category);
        product.append("stock", formData.stock);

        if (image) {
            product.append("image", image);
        }

        const result = await dispatch(addProduct(product));

        if (addProduct.fulfilled.match(result)) {

            setFormData({
                name: "",
                price: "",
                description: "",
                category: "",
                stock: ""
            });

            setImage(null);

            form.reset();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 px-4 py-10 sm:px-6">

            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-8 text-center">

                    <div className="mb-3 inline-flex rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
                        ✨ Product Management
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
                        Add New Product
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Add a new item to your ecommerce collection.
                    </p>

                </div>


                {/* Main Card */}
                <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">

                    {/* Colorful top bar */}
                    <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400"></div>


                    <form
                        onSubmit={handleSubmit}
                        className="p-6 sm:p-10"
                    >

                        {/* Section Heading */}
                        <div className="mb-8 flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-xl text-white shadow-lg">
                                🛍️
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    Product Information
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Enter the details of your product
                                </p>
                            </div>

                        </div>


                        {/* Form Grid */}
                        <div className="grid gap-6 md:grid-cols-2">

                            {/* Product Name */}
                            <div>
                                <label
                                    htmlFor="product-name"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Product Name
                                </label>

                                <div className="relative">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500">
                                        🏷️
                                    </span>

                                    <input
                                        id="product-name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter product name"
                                        required
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm text-gray-800 outline-none transition focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-100"
                                    />

                                </div>
                            </div>


                            {/* Category */}
                            <div>
                                <label
                                    htmlFor="product-category"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Category
                                </label>

                                <div className="relative">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500">
                                        📂
                                    </span>

                                    <input
                                        id="product-category"
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        placeholder="e.g. Electronics"
                                        required
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm text-gray-800 outline-none transition focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
                                    />

                                </div>
                            </div>


                            {/* Price */}
                            <div>
                                <label
                                    htmlFor="product-price"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Price
                                </label>

                                <div className="relative">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-green-500">
                                        ₹
                                    </span>

                                    <input
                                        id="product-price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="Enter price"
                                        required
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm text-gray-800 outline-none transition focus:border-green-400 focus:bg-white focus:ring-4 focus:ring-green-100"
                                    />

                                </div>
                            </div>


                            {/* Stock */}
                            <div>
                                <label
                                    htmlFor="product-stock"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Stock Quantity
                                </label>

                                <div className="relative">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500">
                                        📦
                                    </span>

                                    <input
                                        id="product-stock"
                                        type="number"
                                        min="0"
                                        step="1"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        placeholder="Enter stock quantity"
                                        required
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm text-gray-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                                    />

                                </div>
                            </div>


                            {/* Description */}
                            <div className="md:col-span-2">

                                <label
                                    htmlFor="product-description"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Product Description
                                </label>

                                <textarea
                                    id="product-description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe your product..."
                                    required
                                    rows="5"
                                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                />

                            </div>


                            {/* Image Upload */}
                            <div className="md:col-span-2">

                                <label
                                    htmlFor="product-image"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Product Image
                                </label>

                                <label
                                    htmlFor="product-image"
                                    className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50 px-6 py-10 text-center transition hover:border-purple-500 hover:bg-purple-100"
                                >

                                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-md">
                                        📸
                                    </div>

                                    <p className="font-semibold text-gray-700">
                                        {image
                                            ? image.name
                                            : "Click to upload product image"}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        PNG, JPG or JPEG
                                    </p>

                                    <input
                                        id="product-image"
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setImage(
                                                e.target.files?.[0] || null
                                            )
                                        }
                                        required
                                        className="hidden"
                                    />

                                </label>

                            </div>

                        </div>


                        {/* Error */}
                        {error && (
                            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                ⚠️ {error}
                            </div>
                        )}


                        {/* Submit */}
                        <div className="mt-8">

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 px-6 py-4 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "Adding Product..."
                                    : "✨ Add Product"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default ProductForm;