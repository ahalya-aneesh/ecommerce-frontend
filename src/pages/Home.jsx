import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProduct } from "../redux/productSlice";
import "./home.css";
import { addToWishlist } from "../redux/wishlistSlice";
function Home() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.product);
     const wishlist = useSelector(
        (state) => state.wishlist.wishlist
    );

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    return (
        <div className="home">

            {/* Navbar */}
            <nav className="navbar">

                <Link to="/" className="logo">
                    Everyday
                </Link>

                <div className="nav-links">
                     <Link to="/register">Register</Link>
                 <Link to="/login">Login</Link>
                
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/about">About</Link>
                 <Link to="/wishlist">Wishlist ♡</Link>
                
    
                </div>

                <Link to="/products" className="nav-shop-btn">
                    Shop Now
                </Link>

            </nav>


            {/* Hero Section */}
            <main className="hero">

                {/* Left Content */}
                <section className="hero-content">

                    <p className="small-title">
                        A little more you
                    </p>

                    <h1>
                        Good finds for
                        <span> everyday living.</span>
                    </h1>

                    <p className="hero-description">
                        Discover thoughtful picks for your home,
                        your routine, and everything in between.
                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/products"
                            className="shop-button"
                        >
                            Shop now
                            <span>→</span>
                        </Link>

                        <Link
                            to="/products"
                            className="explore-button"
                        >
                            Explore collection
                        </Link>

                    </div>

                    <p className="bottom-text">
                        A considered collection, made for real life.
                    </p>

                </section>


                {/* Right Image */}
                <section className="hero-image">

                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=85"
                        alt="Warm, thoughtfully arranged independent shop"
                    />

                    <div className="image-overlay"></div>

                    <div className="image-caption">
                        <span>01</span>
                        <p>Find something lovely</p>
                    </div>

                </section>

            </main>


            {/* Features */}
            <section className="features">

                <div className="feature">
                    <div className="feature-icon">✦</div>
                    <div>
                        <h3>Thoughtful choices</h3>
                        <p>Products selected for everyday life.</p>
                    </div>
                </div>

                <div className="feature">
                    <div className="feature-icon">♡</div>
                    <div>
                        <h3>Made for you</h3>
                        <p>Simple products you'll love to use.</p>
                    </div>
                </div>

                <div className="feature">
                    <div className="feature-icon">✓</div>
                    <div>
                        <h3>Easy shopping</h3>
                        <p>A simple and comfortable experience.</p>
                    </div>
                </div>

            </section>


            {/* Collection Section */}
            <section className="collection">

                <div className="collection-heading">
                    <p>OUR COLLECTION</p>

                    <h2>
                        Things you'll want
                        <br />
                        to keep around.
                    </h2>
                </div>

                <Link
                    to="/products"
                    className="view-products"
                >
                    View all products →
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
                            </article>
                        ))}
                    </div>
                )}
            </section>

        </div>
    );
}

export default Home;