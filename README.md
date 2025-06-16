# 🛍️ ShopEase – E-commerce Frontend React App

ShopEase is a fully responsive eCommerce frontend application built with **React** and **Redux Toolkit**. It includes product listing, product details, cart management, user login/signup, checkout functionality, free shipping notices, and dynamic pricing — all integrated with clean UI components and smooth user experience.

---

## 🚀 Tech Stack

| Tool/Library | Purpose |
|--------------|---------|
| **React** | Frontend framework |
| **React Router DOM** | Routing between pages |
| **Redux Toolkit + Persist** | State management for cart/auth |
| **Bootstrap 5** | Responsive design |
| **Font Awesome** | Icons throughout the UI |
| **React Hook Form + Yup** | Form validation and handling |
| **React Helmet Async** | Dynamic SEO page titles |
| **Axios** | API calls to fetch product data |

---

## 📦 Features

### 🏠 Home Page
- Fetches and displays products from [dummyjson.com](https://dummyjson.com/)
- Responsive product cards with images, prices, ratings
- Add to cart button with dynamic quantity controls
- Modal popup for promo code and login prompt

### 🛒 Cart Page
- View all items in cart
- Increase/decrease quantities or remove items
- Displays cart total using currency formatting
- Checkout and clear cart buttons
- Free shipping notice bar

### 🧾 Checkout Page
- Contact and shipping address form
- Payment method selection
- Promo code support (`WELCOME10`)
- Summary of items and total
- Confirmation modal on order submit

### 🔐 Auth Pages
- Login and Signup forms using React Hook Form + Yup
- Error handling and success toasts
- Simulated login using Redux (no backend)

### 📄 Product Detail Page
- Fetch single product data by ID
- Show image, price, description, rating
- Add/remove from cart
- Login prompt if not authenticated

### 🌐 Navigation and SEO
- Responsive Navbar with search and login/logout toggle
- Dynamic page titles with Helmet
- 404 Not Found page for unmatched routes

---

## 🧠 Project Architecture
src/
│
├── assets/styles/ # CSS files (scoped per component)
├── components/ # Reusable components (Navbar, Footer, Buttons)
├── pages/ # Main screens (Home, Cart, ProductDetail, etc.)
├── redux/ # Redux slices and store config
├── App.js # Main app with routing
└── index.js # ReactDOM root + Redux/Persist provider

------------------------------

## 🛠️ How to Run Locally

1. **Clone this repository:**
```bash
git clone https://github.com/yourusername/shopease.git
cd shopease

2. **Install dependencies:**                 
npm install

3. **Start the development server:**
npm start

## 🧪 Dummy API Used
- [DummyJSON Products API](https://dummyjson.com/)
- Used for fetching all products and single product by ID


## 📸 Screenshots

### 🏠 Home Page
![Home Page](../e-commerce/src/assets//images/Home.png)

### 🔐 Login
![Login](../e-commerce/src/assets//images/LogIn.png)

### 🔐Signup Page
![SignUp](../e-commerce/src/assets//images/SignUp.png)

### 📦 Product Detail Page
![Product Detail Page](../e-commerce/src/assets//images/Product-Detail.png)

### 🛒 Cart Page
![Cart Page](../e-commerce/src/assets//images/Cart.png)

### 💳 Checkout Page
![Checkout Page](../e-commerce/src/assets//images/Checkout1.png)
![Checkout Page](../e-commerce/src/assets//images/Checkout2.png)

### 🔍 404 Page
![404 Page](../e-commerce/src/assets//images/Notfound.png)



## ✅ To-Do / Future Improvements
- Add real authentication using Firebase or JWT
- Integrate payment gateway (Stripe/PayPal)
- Add product filtering and categories
- Enable product reviews and user profile


## 👩‍💻 Author
**Rukaya Abbas**  
Built as a complete front-end eCommerce demo using modern React practices.

## 📄 License
This project is open source and available under the MIT License.

## ✅ Summary of Fixes Made

| Fix                              | Why |
|----------------------------------|-----|
| Markdown formatting (code blocks, bullet points) | For clean rendering |
| Folder structure block wrapped in triple backticks | Prevent layout breaking |
| Author name capitalized & placed in correct section | Clarity |
| Bash command formatting for install/start | Clean terminal instructions |
| Screenshot placeholders | Ready for GitHub |
| Added `Live Demo` section if hosted (optional) | For real-world usage |