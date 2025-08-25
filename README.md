# 💧 Hydra Life – MERN Stack E-Commerce Website

![Hydra Life Banner] https://drive.google.com/file/d/1dfNbnnNPcHQvKp82TBuo2ft6t5ElejfF/view?usp=sharing

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
- 📋 **Manage Products** (Add,Edit, View, Delete)
- 📦 **Manage Orders** (View, Update Status, Delete)
- 📊 **Admin Dashboard**

### ⚙️ System
- 🌐 **MERN Stack** (MongoDB, Express, React, Node.js)
- 📩 **Email Confirmation** on order
- 📱 **SMS Notification** via Fast2SMS (Will be available soon)
- ☁️ **Deployed** (Frontend: Vercel, Backend: Render, Domain: hydralife.in)
- 🛡️ **CORS Secured** with domain whitelisting
- 💓 **Health Check Endpoint** (`/health`) + UptimeRobot for uptime

## 🖼️ Screenshots

<img width="1823" height="864" alt="image" src="https://github.com/user-attachments/assets/b504b153-2997-40c8-8003-b35e1120136c" />
<img width="1831" height="859" alt="image" src="https://github.com/user-attachments/assets/0f447e3f-853e-4a31-8443-c168cc7a286d" />
<img width="1841" height="859" alt="image" src="https://github.com/user-attachments/assets/664ec2b4-7425-4590-95f5-0d77f78db84a" />
<img width="1828" height="860" alt="image" src="https://github.com/user-attachments/assets/9c81e0f7-75ef-4087-b420-1595a6b3c069" />
<img width="1798" height="863" alt="image" src="https://github.com/user-attachments/assets/ce9820ed-0e68-40bd-ba11-3cfc229fde87" />
<img width="1823" height="861" alt="image" src="https://github.com/user-attachments/assets/a63b4077-f2be-4eb1-a69b-b1370447c40b" />
<img width="1803" height="844" alt="image" src="https://github.com/user-attachments/assets/5e6bcb98-e2e0-4b85-a504-4e232fa2e9e3" />
<img width="1809" height="846" alt="image" src="https://github.com/user-attachments/assets/ee323d6e-cf6f-44af-932d-39fd63596434" />
<img width="1818" height="855" alt="image" src="https://github.com/user-attachments/assets/5d47a9c7-8452-4e6b-a2f2-2343ccac4d46" />
<img width="1815" height="861" alt="image" src="https://github.com/user-attachments/assets/15325f3c-c63f-4f54-ab39-c1c2fcff1786" />
<img width="1777" height="855" alt="image" src="https://github.com/user-attachments/assets/1b114922-263e-40ff-9df9-b9e9d0472033" />
<img width="1796" height="859" alt="image" src="https://github.com/user-attachments/assets/71b40f17-2278-4bbe-9570-3c5833fc8a39" />

## 🏗️ Tech Stack

**Frontend**
- React + Vite
- Axios
- TailwindCSS / Bootstrap
- Vercel Deployment

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- Nodemailer (Gmail SMTP)
- Fast2SMS API (will implement soon)
- Render Deployment

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

git clone https://github.com/yourusername/hydra-life.git
cd hydra-life
2️⃣ Setup Backend
cd server
npm install
Create a .env file inside server/:

.env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_user
EMAIL_PASS=your_gmail_app_password
FAST2SMS_API_KEY=your_fast2sms_key

Start backend:
npm start
Backend runs at:
👉 http://localhost:5000

3️⃣ Setup Frontend
cd client
npm install
npm run dev
Frontend runs at:
👉 http://localhost:3000

🌍 Deployment
Frontend: Deployed on Vercel → hydralife.in

Backend: Deployed on Render → https://hydra-life-server.onrender.com

Domain: Custom domain mapped (hydralife.in)

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

🚀 Keep Server Always Awake
The backend is hosted on Render Free Tier. To avoid cold starts:

Added /health endpoint in server.js.

Setup UptimeRobot to ping https://hydra-life-server.onrender.com/health every 5 minutes.
This keeps the server alive → products load instantly without delay.

📧 Contact
👤 Vivek Kumar
💼 B.Tech CSE | MERN Stack Developer
🌐 hydralife.in
📧 vivekkr8789@gmail.com
🔗 https://www.linkedin.com/in/vivek-kumar87/ | https://github.com/VivekLpu

⭐ Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss.
