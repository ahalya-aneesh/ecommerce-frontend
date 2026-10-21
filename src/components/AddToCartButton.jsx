import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function AddToCartButton({ product, className = "" }) {
    const dispatch = useDispatch();
    const quantityInCart = useSelector(
        (state) =>
            state.cart.items.find((item) => item._id === product._id)?.quantity || 0
    );
    const [added, setAdded] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);
    const timeoutRef = useRef(null);
    const outOfStock = Number(product.stock) <= 0;
    const maxQuantityReached = quantityInCart >= Number(product.stock);

    useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

    const handleClick = () => {
        if (outOfStock || maxQuantityReached) {
            return;
        }

        dispatch(addToCart(product));
        setAnimationKey((key) => key + 1);
        setAdded(true);
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => setAdded(false), 1200);
    };

    return (
        <button
            type="button"
            disabled={outOfStock || maxQuantityReached}
            onClick={handleClick}
            className={`${className} add-to-cart-button${added ? " is-added" : ""}`}
        >
            <span key={animationKey} className="add-to-cart-label" aria-live="polite">
                {outOfStock
                    ? "Out of Stock"
                    : maxQuantityReached
                        ? "Max in Cart"
                        : added
                            ? "✓ Added!"
                            : "Add to Cart"}
            </span>
        </button>
    );
}

export default AddToCartButton;
