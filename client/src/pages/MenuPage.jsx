import styles from "../styles/MenuPage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

function MenuPage() {
  const [foods, setFoods] = useState([]);
  const [categorizedFoods, setCategorizedFoods] = useState({});

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(`${API_URL}/product/cakes`);
        const foodsData = response.data;
        setFoods(foodsData);
        setCategorizedFoods(categorizeFoods(foodsData));
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoods();
  }, []);

  const categorizeFoods = (foods) => {
    const categories = {};
    const bestSellers = [];

    foods.forEach((food) => {
      if (Array.isArray(food.category)) {
        if (food.category.includes("Best Sellers")) {
          bestSellers.push(food);
        }
        food.category.forEach((cat) => {
          if (cat !== "Best Sellers") {
            if (!categories[cat]) {
              categories[cat] = [];
            }
            categories[cat].push(food);
          }
        });
      }
    });

    return { "Best Sellers": bestSellers, ...categories };
  };

  return (
    <div className={styles.menuContainer}>
      {Object.keys(categorizedFoods).map((category) => (
        <div key={category} className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>{category}</h2>
          <div className={styles.menu}>
            {categorizedFoods[category].map((food) => (
              <FoodItem key={food._id} food={food} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FoodItem({ food }) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = (food) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item._id === food._id);

    if (existingItem) {
      existingItem.quantity += quantity; // Increase existing quantity
    } else {
      cart.push({ ...food, quantity }); // Add new item with selected quantity
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${food.name} added to cart!`);
  };

  return (
    <div className={styles.food}>
      <h3>{food.name}</h3>
      <img src={food.image || "https://placehold.co/150"} alt={food.name} />
      <p className={styles.desc}>{food.description}</p>
      <b>₹{food.price}</b>
      <div className={styles.quantityContainer}>
        <button
          className={styles.quantityButton}
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
        >
          −
        </button>
        <span className={styles.quantity}>{quantity}</span>
        <button
          className={styles.quantityButton}
          onClick={() => setQuantity((prev) => prev + 1)}
        >
          +
        </button>
      </div>
      <button className={styles.addToCart} onClick={() => addToCart(food)}>
        Add to Cart
      </button>
    </div>
  );
}

export default MenuPage;
