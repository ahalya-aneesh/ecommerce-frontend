import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/productSlice";

const inputClassName = "min-h-11 w-full rounded-xl border border-[#dfe3da] bg-[#fbfcf9] px-3.5 text-sm text-[#263c2d] outline-none transition placeholder:text-[#a0a69d] focus:border-[#71836e] focus:bg-white focus:ring-4 focus:ring-[#71836e]/10";
const labelClassName = "mb-2 block text-sm font-semibold text-[#354439]";

function ProductForm() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.product);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: ""
    });
    const [image, setImage] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formElement = event.currentTarget;

        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => form.append(key, value));
        if (image) {
            form.append("image", image);
        }

        const result = await dispatch(addProduct(form));
        if (addProduct.fulfilled.match(result)) {
            setFormData({
                name: "",
                price: "",
                description: "",
                category: "",
                stock: ""
            });
            setImage(null);
            formElement.reset();
        }
    };

    return (
        <section className="rounded-2xl border border-[#e5e4dc] bg-white p-5 shadow-[0_12px_36px_rgba(38,60,45,0.06)] sm:p-6">
            <div className="mb-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#71836e]">
                    Product management
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-[#263c2d]">
                    Add a product
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#697067]">
                    Add an item to your collection.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="product-name" className={labelClassName}>Product name</label>
                    <input
                        id="product-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        required
                        className={inputClassName}
                    />
                </div>

                <div>
                    <label htmlFor="product-category" className={labelClassName}>Category</label>
                    <input
                        id="product-category"
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="e.g. Electronics"
                        required
                        className={inputClassName}
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label htmlFor="product-price" className={labelClassName}>Price</label>
                        <div className="relative">
                            <span aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#71836e]">₹</span>
                            <input
                                id="product-price"
                                type="number"
                                min="0"
                                step="0.01"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0.00"
                                required
                                className={`${inputClassName} pl-8`}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="product-stock" className={labelClassName}>Stock</label>
                        <input
                            id="product-stock"
                            type="number"
                            min="0"
                            step="1"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="Quantity"
                            required
                            className={inputClassName}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="product-description" className={labelClassName}>Description</label>
                    <textarea
                        id="product-description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your product..."
                        required
                        rows="4"
                        className="w-full resize-y rounded-xl border border-[#dfe3da] bg-[#fbfcf9] px-3.5 py-3 text-sm text-[#263c2d] outline-none transition placeholder:text-[#a0a69d] focus:border-[#71836e] focus:bg-white focus:ring-4 focus:ring-[#71836e]/10"
                    />
                </div>

                <div>
                    <label htmlFor="product-image" className={labelClassName}>Product image</label>
                    <label
                        htmlFor="product-image"
                        className="flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#cbd2c5] bg-[#f6f8f4] px-4 py-5 text-center transition hover:border-[#71836e] hover:bg-[#f1f5ee]"
                    >
                        <span aria-hidden="true" className="mb-1 text-xl text-[#71836e]">↑</span>
                        <span className="text-sm font-semibold text-[#354439]">
                            {image ? image.name : "Choose an image to upload"}
                        </span>
                        <span className="mt-1 text-xs text-[#788174]">PNG, JPG or JPEG</span>
                        <input
                            id="product-image"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(event) => setImage(event.target.files?.[0] || null)}
                            required
                            className="sr-only"
                        />
                    </label>
                </div>

                {error && (
                    <p role="alert" className="rounded-xl border border-[#e8c8c1] bg-[#fff7f5] px-4 py-3 text-sm text-[#8e473e]">
                        {typeof error === "string" ? error : error.message || "Could not add product."}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#263c2d] px-5 text-sm font-semibold text-white transition hover:bg-[#3b5843] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#263c2d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Adding product..." : "Add product"}
                    {!loading && <span aria-hidden="true">→</span>}
                </button>
            </form>
        </section>
    );
}

export default ProductForm;
