import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProduct } from '../redux/productSlice'
import { useNavigate } from 'react-router-dom'
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
                        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Admin dashboard</h1>
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
                            <p className="py-10 text-center text-sm text-[#8e473e]" role="alert">
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
                                        className="group flex min-h-56 flex-col overflow-hidden rounded-2xl border border-[#e5e4dc] bg-white p-4 shadow-[0_8px_28px_rgba(38,60,45,0.04)] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(38,60,45,0.1)] motion-reduce:transition-none motion-reduce:hover:transform-none"
                                    >
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="mb-5 h-72 w-full rounded-xl bg-[#f1f5ee] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                                            />
                                        ) : (
                                            <div
                                                aria-hidden="true"
                                                className="mb-5 flex h-72 items-center justify-center rounded-xl bg-[#e8eee5] text-6xl font-semibold text-[#71836e]"
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
                                        <div className="mt-auto flex items-center justify-end gap-3 border-t border-[#eeede7] pt-4">
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(product._id)}
                                                aria-label={`Delete ${product.name}`}
                                                className="rounded border border-[#eed4cf] px-3 py-2 text-sm font-semibold text-[#9a5147] transition duration-200 hover:-translate-y-0.5 hover:bg-[#fbefec] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a5147] motion-reduce:transition-none motion-reduce:hover:transform-none"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                type="button"
                                                className="rounded bg-[#263c2d] px-3 py-2 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#3b5843] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#263c2d] motion-reduce:transition-none motion-reduce:hover:transform-none"
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

                    <aside>
                        <ProductForm />
                    </aside>
                </div>
 </div>
        </main>
       
        
    )
}

export default ProductList