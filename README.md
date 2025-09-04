# 💧 Hydra Life – MERN Stack E-Commerce Website  

<p align="center">
  <b>Hydra Life</b> is a full-stack <b>MERN e-commerce application</b> for selling packaged water bottles.  
  It includes user features like product browsing, cart, checkout, and order history, plus an admin dashboard to manage products and orders.
</p>

## 🌟 Features  

### 👤 User
- 🛒 **Product Listings** with details  
- ➕ **Add to Cart** and **Buy Now**  
- 📦 **Order Placement** with checkout  
- ⭐ **Product Reviews**  

### 🛠️ Admin
- 🔑 **Admin Authentication**  
- 📋 **Manage Products** (Add, Edit, View, Delete)  
- 📦 **Manage Orders** (View, Update Status, Delete)  
- 📊 **Admin Dashboard** with analytics  

### ⚙️ System
- 🌐 **MERN Stack** (MongoDB, Express, React, Node.js)  
- 📩 **Email Confirmation** on order  
- 📱 **SMS Notification** via Fast2SMS *(coming soon)*  
- ☁️ **Deployment**  
  - Frontend → Vercel  
  - Backend → Render  
  - Domain → hydralife.in  
- 🛡️ **CORS Secured** with domain whitelisting  
- 💓 **Health Check Endpoint** (`/health`) + **UptimeRobot integration**  

---

## 🖼️ Screenshots  

<p align="center">
  <img width="800" src="https://github.com/user-attachments/assets/b504b153-2997-40c8-8003-b35e1120136c" />
  <img width="800" src="https://github.com/user-attachments/assets/0f447e3f-853e-4a31-8443-c168cc7a286d" />
  <img width="800" src="https://github.com/user-attachments/assets/664ec2b4-7425-4590-95f5-0d77f78db84a" />
  <img width="800" src="https://github.com/user-attachments/assets/9c81e0f7-75ef-4087-b420-1595a6b3c069" />
  <img width="800" src="https://github.com/user-attachments/assets/ce9820ed-0e68-40bd-ba11-3cfc229fde87" />
  <img width="800" src="https://github.com/user-attachments/assets/a63b4077-f2be-4eb1-a69b-b1370447c40b" />
  <img width="800" src="https://github.com/user-attachments/assets/5e6bcb98-e2e0-4b85-a504-4e232fa2e9e3" />
  <img width="800" src="https://github.com/user-attachments/assets/ee323d6e-cf6f-44af-932d-39fd63596434" />
  <img width="800" src="https://github.com/user-attachments/assets/5d47a9c7-8452-4e6b-a2f2-2343ccac4d46" />
  <img width="800" src="https://github.com/user-attachments/assets/15325f3c-c63f-4f54-ab39-c1c2fcff1786" />
  <img width="800" src="https://github.com/user-attachments/assets/1b114922-263e-40ff-9df9-b9e9d0472033" />
  <img width="800" src="https://github.com/user-attachments/assets/71b40f17-2278-4bbe-9570-3c5833fc8a39" />
</p>

---

## 🏗️ Tech Stack  

**Frontend**
- ⚛️ React + Vite  
- 📡 Axios  
- 🎨 TailwindCSS / Bootstrap  
- 🚀 Deployed on Vercel  

**Backend**
- 🟢 Node.js + Express.js  
- 🍃 MongoDB + Mongoose  
- 📧 Nodemailer (Gmail SMTP)  
- 📱 Fast2SMS API *(coming soon)*  
- 🚀 Deployed on Render  

---

## 📂 Folder Structure  
HydraLife/
│
├── client/ # React frontend (Vercel)
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── App.jsx
│ └── package.json
│
├── server/ # Express backend (Render)
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── server.js
│ └── package.json
│
├── .env # Environment variables
└── README.md


## ⚡ Getting Started  

### 1️⃣ Clone the Repository  
git clone https://github.com/VivekLpu/hydra-life.git
cd hydra-life

2️⃣ Setup Backend
cd server
npm install

Create a .env file inside server/:
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_user
EMAIL_PASS=your_gmail_app_password
FAST2SMS_API_KEY=your_fast2sms_key

Start backend:
npm start

Backend runs at 👉 http://localhost:5000

3️⃣ Setup Frontend
cd client
npm install
npm run dev

🌍 Deployment
Frontend: Vercel
Backend: Render
Domain: Custom domain mapped → hydralife.in

🔑 API Routes
User APIs
GET /api/products → Get products

POST /api/orders → Place order

Admin APIs
POST /api/admin/login → Admin login

POST /api/products → Add product

DELETE /api/products/:id → Delete product

GET /api/orders → View all orders

PATCH /api/orders/:id → Update order status

Utility
GET /health → Health check endpoint (used for UptimeRobot keep-alive)
🚀 Keep Server Alive
Backend is on Render Free Tier → may go to sleep after inactivity.

Added /health endpoint in server.js.

Configured UptimeRobot to ping every 5 minutes → keeps server awake → instant product loading.


⭐ If you found this project useful, don’t forget to give it a star!

👤 Author
<h3 align="center">Vivek Kumar</h3>
<p align="center"> 💻 B.Tech CSE | MERN Stack Developer </p> <p align="center"> <a href="https://viveklpu.github.io/Portfolio-Website/">🌐 Portfolio</a> • <a href="https://www.linkedin.com/in/vivek-kumar87/">💼 LinkedIn</a> • <a href="https://leetcode.com/u/Vivek_LPU/">🏆 LeetCode</a> </p>

