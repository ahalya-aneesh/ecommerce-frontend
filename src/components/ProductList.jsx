import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProduct } from '../redux/productSlice'
import { Link, useNavigate } from 'react-router-dom'
import ProductForm from './ProductForm'

function ProductList() {

    const { products, loading, error } = useSelector(
        (state) => state.product
    )
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deleteProduct(id))
    }
    const navigate=useNavigate()

    return (
        <main className="min-h-[calc(100vh-4.5rem)] bg-[#f6f4ee] px-5 py-10 text-[#20231f] sm:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#e5e4dc] pb-6">
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#71836e]">
                            The collection
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Products</h1>
                    </div>
                    <p className="text-sm text-[#697067]">
                        {products.length} {products.length === 1 ? 'item' : 'items'}
                    </p>
                </header>

                <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
                    <section aria-label="Product catalog">
                        {loading ? (
                            <p className="py-10 text-center text-sm text-[#697067]" role="status">
                                Loading products...
                            </p>
                        ) : error ? (
                            <p className="py-10 text-center text-sm text-red-700" role="alert">
                                {error}
                            </p>
                        ) : products.length === 0 ? (
                            <div className="flex min-h-64 flex-col items-center justify-center border border-dashed border-[#cbd2c5] px-6 text-center">
                                <h2 className="text-lg font-semibold text-[#354439]">Your collection is waiting</h2>
                                <p className="mt-2 max-w-sm text-sm leading-6 text-[#697067]">
                                    Add your first product with the form to start building your catalog.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {products.map((product) => (
                                    <article
                                        key={product._id}
                                        className="flex min-h-56 flex-col border border-[#e6e5dd] bg-white p-5 transition-shadow hover:shadow-md"
                                    >
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="mb-5 h-48 w-full rounded-sm bg-[#f6f4ee] object-cover"
                                            />
                                        ) : (
                                            <div
                                                aria-hidden="true"
                                                className="mb-5 flex h-48 items-center justify-center rounded-sm bg-[#e8eee5] text-6xl font-semibold text-[#b8c8b3]"
                                            >
                                                {product.name?.charAt(0)?.toUpperCase() || "?"}
                                            </div>
                                        )}
                                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#71836e]">
                                            {product.category || 'Uncategorized'}
                                        </p>
                                        <h2 className="text-lg font-semibold leading-snug text-[#263c2d]">
                                            {product.name}
                                        </h2>
                                        <p className="mt-4 text-2xl font-semibold tracking-tight text-[#20231f]">
                                            ₹{product.price}
                                        </p>
                                        <p className="mt-1 text-sm text-[#697067]">
                                            {product.stock} in stock
                                        </p>
                                        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#eeede7] pt-4">
                                            <Link
                                                to={`/product/${product._id}`}
                                                className="text-sm font-semibold text-[#3c6045] underline decoration-[#b9c6b5] underline-offset-4 hover:text-[#263c2d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#263c2d]"
                                            >
                                                View details
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(product._id)}
                                                aria-label={`Delete ${product.name}`}
                                                className="rounded px-2 py-1 text-sm font-medium text-[#9a5147] hover:bg-[#fbefec] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a5147]"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                type="button"
                                                className="rounded px-2 py-1 text-sm font-medium text-[#9a5147] hover:bg-[#fbefec] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a5147]"
                                                onClick={() => navigate('/updateproduct', { state: { product } })}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>

                    <aside className="border border-[#e6e5dd] bg-white p-5 sm:p-6">
                        <ProductForm />
                    </aside>
                </div>
 </div>
        </main>
       
        
    )
}

export default ProductList