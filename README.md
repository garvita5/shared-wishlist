# Shared Wishlist App

A full-stack web application that allows users to create and share wishlists with others.
Users can log in, create wishlists, add items, view who added each item, and remove them. Built as part of an internship assignment.

---

##  Setup Instructions

1. **Clone the repository**  
   git clone https://github.com/garvita5/shared-wishlist.git
   cd shared-wishlist
   
3. Navigate to Server
  - cd server
  - npm install
   
5. Navigate to Client
 - cd ../client
 - npm install

6. Firebase Setup
 - Add your Firebase config in /client/.env
 - Add Firebase Admin SDK JSON file in /server/firebase-admin-key.json
 - Example .env file for client:
 -VITE_API_KEY=...
 - VITE_AUTH_DOMAIN=...
 - VITE_PROJECT_ID=...
 - VITE_STORAGE_BUCKET=...
 - VITE_MESSAGING_SENDER_ID=...
 - VITE_APP_ID=...

7. Run the App
 - In /server folder:
  node index.js
 - In /client folder:
  npm run dev
-----------------------------------------------------------------------
Tech Stack Used:
 - Frontend: React (Vite), Tailwind CSS
 - Backend: Node.js, Express
 - Database & Auth: Firebase (Firestore, Auth)
 -Deployment Ready: Yes (can be deployed via Vercel/Render)

----------------------------------------------------------------------
Features:
 - User Signup / Login (via Firebase Auth)
 - Wishlist CRUD (Create, Read, Update, Delete)
 - Shared wishlists (multiple users can view same wishlist)
 - Real-time updates using Firestore listeners
 - Shows the user who added each item
 - Logout functionality
 - Beautiful lilac-themed UI with responsive layout

