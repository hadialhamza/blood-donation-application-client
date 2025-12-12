# 🩸 BloodLine - A Life Saving Connection

**BloodLine** is a comprehensive, full-stack MERN (MongoDB, Express, React, Node.js) application designed to bridge the gap between blood donors and those in urgent need. It features a modern, glassmorphic UI, real-time donor searching, role-based dashboards, and a secure funding system.

## 🔗 Live Links

- **🌐 Live Website:** [https://bloodline-savelives.vercel.app/](https://bloodline-savelives.vercel.app)
- **⚙️ Server API:** [https://server-bloodline.vercel.app/](https://server-bloodline.vercel.app)
- **📂 Client Repository:** [GitHub - Client](https://github.com/hadialhamza/blood-donation-application-client)
- **📂 Server Repository:** [GitHub - Server](https://github.com/hadialhamza/blood-donation-application-server) _(Note: Ensure this links to your actual server repo if different)_

---

## 🚀 Key Features

### 🌟 User Interface & Experience

- **Modern Design:** Utilizes **Shadcn UI** and **Tailwind CSS** with a custom Red/Rose color palette.
- **Glassmorphism:** Premium glass-effect cards and sections for a modern aesthetic.
- **Responsive:** Fully optimized for mobile, tablet, and desktop devices.
- **Animations:** Smooth transitions using Framer Motion and CSS animations.

### 🔐 Authentication & Security

- **Firebase Authentication:** Secure Email/Password Login and Registration.
- **JWT Protection:** Secure API endpoints using JSON Web Tokens (verifyToken middleware).
- **Role-Based Access Control:** Distinct routes and dashboards for **Donors**, **Volunteers**, and **Admins**.
- **Image Upload:** Integration with ImageBB for profile picture hosting.

### 🩸 Core Functionality (Donors/Users)

- **Advanced Search:** Find donors by **Blood Group**, **District**, and **Upazila**.
- **Donation Requests:**
  - Create urgent blood donation requests.
  - View "My Requests" with filtering (Pending, In Progress, Done, Canceled).
  - Edit or Delete requests.
  - View Request Details with a "Donate" action modal.
- **Profile Management:** Update personal details and location.
- **Public Feed:** View pending donation requests on the homepage and dedicated pages.

### 🛠️ Admin Dashboard

- **Analytics Dashboard:**
  - Visual data using **Recharts** (Pie Charts, Area Charts, Bar Charts).
  - Stats for Total Users, Total Funding, and Blood Requests.
- **User Management:**
  - View all users.
  - Block/Unblock users.
  - Promote users to Volunteer or Admin roles.
- **Content Management:**
  - Rich Text Editor for creating Blogs.
  - Draft/Publish toggle system for blogs.
  - Filter and Delete functionality.

### 💰 Funding & Payments

- **Stripe Integration:** Secure payment gateway for platform funding.
- **Payment History:** Users can view their donation history.

---

## 🛠️ Technology Stack

### Frontend

- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS, Shadcn UI, DaisyUI
- **State Management:** TanStack Query (React Query), Context API
- **Routing:** React Router DOM
- **Forms:** React Hook Form
- **Visualization:** Recharts
- **Icons:** Lucide React, React Icons
- **Notifications:** SweetAlert2, React Hot Toast

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose/Native Driver)
- **Authentication:** Firebase Admin SDK / JWT
- **Payment:** Stripe API

---

## 📦 NPM Packages Used

| Package                  | Purpose                   |
| :----------------------- | :------------------------ |
| `@tanstack/react-query`  | Data fetching and caching |
| `axios`                  | HTTP Client               |
| `firebase`               | Authentication            |
| `react-hook-form`        | Form handling             |
| `stripe/react-stripe-js` | Payment Element           |
| `lucide-react`           | Modern Icons              |
| `recharts`               | Admin Charts              |
| `sweetalert2`            | Modals and Alerts         |
| `react-fast-marquee`     | Partner/Sponsor slider    |
| `react-countup`          | Number animations         |

---

## ⚙️ Environment Variables

To run this project locally, you will need to add the following environment variables to your `.env.local` file in the **Client** folder:

```env
VITE_APIKey=your_firebase_api_key
VITE_AuthDomain=your_firebase_auth_domain
VITE_ProjectId=your_firebase_project_id
VITE_StorageBucket=your_firebase_storage_bucket
VITE_MessagingSenderId=your_firebase_messaging_sender_id
VITE_AppId=your_firebase_app_id
VITE_IMGBB_API_KEY=your_imgbb_api_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

And in your **Server** `.env` file:

```env
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
ACCESS_TOKEN_SECRET=your_jwt_secret_token
STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## 💻 How to Run Locally

1.  **Clone the repositories:**

    ```bash
    git clone https://github.com/hadialhamza/blood-donation-application-client.git
    git clone https://github.com/hadialhamza/blood-donation-application-server.git
    ```

2.  **Install Dependencies (Client):**

    ```bash
    cd blood-donation-application-client
    npm install
    ```

3.  **Install Dependencies (Server):**

    ```bash
    cd blood-donation-application-server
    npm install
    ```

4.  **Start the Server:**

    ```bash
    nodemon index.js
    # or
    node index.js
    ```

5.  **Start the Client:**

    ```bash
    npm run dev
    ```

---

## 👤 Admin Credentials (For Testing)

> **Note to Evaluator:** You can use the following credentials to access the Admin Dashboard features.

- **Email:** `admin@bloodline.com` (Example)
- **Password:** `123456` (Example)

---

## 🤝 Contribution

Contributions are welcome\! If you find any bugs or want to add a new feature, feel free to open an issue or submit a pull request.

---

### Made with ❤️ by **Hadi Al Hamza**
