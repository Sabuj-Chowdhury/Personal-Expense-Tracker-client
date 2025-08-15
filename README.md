# 📊 Personal Expense Tracker (Frontend)

A responsive and user-friendly personal expense tracker built with **React**, **Tailwind CSS**, and **Recharts**. This application allows users to securely add, view, update, and delete expenses, with full authentication using **JWT tokens** stored in localStorage.

**Frontend Live Link**: [https://personal-expense-tracker-client.vercel.app](https://personal-expense-tracker-client.vercel.app)  
**Backend API**: [https://expense-tracker-backend-gamma-silk.vercel.app](https://expense-tracker-backend-gamma-silk.vercel.app)

---

## 📌 Features

- ✅ **Authentication using JWT** (login/register)
- ✅ **Token stored securely in localStorage**
- ✅ Add new expenses with title, amount, category, and date
- ✅ View expenses in a responsive table layout
- ✅ Edit or delete individual expenses
- ✅ Pie chart of expenses by category using **Recharts**
- ✅ SweetAlert2 confirmation for delete actions
- ✅ Total expense summary display
- ✅ Fully responsive design (mobile-first)
- ✅ Deployed on **Vercel**

---

## 🧱 Tech Stack

| Layer    | Tech                   |
| -------- | ---------------------- |
| Frontend | React, Tailwind CSS    |
| Charts   | Recharts               |
| HTTP     | Axios                  |
| Alerts   | SweetAlert2            |
| Auth     | JWT (via localStorage) |
| Hosting  | Vercel                 |

---

## 📁 Project Structure (Frontend)

```
📦 expense-tracker-client
├── 📁 components/
├── 📁 pages/
│   ├── AddExpense.jsx
│   ├── AllExpenses.jsx
│   ├── UpdateExpense.jsx
│   ├── Statistics.jsx
│   └── ...
├── 📁 hooks/
│   ├── useAuth.js              // Handles token storage and user decoding
│   ├── useAxiosPublic.js       // Sets up Axios with JWT header
├── 📄 App.jsx
├── 📄 main.jsx
├── 📄 tailwind.config.js
├── 📄 index.css
└── 📄 README.md
```

---

## 🔐 Authentication

- JWT tokens are issued from the backend and stored in `localStorage`.
- Auth headers are attached using a utility function:
  ```js
  export const authHeaders = (token) => ({
    headers: { Authorization: `Bearer ${token}` },
  });
  ```
- Custom hooks (`useAuth`) handle user state and token management.
- Protected routes rely on token presence.

---

## 🚀 Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Sabuj-Chowdhury/Personal-Expense-Tracker-client
cd personal-expense-tracker-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment

```env
VITE_API_BASE_URL=https://expense-tracker-backend-gamma-silk.vercel.app
```

Or hardcode the base URL in your Axios config.

### 4. Start the Frontend

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 📊 Statistics Page

> Accessed via `/statistics`

- Displays a **Pie Chart** using **Recharts**
- Aggregates total expenses grouped by category
- Fully responsive and interactive

---

## 📎 Related Repositories

> A separate backend README will include full API and database setup.

**Backend Live API**:  
[https://expense-tracker-backend-gamma-silk.vercel.app](https://expense-tracker-backend-gamma-silk.vercel.app)

---

## ✅ Development Notes

- Uses **JWT-based authentication**
- All protected routes require a valid token
- Axios instances attach token headers globally
- Alert messages handled using **SweetAlert2**
- Responsive layout built with **Tailwind CSS**

---

## ✨ Credits

Built for the **Junior Full Stack Developer Assessment**  
Includes all required features: CRUD, responsive UI, chart visualization, and secure authentication.
