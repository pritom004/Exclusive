# Exclusive - E-Commerce Platform

Exclusive is a modern, full-stack e-commerce web application designed with an emphasis on seamless user experience, clean code architecture, and a beautiful UI. Built using the MERN stack and styled entirely with Tailwind CSS, this project provides a fully functional shopping experience from product discovery to secure checkout.

## 🚀 Key Features

*   **Authentication:** Secure user signup, login, and profile management using JWT (JSON Web Tokens).
*   **Product Discovery:** Browse a comprehensive product catalog featuring detailed product views, filtering, and stock-level indicators.
*   **Seamless Shopping Cart:** Add products to your cart, update quantities, and track running totals effortlessly.
*   **"Buy Now" Direct Checkout:** Bypass the shopping cart entirely for rapid purchases with a dedicated, interactive "Buy Now" flow.
*   **Stripe Integration:** Secure end-to-end payment processing using Stripe Elements and backend webhook fulfillment.
*   **Smooth UX & Loading States:** Zero Flash of Unstyled Content (FOUC). Contextual skeleton loaders (`react-loading-skeleton`) ensure the UI never feels broken during data fetching.
*   **Centralized State Management:** Powered by Redux Toolkit, abstracted cleanly behind reusable custom hooks (`useAuth`, `useCart`, `useProducts`, `useCheckout`).
*   **Backend Validation & Error Handling:** Comprehensive input validation via `express-validator` and a global error-handling middleware.

## 💻 Tech Stack

**Frontend:**
*   React (Vite)
*   Redux Toolkit & React-Redux
*   Tailwind CSS
*   React Router DOM
*   React Loading Skeleton
*   Stripe Elements (`@stripe/react-stripe-js`)

**Backend:**
*   Node.js & Express.js
*   MongoDB & Mongoose
*   Stripe API (`stripe`)
*   JSON Web Tokens (`jsonwebtoken`)
*   Express-Validator

## 📂 Project Structure

The project is structured into two main directories:

*   `/client`: Contains the Vite + React frontend application.
*   `/server`: Contains the Express + MongoDB backend API.

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v16 or higher)
*   [MongoDB](https://www.mongodb.com/) (Local or Atlas)
*   A [Stripe](https://stripe.com/) Developer Account

### Environment Variables

**Backend (`/server/.env`)**
Create a `.env` file in the `/server` directory and configure the following:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

**Frontend (`/client/.env`)**
Create a `.env` file in the `/client` directory and configure the following:

```env
VITE_API_URL=http://localhost:8000
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
```

### Installation & Execution

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/Exclusive.git
    cd Exclusive
    ```

2.  **Start the Backend:**
    ```bash
    cd server
    npm install
    npm run dev
    ```

3.  **Start the Frontend:**
    Open a new terminal window:
    ```bash
    cd client
    npm install --legacy-peer-deps
    npm run dev
    ```

4.  **Open the application:**
    Navigate to `http://localhost:5173` in your browser.
