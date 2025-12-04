# 🌐 Event Management Platform

A modern, full‑stack **Event Management Platform** built using the latest **Next.js 16**, **React 19**, **Clerk Authentication**, and a powerful **Express + MongoDB backend**. Designed for smooth event browsing, ticket booking, user dashboards, and secure authentication.

---


## ⭐ Overview

This project aims to simplify event discovery and management. Users can:

* Explore upcoming events
* View event details
* Buy tickets securely
* Manage their own bookings
* Access a fully protected dashboard

Built with performance, scalability, and clean architecture in mind.

---

## 📦 Tech Stack

### **Frontend (Next.js 16)**

* ⚛️ **React 19** – Optimized UI
* 🚀 **Next.js 16** – App Router, Server Components
* 🔐 **Clerk** – Authentication & user management
* 📝 **React Hook Form** – Super-fast form handling
* 🎨 **React Icons** – Icon support
* 🧊 **SweetAlert2** – Modern alert modals

### **Backend (Node + Express)**

* 🌐 **Express.js 5** – REST API
* 🗄️ **MongoDB 7** – NoSQL database
* 🔁 **CORS** – Secure communication
* 🔑 **dotenv** – Environment configuration

---

## 🛠️ Project Structure

```
.
├── .clerk/
├── .next/
├── public/
├── server/
│   ├── .vercel/
│   ├── node_modules/
│   ├── .env
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── src/
│       ├── routes/
│       ├── controllers/
│       ├── models/
│       └── config/
├── src/
│   ├── app/
│   │   ├── all-events/
│   │   ├── create-event/
│   │   ├── my-events/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/
│   └── middleware.js
├── .env
├── next.config.mjs
├── jsconfig.json
├── eslint.config.mjs
├── package.json
└── postcss.config.mjs
```

---

## 🔐 Authentication (Clerk)
This project includes full authentication with Clerk:
- Email/Password login
- OAuth / Social login
- Route protection (middleware)
- User sessions & profile

---

## 🚀 Getting Started
### 1️⃣ Clone the repository
```

git clone [https://github.com/amdadislam01/event-management-site.git](https://github.com/amdadislam01/event-management-site.git)
cd event-management-site

```

---
## ⚙️ Frontend Setup
```

cd frontend
npm install

```
Create `.env.local`:
```

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_API_URL=[http://localhost:5000](http://localhost:5000)

```
Run frontend:
```

npm run dev

```

---
## ⚙️ Backend Setup
```

cd backend
npm install

```
Create `.env`:
```

MONGO_URI=your_mongodb_url
PORT=5000

```
Run backend:
```

npm start

```

---

## 🧩 Main Features
### **🌟 User Side**
- Browse all events
- See detailed event pages
- Purchase tickets
- Dashboard for purchased tickets

### **🛠️ Developer Side**
- Modern folder architecture
- Clean reusable components
- Secure API communication
- Organized backend

---

## 📌 Backend API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /events | Get all events |
| GET | /events/:id | Get single event |
| POST | /tickets | Create a ticket |
| GET | /tickets/:userId | Get tickets for a user |

---

## 🖼️ Screenshots
_Add your UI screenshots here for a more polished README._

---

## 📄 Scripts
### Frontend Scripts
```

npm run dev
npm run build
npm run start

```
### Backend Scripts
```

npm start

```


##  Author
**MD. Amdad Islam**  
MERN Stack Developer

If you like this project, don't forget to ⭐ the repository!


