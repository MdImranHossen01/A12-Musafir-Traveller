
# 🌏 Musafir Traveller - A Full-Stack Tourism Management Platform

![Musafir Traveller Screenshot](https://i.ibb.co/1JJZ8P1F/musafir.png)

Musafir Traveller is a comprehensive MERN stack tourism management platform designed to help travelers explore the beauty of Bangladesh.  
It offers detailed tour packages, connects tourists with expert local guides, and provides a community space for sharing travel stories.

---

## 🔗 Live Project Links

- **Frontend:** [https://musafirtraveller.vercel.app/](https://musafirtraveller.vercel.app/)
- **Backend API:** [https://musafir-server.vercel.app/](https://musafir-server.vercel.app/)

---

## ✨ Core Features

- **Three User Roles** — Separate dashboards for **Tourists**, **Tour Guides**, and **Admins** with role-based permissions.
- **Authentication & Security** — Email/Password & Google Sign-In via Firebase, protected API routes with JWT.
- **Dynamic Tour Packages** — Admin-created packages with image galleries, itineraries, and random package display on home.
- **Interactive Booking System** — Tourists can book packages, choose guides, and pay securely via Stripe.
- **Role-Specific Dashboards:**
  - **Tourists:** Manage profile, bookings, and travel stories.
  - **Tour Guides:** Manage assigned tours, accept/reject jobs.
  - **Admins:** Manage users, change roles, approve guides, and control packages.
- **Community Story Sharing** — Users can post, edit, and share stories on social media.
- **Fully Responsive** — Mobile-first design with smooth animations.

---

## 🛠 Technologies Used

### **Frontend**
- React, React Router
- Tailwind CSS, DaisyUI
- TanStack Query, Axios
- Firebase Authentication
- Framer Motion, Swiper.js
- `react-hot-toast`, `react-icons`, `react-share`
- `react-confetti`, `react-tabs`, `react-datepicker`, `react-select`

### **Backend**
- Node.js, Express.js
- MongoDB
- Firebase Admin SDK
- JSON Web Token (JWT)
- Cloudinary, Multer
- Stripe Payments
- `cors`, `dotenv`

---

## 🚀 How to Run Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/MdImranHossen01/A12-Musafir-Traveller.git
cd A12-Musafir-Traveller
````

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `/server` with:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
VITE_IMGBB_API_KEY=your_imgbb_api_key
```

Run:

```bash
npm start
```

Server runs on: `http://localhost:5000`

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
```

Create a `.env.local` file inside `/client` with:

```env
VITE_API_URL=http://localhost:5000
VITE_LIVE_SITE_URL=http://localhost:5173

VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_bucket
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id

VITE_STRIPE_PK_KEY=your_stripe_publishable_key
VITE_STRIPE_TEST_MODE=true
```

Run:

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 📱 Responsiveness

Works seamlessly on:

* ✅ Mobile
* ✅ Tablet
* ✅ Desktop

---

## 🔐 Authentication Logic

* Firebase Auth with Email/Password & Google
* JWT-protected API routes
* Conditional Navbar & redirects for unauthenticated users

---

## 🔄 CRUD Operations

* **Create:** Admin adds packages; Tourists create stories
* **Read:** Dynamic packages, stories, and bookings
* **Update:** Edit user profile, stories, and packages
* **Delete:** Cancel bookings, delete stories or packages

---

## 🎁 Bonus Features

* Lottie animations & interactive UI
* Stripe payment integration
* Facebook share for stories
* Cloudinary image hosting
* Loading & empty states
* Custom 404 page

---

## 📷 Screenshot

![Musafir Traveller Screenshot](https://i.ibb.co/1JJZ8P1F/musafir.png)

---

**Musafir Traveller – Explore Bangladesh, one journey at a time!** 🏞


