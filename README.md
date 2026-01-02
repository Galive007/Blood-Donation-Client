# 🩸 Blood Donation Platform

A full‑stack **Blood Donation Management System** that connects donors, volunteers, and administrators. The platform allows users to register as donors, create blood requests, donate funds via Stripe, and enables admins/volunteers to manage requests and view total funding statistics.

---

## 🔗 Live Demo

* Frontend: [blooddonation25.netlify.app](blooddonation25.netlify.app)
* Backend API: [ttps://blood-donation-one-pHIi.vercel.app/](https://your-backend-url.com)

---

## 🛠 Tech Stack

### Frontend

* React
* React Router
* Tailwind CSS + DaisyUI
* React Hook Form
* Axios
* Firebase Authentication
* Stripe Checkout

### Backend

* 𝗥𝗲𝗮𝗰𝘁.𝗝𝗦
* 𝗡𝗼𝗱𝗲.𝗝𝗦
* 𝗘𝘅𝗽𝗿𝗲𝘀𝘀.𝗝𝗦
* 𝗠𝗼𝗻𝗴𝗼𝗗𝗕
* 𝗙𝗶𝗿𝗲𝗯𝗮𝘀𝗲 (𝗔𝘂𝘁𝗵, 𝗙𝗶𝗿𝗲𝘀𝘁𝗼𝗿𝗲, 𝗛𝗼𝘀𝘁𝗶𝗻𝗴)
* 𝗝𝗪𝗧 (𝗝𝘀𝗼𝗻 𝗪𝗲𝗯 𝗧𝗼𝗸𝗲𝗻)
* 𝗧𝗮𝗶𝗹𝘄𝗶𝗻𝗱 𝗖𝗦𝗦
* 𝗥𝗘𝗦𝗧 𝗔𝗣𝗜𝘀
* Stripe API

---

## 👥 User Roles

### 🧑 Donor

* Register & login
* Create blood requests
* View own blood requests
* Donate funds via Stripe

### 🧑‍🤝‍🧑 Volunteer

* View all blood requests
* View total funds raised

### 👨‍💼 Admin

* Dashboard analytics
* Manage users (status & roles)
* View all blood requests
* View total funds collected

---

## ✨ Core Features

### 🔐 Authentication

* Firebase Authentication (Email/Password, Social Login)
* JWT‑based route protection

### 🩸 Blood Requests

* Create blood donation requests
* Search requests by blood group, district, upazila
* Paginated & recent requests view

### 💰 Funding System

* Stripe Checkout integration
* Secure payment handling
* Payment records stored in MongoDB
* Total funds aggregation for dashboards

### 📊 Dashboards

* Role‑based dashboards
* Admin statistics:

  * Total donors
  * Total blood requests
  * Total funds raised

---

## 📁 Database Collections

### `users`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "donor",
  "status": "active",
  "createdAt": "Date"
}
```

### `bloodRequest`

```json
{
  "blood": "A+",
  "district": "Dhaka",
  "upazila": "Dhanmondi",
  "email": "donor@email.com",
  "createdAt": "Date"
}
```

### `payments`

```json
{
  "amount": 300,
  "currency": "usd",
  "donarEmail": "donor@email.com",
  "transectionId": "pi_xxx",
  "payment_status": "paid",
  "paidAt": "Date"
}
```

---

## 📊 Admin Dashboard – Total Funds Logic

Total funds are calculated using MongoDB aggregation:

* Only `payment_status: 'paid'` records are counted
* `$sum` aggregation on `amount` field

Returned example:

```json
{ "totalFunds": 7500 }
```

---

## 🔒 Security

* Firebase token verification middleware
* Role‑based access control
* Protected admin & volunteer routes
* Server‑side payment verification

---

## ⚙️ Environment Variables

### Frontend (`.env`)

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_STRIPE_PUBLISHABLE_KEY=
```

### Backend (`.env`)

```
PORT=4000
USER=yourMongoUser
PASSWORD=yourMongoPassword
STRIPE_SECRET=yourStripeSecretKey
SITE_DOMAIN=http://localhost:5173
FB_KEY=base64FirebaseAdminKey
```

---

## 🚀 Run Locally

### Backend

```bash
npm install
npm run dev
```

### Frontend

```bash
npm install
npm run dev
```

---

## 🧪 Test Stripe Payments

* Use Stripe test card: `4242 4242 4242 4242`
* Any future expiry date & CVC

---

## 📌 Future Improvements

* Volunteer dashboard UI
* Email notifications
* Donation history per user
* Admin role management panel

---

## 🧑‍💻 Author

**md. al amin**

---

## ❤️ Acknowledgements

* Stripe
* Firebase
* MongoDB
* Open Source Community

---

> This project was built as part of a full‑stack web development learning journey with real‑world payment and role‑based dashboard features.
