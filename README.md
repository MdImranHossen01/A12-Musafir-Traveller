# Musafir Traveller - A Full-Stack Tourism Management Platform

Welcome to Musafir Traveller, a comprehensive, full-stack tourism management platform designed to help travelers explore the beauty of Bangladesh. This application provides detailed tour packages, connects tourists with expert local guides, and fosters a community where users can share their travel stories. This repository contains the complete MERN stack application, with the React client in the `/client` directory and the Node.js/Express server in the `/server` directory.

![Musafir Traveller Screenshot]([https://i.ibb.co/your-screenshot-link-here.png](https://ibb.co.com/M55nMtrF)
*(**Note:** Please take a beautiful screenshot of your homepage, upload it to a site like [ImgBB](https://imgbb.com/), and replace the link above.)*

---

### **Live Project Links**

* **Live Website:** [https://musafirtraveller.vercel.app/](https://musafirtraveller.vercel.app/)
* **Live Server API:** [https://musafir-server.vercel.app/](https://musafir-server.vercel.app/)

---

### **Core Features of the Project**

* **Three User Roles:** A complete system with separate dashboards and functionalities for Tourists, Tour Guides, and Admins.
* **Full Authentication:** Secure user registration and login with email/password and Google Sign-In, managed with Firebase and JWT for protected API routes.
* **Dynamic Tour Packages:** Admins can create detailed tour packages with image galleries and day-by-day plans. The homepage dynamically displays random packages from the database.
* **Interactive Booking System:** Tourists can book packages, select a tour guide, and complete payments securely using Stripe.
* **Role-Based Dashboards:**
    * **Tourists:** Can manage their profile, view and cancel their bookings, and share/edit their travel stories.
    * **Tour Guides:** Can view and manage their assigned tours by accepting or rejecting them.
    * **Admins:** Have full control to manage users (including changing roles), packages, and tour guide applications.
* **Community & Story Sharing:** A dedicated community page where users can read and share travel stories, complete with Facebook sharing functionality.
* **Fully Responsive:** The entire application, including the multi-functional dashboards, is designed to be mobile-friendly and works beautifully on all devices.

---

### **Technologies & Dependencies Used**

#### **Client-Side (Frontend)**

* **Core:** React, React Router
* **Styling:** Tailwind CSS, DaisyUI
* **Data Fetching:** TanStack Query, Axios
* **Authentication:** Firebase
* **Animations & UI:** Framer Motion, Swiper.js, `react-confetti`, `react-tabs`, `react-datepicker`, `react-select`
* **Utilities:** `react-hot-toast`, `react-icons`, `react-share`

#### **Server-Side (Backend)**

* **Core:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JSONWebToken (JWT), Firebase Admin SDK
* **Image & File Handling:** Cloudinary, Multer
* **Payment:** Stripe
* **Utilities:** `cors`, `dotenv`

---

### **How to Run This Project Locally**

This is a full-stack project. You will need to run both the client and the server simultaneously in two separate terminals.

#### **1. Running the Server (Backend)**

1.  **Navigate to the Server Directory:**
    ```bash
    cd server
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Set Up Environment Variables:**
    * Create a file named `.env` in the `/server` folder.
    * Add all your secret keys for MongoDB, JWT, Stripe, Cloudinary, and Firebase Admin.
4.  **Run the Development Server:**
    ```bash
    npm start
    ```
    The server will be available at `http://localhost:5000`.

#### **2. Running the Client (Frontend)**

1.  **Navigate to the Client Directory:**
    ```bash
    cd client
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Set Up Environment Variables:**
    * Create a file named `.env.local` in the `/client` folder.
    * Add your Firebase and Stripe public keys, and set the API URL to your local server.
        ```env
        VITE_API_URL=http://localhost:5000
        VITE_API_KEY=your_firebase_api_key
        VITE_AUTH_DOMAIN=your_firebase_auth_domain
        # ... and all other VITE_ variables
        ```
4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.
