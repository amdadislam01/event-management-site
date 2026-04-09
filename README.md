# 🌐 Modern Event Management Platform

A highly responsive, full-stack **Event Management Platform** architected with the latest **Next.js 16 (App Router)**, **React 19**, **NextAuth v5**, and native **MongoDB** integration. It offers a seamless, premium user experience for discovering events, booking tickets, securing user authentication, and comprehensive event management.

---

## ⭐ Overview

This project provides an end-to-end event discovery and ticket management solution. Key capabilities include:

* **Explore & Search:** Dynamic browsing of upcoming and recent events.
* **Event Management:** Create, edit, and manage custom events with a rich UI.
* **Ticket Booking:** Secure, streamlined ticket purchasing system.
* **User Dashboard:** Dedicated profiles and tracking of booked/managed events.
* **Secure Authentication:** Robust credential and session management powered by NextAuth v5.

Built with a strong focus on modern aesthetics, performance, smooth animations, and clean full-stack architecture.

---

## 📦 Tech Stack

### **Frontend (Next.js 16 App Router)**
* ⚛️ **React 19** – State-of-the-art UI rendering
* 🚀 **Next.js 16** – Server Components, App Router, optimized built-in routing
* 🎨 **Tailwind CSS v4** – Utility-first, highly customizable styling
* 🪄 **Framer Motion & Lenis** – Fluid micro-animations and smooth page scrolling
* 📝 **React Hook Form** – Blazing-fast, flexible form handling
* 🧊 **SweetAlert2 & Lucide React** – Modern alert modals and crisp SVG icons
* 📅 **React Datepicker** – User-friendly date and time selection

### **Backend (Next.js API Routes + MongoDB)**
* 🔐 **NextAuth.js (v5)** – Comprehensive, secure authentication
* 🗄️ **MongoDB (Driver v7)** – Robust NoSQL database for flexible data storage
* 🛡️ **Bcryptjs** – Secure password hashing encryption
* 🚀 **Vercel** – Ready for seamless edge-network deployment

---

## 🛠️ Project Structure

The project has been migrated to a modern full-stack Next.js structure, eliminating the need for a separate Express backend:

```text
.
├── public/                 # Static assets (images, fonts, etc.)
├── src/
│   ├── app/                # Next.js App Router Pages
│   │   ├── all-events/     # Browse all events page
│   │   ├── api/            # Backend API Routes
│   │   │   ├── auth/       # NextAuth.js endpoints
│   │   │   ├── booking/    # Ticket booking API
│   │   │   ├── events/     # Event CRUD endpoints
│   │   │   ├── register/   # User registration API
│   │   │   └── users/      # User management API
│   │   ├── create-event/   # Event creation form
│   │   ├── login/          # Login page
│   │   ├── my-events/      # User's managed events dashboard
│   │   ├── profile/        # User profile page
│   │   ├── register/       # User registration page
│   │   ├── ticket-booking/ # Ticket booking flow
│   │   ├── globals.css     # Global styles and Tailwind configs
│   │   ├── layout.js       # Root layout component
│   │   └── page.js         # Landing page (Hero, Features, Testimonials)
│   ├── components/         # Reusable UI Components
│   │   ├── Features.js     # Landing page features section
│   │   ├── Footer.js       # Global footer
│   │   ├── Hero.js         # Landing page hero section
│   │   ├── HowItWorks.js   # Informational section
│   │   ├── Navbar.jsx      # Dynamic navigation bar
│   │   ├── ProtectRoute.js # Client-side route protection wrapper
│   │   ├── Providers.jsx   # Context and Session providers
│   │   ├── RecentEvents.jsx# Dynamic recent events display
│   │   └── Testimonials.js # User testimonials slider
├── .env.local              # Environment variables
├── next.config.mjs         # Next.js compiler configuration
├── package.json            # Dependencies and scripts
└── eslint.config.mjs       # Linting rules
```

---

## 📌 Backend API Endpoints

All APIs are integrated directly into the Next.js framework through Serverless API routes (`/api/*`).

| Method | Endpoint | Description |
|--------|-----------------------|--------------------------------------------------|
| **POST** | `/api/auth/[...nextauth]` | Handles user login, session creation, and logout. |
| **POST** | `/api/register` | Registers a new user and hashes passwords. |
| **GET** | `/api/events` | Fetches a paginated list of all upcoming events. |
| **POST** | `/api/events` | Creates a new event (Protected route). |
| **GET** | `/api/events/[id]` | Fetches detailed information for a specific event. |
| **PUT/PATCH**| `/api/events/[id]` | Updates existing event data (Protected route). |
| **DELETE**| `/api/events/[id]` | Deletes a specific event (Protected route). |
| **POST** | `/api/booking` | Submits a new ticket booking request. |
| **GET** | `/api/booking/[id]` | Fetches ticket booking history for a user. |
| **GET** | `/api/users/[id]` | Retrieves user profile data. |

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/amdadislam01/event-management-site.git
cd event-management-site
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Environment Configuration
Create a `.env.local` file in the root directory and add the following keys. Example:
```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://<your_username>:<your_password>@cluster0.mongodb.net/event-db

# NextAuth Configuration
NEXTAUTH_SECRET=your_super_secret_string # Geenrate using: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000

# Public URL (if required for image sharing, meta tags, etc.)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4️⃣ Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🎨 UI & UX Features

* **Glassmorphism Design:** Subtle blurs and rich card components.
* **Component Modularity:** Reusable chunks logic keeping the codebase clean.
* **Responsive Layouts:** Mobile-first approach scaling beautifully to ultra-wide displays.
* **Seamless Page Transitions:** Handled effectively using Next.js App Router pre-fetching and Framer Motion context.

---

## 🔮 Future Plans / Roadmap

We are continuously working to improve the platform. Here are some of the features planned for upcoming releases:

* 💳 **Payment Gateway Integration:** Real-time ticket purchasing logic using Stripe or SSLCommerz.
* 📧 **Email Notifications:** Automated booking confirmations and event reminders via Nodemailer or Resend.
* 🎫 **QR Code Ticketing:** Generating unique QR codes for purchased tickets to allow for quick scanning at event venues.
* 👥 **Role-Based Access Control (RBAC):** Implementing multi-level user roles (Admin, Organizer, Attendee) for advanced permission handling.
* 📊 **Organizer Analytics:** A dedicated analytics dashboard for event creators to track sales and attendance.
* ⭐ **Reviews & Ratings:** Allowing attendees to submit ratings and feedback for past events.

---

## 📄 Available Scripts

```bash
npm run dev    # Starts the development server seamlessly 
npm run build  # Builds the app for production (Vercel optimized)
npm run start  # Runs the compiled production build
npm run lint   # Runs ESLint to check for code conformity
```

---

## 👨‍💻 Author

**MD. Amdad Islam**  
*MERN Stack Developer*

If you find this project valuable, please consider giving it a ⭐ on GitHub!
