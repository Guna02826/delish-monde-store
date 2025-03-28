import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/OrderHistoryPage.module.css";
const API_URL = import.meta.env.VITE_API_URL;

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/orders/my-orders`, {
          withCredentials: true, // ✅ Ensures HTTP-only cookies (JWT) are sent
        });

        setOrders(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.orderHistoryContainer}>
      <h2>Your Order History</h2>
      {orders.length === 0 ? (
        <p>You have no past orders.</p>
      ) : (
        <ul className={styles.orderList}>
          {orders.map((order) => (
            <li key={order._id} className={styles.orderItem}>
              <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
              <p>
                Status: <strong>{order.status}</strong>
              </p>
              <p>Total: ₹{order.totalPrice}</p>
              <ul>
                {order.products.map((item) => (
                  <li key={item.productId._id}>
                    {item.productId.name} - ₹{item.productId.price} x{" "}
                    {item.quantity}
                  </li>
                ))}
              </ul>
              <p>
                <small>
                  Placed on: {new Date(order.createdAt).toLocaleString()}
                </small>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistoryPage;
