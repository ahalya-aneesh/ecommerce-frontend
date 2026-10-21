import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProduct } from "../redux/productSlice";
import { addToWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, loading, error } = useSelector((state) => state.product);
     const wishlist = useSelector(
        (state) => state.wishlist.wishlist
    );

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    const handleBuyNow = (product) => {
        dispatch(addToCart(product));
        navigate("/cart");
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <main className="storefront-hero">

                {/* Left Content */}
                <section className="storefront-hero-content">

                    <p className="storefront-eyebrow">
                        Everything you need, in one place.
                    </p>

                    <h1>
                        Find your next
                        <span> everyday favorite.</span>
                    </h1>

                    <p className="storefront-description">
                        A little something for every part of your day. Browse
                        the collection and find pieces you’ll love to bring home.
                    </p>

                    <div className="storefront-hero-actions">

                        <Link
                            to="/products"
                            className="storefront-primary-button"
                        >
                            Explore the shop <span aria-hidden="true">→</span>
                        </Link>

                        <Link
                            to="/products"
                            className="storefront-secondary-button"
                        >
                            Browse collection
                        </Link>

                    </div>

                    <div className="storefront-social-proof">
                        <span className="storefront-proof-stars" aria-label="Five stars">★★★★★</span>
                        <span>Little finds, lots of happy homes</span>
                    </div>

                </section>


                {/* Right Image */}
                <section className="storefront-hero-image" aria-label="Shop the latest collection">

                    <img
                        src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1600&q=85"
                        alt="Browsing a curated clothing collection in a shop"
                    />

                    <div className="storefront-image-overlay"></div>

                    <div className="storefront-image-note">
                        <span>THE EVERYDAY EDIT</span>
                        <p>Good things are just around the corner.</p>
                    </div>

                    <div className="storefront-image-badge">
                        <span aria-hidden="true">✦</span>
                        <p>Find your<br />kind of good</p>
                    </div>
                </section>

            </main>


            {/* Features */}
            <section className="storefront-benefits" aria-label="Shopping benefits">

                <div className="storefront-benefit">
                    <span className="storefront-benefit-icon" aria-hidden="true">✦</span>
                    <div>
                        <h3>Curated with care</h3>
                        <p>Thoughtful finds for your everyday.</p>
                    </div>
                </div>

                <div className="storefront-benefit">
                    <span className="storefront-benefit-icon" aria-hidden="true">♡</span>
                    <div>
                        <h3>Something for everyone</h3>
                        <p>Explore a collection made for real life.</p>
                    </div>
                </div>

                <div className="storefront-benefit">
                    <span className="storefront-benefit-icon" aria-hidden="true">✓</span>
                    <div>
                        <h3>Easy, happy shopping</h3>
                        <p>Find it, love it, add it to your cart.</p>
                    </div>
                </div>

            </section>


            {/* Collection Section */}
            <section className="storefront-collection">

                <div className="storefront-collection-heading">
                    <p>THE GOOD-FINDS CLUB</p>

                    <h2>
                        A little something
                        <br />
                        for every day.
                    </h2>
                    <span>Meet the pieces making everyday life a little more lovely.</span>
                </div>

                <Link
                    to="/products"
                    className="storefront-view-products"
                >
                    See everything <span aria-hidden="true">→</span>
                </Link>

            </section>

            <section className="home-products" aria-label="Featured products">
                {loading ? (
                    <p role="status" className="home-products-message">Loading products...</p>
                ) : error ? (
                    <p role="alert" className="home-products-message home-products-error">{error}</p>
                ) : products.length === 0 ? (
                    <p className="home-products-message">There are no products to show yet.</p>
                ) : (
                    <div className="home-products-grid">
                        {products.slice(0, 3).map((product) => (
                            <article key={product._id} className="home-product-card">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="home-product-image"
                                    />
                                ) : (
                                    <div aria-hidden="true" className="home-product-image home-product-placeholder">
                                        {product.name?.charAt(0)?.toUpperCase() || "?"}
                                    </div>
                                )}
                                
<button
    type="button"
    className="wishlist-button"
    onClick={() => dispatch(addToWishlist(product._id))}
    aria-label="Add to wishlist"
>
    {wishlist.some(
        (item) =>
            String(typeof item === "string" ? item : item._id) ===
            String(product._id)
    ) ? "♥" : "♡"}
</button>

                                <p className="home-product-category">{product.category || "Uncategorized"}</p>
                                <h3>{product.name}</h3>
                                <p className="home-product-description">
                                    {product.description || "No description available."}
                                </p>
                                <div className="home-product-footer">
                                    <span>₹{Number(product.price).toLocaleString("en-IN")}</span>
                                    <Link to={`/product/${product._id}`}>View details →</Link>
                                </div>
                                <div className="home-product-actions">
                                    <AddToCartButton product={product} />
                                    <button
                                        type="button"
                                        disabled={Number(product.stock) <= 0}
                                        onClick={() => handleBuyNow(product)}
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

        </div>
    );
}

export default Home;