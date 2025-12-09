# Restaurant Web App (Cuisine Élégante)

A full-stack restaurant application designed to provide a seamless dining experience. This platform allows users to browse menus, place food orders, make table reservations, and manage their dining history through a modern, responsive interface.

## 🚀 Features

- **Interactive Menu:** Browse food categories and items with a responsive UI.
- **Ordering System:** Add items to cart and place orders securely.
- **Table Reservations:** Book tables for specific dates, times, and party sizes.
- **User Accounts:** User authentication (JWT) and profile management.
- **Dining History:** Track past orders and view upcoming reservations.
- **Admin Management:** (Optional) Manage menu items and view orders.
- **Location Services:** Integrated maps for restaurant location (Leaflet).

## 🛠️ Tech Stack

### Frontend (Client)

- **Framework:** Vue.js 3 (Composition API)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** Pinia
- **Routing:** Vue Router
- **Animations:** GSAP
- **Maps:** Leaflet / Vue2Leaflet
- **Icons:** FontAwesome

### Backend (Server)

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JSON Web Tokens (JWT) & Google Auth
- **Validation:** Joi (or similar validation logic)

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URI)

## ⚙️ Environment Variables

You need to set up environment variables for the server to function correctly.

1. Create a `.env` file in the `server` directory.
2. Add the following variables:

```env
# Server Configuration
PORT=3000

# Database Connection
Mongo_DB_URI=mongodb://localhost:27017/restaurantweb

# Security & Authentication
JWT_SECRET=your_super_secret_key_here
JWT_COOKIE_EXPIRE=30d

# OAuth (Optional - if using Google Login)
GOOGLE_CLIENT_ID=your_google_client_id
```

# Navigate to the server directory

cd server

# Install dependencies

npm install

# Start the server (Development mode)

npm run dev

# OR Start the server (Production mode)

npm run start

# Navigate to the client directory

cd client

# Install dependencies

npm install

# Start the development server

npm run dev
