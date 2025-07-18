```
# 🛒 Delish Monde – Bakery E-Commerce App

A full-stack e-commerce web app built for a bakery. Users can browse products, place orders, and admins can manage users, orders, and view sales insights.

---

## 🔧 Tech Stack
- **Frontend:** React, Vite, CSS Modules
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (HTTP-only cookies)

---

## ✨ Features

### 👤 Users
- Register/Login
- Add to Cart (LocalStorage)
- Checkout and place orders
- View and cancel past orders

### 🛠️ Admins
- View all users
- View all orders (with user info)
- Change order status (e.g. shipped/delivered)
- View dashboard summary: total users, orders, revenue

---

## 📁 Folder Structure

```bash
/server      → Express backend
/client      → React frontend
```

---

## 🚀 Getting Started

### Backend

```bash
cd server
npm install

# .env
PORT=5000
MONGO_URI=mongodb://localhost:27017/delishmonde
JWT_SECRET=yourSecretKey

npm run dev
```

### Frontend

```bash
cd client
npm install

# .env
VITE_API_URL=http://localhost:5000/api

npm run dev
```

---

## 📌 Why This Project?

Built as a hands-on project to demonstrate **full-stack skills**:

* Auth flows
* Admin controls
* CRUD operations
* REST APIs
* Real-world architecture

---

# sample
‣慳灭敬�