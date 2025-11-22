---
# 📘 **VBlog – Full Stack Blog Application**

A full-stack blog platform built with **Next.js**, **Node.js**, **Express**, **Prisma**, and **PostgreSQL**.
This project was built for a **Frontend Developer Test**, with clean architecture, JWT authentication, CRUD functionality, custom hooks, and a simple search feature (frontend-only).

---

# 🚀 **Features**

### 🧑‍💼 Authentication

* Register
* Login
* JWT-based auth
* Persisted token
* Protected routes
* Logout

### 📝 Blog Management

* Create Post
* Edit Post
* Delete Post
* List Posts
* View Posts

### 🔍 Search (Frontend Only)

* Instant search on dashboard
* Filters posts on client side

### ⚙️ Technical Highlights

* Next.js App Router
* Zustand for global state
* Prisma ORM with Postgres
* TypeScript everywhere
* Clean folder structure
* Fully separated backend & frontend

---

# 📂 **Project Structure**

```
VBlogApp/
│── backend/
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── README.md
│
└── frontend/
    ├── app/
    ├── components/
    ├── hooks/
    ├── lib/
    ├── package.json
    └── README.md
```

---

# 🛠️ **Tech Stack**

### **Frontend**

* Next.js 15
* TypeScript
* TailwindCSS
* Zustand (state management)
* React Hook Form
* Client-side search feature

### **Backend**

* Node.js + Express
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT Authentication

---

# 🗄️ **Backend Setup**

## 1️⃣ Install Dependencies

```bash
cd backend
npm install
```

## 2️⃣ Environment Variables

Create an `.env` file inside `backend/`:

```
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/blogapp?schema=public"
JWT_SECRET="supersecretkey"
PORT=8000
```

## 3️⃣ Create PostgreSQL Database

```bash
psql -U postgres -c "CREATE DATABASE blogapp;"
```

## 4️⃣ Prisma Migration

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## 5️⃣ Start Backend

```bash
npm run dev
```

Server runs at:

```
http://localhost:8000
```

---

# 🌐 **Backend API Endpoints**

### **Auth**

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register user |
| POST   | `/api/auth/login`    | Login user    |

### **Posts**

| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| GET    | `/api/posts`     | List posts                 |
| POST   | `/api/posts`     | Create post (JWT required) |
| PUT    | `/api/posts/:id` | Update post (JWT required) |
| DELETE | `/api/posts/:id` | Delete post (JWT required) |

---

# 💻 **Frontend Setup**

## 1️⃣ Install Dependencies

```bash
cd frontend
npm install
```

## 2️⃣ Run Frontend

```bash
npm run dev
```

The app runs at:

```
http://localhost:3000
```

---

# 🔍 **Search Feature (Frontend Only)**

The dashboard includes a search bar:

* Filters posts **without hitting backend**
* Works only with the list already fetched
* Instant results
* No debounce required for this assignment

---

# 🧠 **Frontend Auth + Protection**

* JWT stored in `localStorage`
* Zustand manages auth state
* Auth hook: `useAuth`
* Protected pages:

  * `/dashboard`
  * `/posts/create`
  * `/posts/edit/:id`

---

# 🔐 **Token Validation Flow**

### Backend:

* `authMiddleware` verifies `Authorization: Bearer <token>`
* Rejects 401 if token missing/invalid

### Frontend:

* Automatically attaches token in API requests
* `useAuth.checkAuth()` restores user session
* Protected routes redirect if no token

---

# 🧱 **Frontend Folder Structure**

```
frontend/
├── app/
│   ├── page.tsx
│   ├── register/page.tsx
│   ├── dashboard/page.tsx
│   ├── posts/create/page.tsx
│   └── posts/edit/[id]/page.tsx
│
├── components/
│   └── Navbar.tsx
│
├── hooks/
│   ├── useAuth.ts
│   └── usePosts.ts
│
├── lib/
│   └── api.ts
│
└── middleware.ts
```

---

# ▶️ **Running the Entire Project**

Open **two terminals**:

### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

---

# ❗ Common Errors & Fixes

### ❌ Prisma client cannot read properties `__internal`

**Fix:**
Use Prisma 5.x instead of Prisma 7.x

```bash
npm uninstall prisma @prisma/client
npm install prisma@5 @prisma/client@5
```

### ❌ Token not sent with requests

Check:

* `localStorage.setItem("token", token)` or `Cookies.set("token",token)`
* API client includes Authorization header

### ❌ Cannot access dashboard

Check token:

```bash
localStorage.getItem("token") or `Cookies.set("token",token)`
```

---

# 🎉 **Project is Ready**

You now have:

✔ Full-stack blog app
✔ CRUD operations
✔ JWT authentication
✔ Protected routes
✔ Search functionality
✔ Clean code
✔ Deploy-ready architecture

---


