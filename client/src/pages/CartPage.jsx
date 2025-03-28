import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/CartPage.module.css";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  // Load cart products from localStorage when component mounts
  useEffect(() => {
    const loadCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
    };

    loadCart();

    // Listen for storage changes (fixes cart not updating in real-time)
    window.addEventListener("storage", loadCart);
    return () => window.removeEventListener("storage", loadCart);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/users/profile`,
          {
            withCredentials: true, // ✅ Ensures HTTP-Only cookies are sent
          }
        );
        setUser(response.data); // Store user data in state
      } catch (error) {
        console.error("Error checking auth status:", error);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const handleCheckout = async () => {
    if (!user) {
      // If user is null, they're not logged in
      alert("You need to log in to proceed to checkout!");
      navigate("/login"); // Redirect to login page
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderData = {
      items: cartItems.map((item) => ({
        productId: item._id, // Ensure `_id` is used consistently
        quantity: item.quantity,
      })),
      totalAmount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    };

    try {
      const response = await axios.post(
        `${API_URL}/orders/`,
        orderData,
        {
          withCredentials: true, // ⬅️ This ensures cookies (JWT) are sent
        }
      );
      console.log(orderData);

      alert("Order placed successfully!");
      clearCart();
      navigate("/order-success");
    } catch (error) {
      alert(
        "Error placing order: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className={styles.cartContainer}>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <button onClick={() => navigate("/menu")}>Menu</button>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className={styles.cartItem}>
              <img
                src={item.image || "https://placehold.co/100"}
                alt={item.name}
              />
              <div>
                <h3>{item.name}</h3>
                <p>
                  ₹{item.price} x {item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className={styles.removeButton}
              >
                Remove
              </button>
            </div>
          ))}
          <div className={styles.cartSummary}>
            <button className={styles.clearCart} onClick={clearCart}>
              Clear Cart
            </button>
            <div className={styles.totalAmount}>
              <strong>
                Total: ₹
                {cartItems.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                )}
              </strong>
            </div>
            <button
              className={styles.checkoutButton}
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
