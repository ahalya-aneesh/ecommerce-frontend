import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateProduct } from '../redux/productSlice'
import { useLocation, useNavigate } from 'react-router-dom'

function UpdateProduct() {

    const location=useLocation()
    const product=location.state?.product
    const navigate=useNavigate()

    const [formData, setFormData] = useState({
        name: product.name ,
        price: product.price ,
        description: product.description || '',
        category: product.category,
        stock: product.stock
    })
    const [image, setImage] = useState(null)
    const [error, setError] = useState('')
   

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const updatedProduct = {
            name: formData.name,
            price: Number(formData.price),
            description: formData.description,
            category: formData.category,
            stock: Number(formData.stock)
        }

        try {
            await dispatch(updateProduct({ id: product._id, product: updatedProduct, image })).unwrap()
            navigate('/products')
        } catch (updateError) {
            setError(updateError.message || String(updateError))
        }
       
       
    }

  

    return (
        <form onSubmit={handleSubmit} className="w-full">
                <h2 className="mb-1 text-xl font-semibold text-[#263c2d]">
                    Edit Product
                </h2>
                <p className="mb-6 text-sm leading-6 text-[#697067]">
                    Update the details for {product.name}.
                </p>

               
                <div className="mb-4">
                    <label htmlFor="product-name" className="mb-1.5 block text-sm font-medium text-[#465248]">
                        Product Name
                    </label>

                    <input
                        id="product-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        required
                        className="w-full rounded-sm border border-[#d9dcd4] bg-[#fcfcf9] px-3 py-2.5 text-sm text-[#20231f] outline-none transition-colors placeholder:text-[#92988f] focus:border-[#71836e] focus:ring-2 focus:ring-[#71836e]/20"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="product-description" className="mb-1.5 block text-sm font-medium text-[#465248]">
                        Description
                    </label>
                    <textarea
                        id="product-description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the product"
                        required
                        rows="4"
                        className="w-full rounded-sm border border-[#d9dcd4] bg-[#fcfcf9] px-3 py-2.5 text-sm text-[#20231f] outline-none transition-colors placeholder:text-[#92988f] focus:border-[#71836e] focus:ring-2 focus:ring-[#71836e]/20"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="product-category" className="mb-1.5 block text-sm font-medium text-[#465248]">
                        Category
                    </label>

                    <input
                        id="product-category"
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Enter category"
                        required
                        className="w-full rounded-sm border border-[#d9dcd4] bg-[#fcfcf9] px-3 py-2.5 text-sm text-[#20231f] outline-none transition-colors placeholder:text-[#92988f] focus:border-[#71836e] focus:ring-2 focus:ring-[#71836e]/20"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="product-price" className="mb-1.5 block text-sm font-medium text-[#465248]">
                        Price
                    </label>

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
                        className="w-full rounded-sm border border-[#d9dcd4] bg-[#fcfcf9] px-3 py-2.5 text-sm text-[#20231f] outline-none transition-colors placeholder:text-[#92988f] focus:border-[#71836e] focus:ring-2 focus:ring-[#71836e]/20"
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="product-stock" className="mb-1.5 block text-sm font-medium text-[#465248]">
                        Stock
                    </label>

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
                        className="w-full rounded-sm border border-[#d9dcd4] bg-[#fcfcf9] px-3 py-2.5 text-sm text-[#20231f] outline-none transition-colors placeholder:text-[#92988f] focus:border-[#71836e] focus:ring-2 focus:ring-[#71836e]/20"
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="product-image" className="mb-1.5 block text-sm font-medium text-[#465248]">
                        Replace Product Image (optional)
                    </label>
                    {product.image && (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="mb-3 h-40 w-full rounded-sm bg-[#f6f4ee] object-cover"
                        />
                    )}
                    <input
                        id="product-image"
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        className="w-full rounded-sm border border-[#d9dcd4] bg-[#fcfcf9] px-3 py-2.5 text-sm text-[#20231f] outline-none transition-colors focus:border-[#71836e] focus:ring-2 focus:ring-[#71836e]/20"
                    />
                </div>

                {error && <p role="alert" className="mb-4 text-sm text-red-700">{error}</p>}

                <button
                    type="submit"
                    className="w-full rounded-sm bg-[#263c2d] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3b5843] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#263c2d]"
                >
                    update
                </button>
        </form>
    )
}

export default UpdateProduct