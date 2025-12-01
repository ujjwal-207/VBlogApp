# 📘 **VBlog – Full Stack Blog Application**

A full-stack blog platform built with **Next.js**, **Node.js**, **Express**, **Prisma**, and **PostgreSQL**.
This project was built for a **Frontend Developer Test**, containing authentication, CRUD operations, protected routes, frontend-only search, Docker support, and clean architecture.

---

# 🚀 **Features**

### 🧑‍💼 Authentication

* Register / Login
* JWT authentication
* Token persistence
* Protected routes
* Logout

### 📝 Blog Management

* Create, Edit, Delete Posts
* List & View Posts

### 🔍 Search (Frontend Only)

* Instant client-side search
* No backend filtering

### ⚙️ Technical Highlights

* Next.js App Router
* Zustand for global state
* Prisma ORM
* TypeScript
* Docker support (frontend + backend + PostgreSQL)
* Clean folder structure

---

# 📂 **Project Structure**

```
VBlogApp/
│── backend/
│   ├── src/
│   ├── prisma/
│   ├── Dockerfile
│   ├── package.json
│
│── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── Dockerfile
│   ├── package.json
│
└── docker-compose.yml
```

---

# 🛠️ **Tech Stack**

### **Frontend**

* Next.js 15
* TailwindCSS
* React Hook Form
* Zustand
* TypeScript
* Docker

### **Backend**

* Node.js + Express
* Prisma ORM
* PostgreSQL
* JWT Authentication
* TypeScript
* Docker

---

# 🗄️ **Local Backend Setup (Without Docker)**

## 1️⃣ Install Dependencies

```bash
cd backend
npm install
```

## 2️⃣ Environment Variables

Create `backend/.env`:

```
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/blogapp?schema=public"
JWT_SECRET="supersecretkey"
PORT=8000
```

## 3️⃣ Create DB

```bash
psql -U postgres -c "CREATE DATABASE blogapp;"
```

## 4️⃣ Migrate Prisma

```bash
npx prisma migrate dev
npx prisma generate
```

## 5️⃣ Start Server

```bash
npm run dev
```

Backend runs at:

```
http://localhost:8000
```

---

# 💻 **Local Frontend Setup (Without Docker)**

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

# 🐳 **Run Entire Project with Docker (Recommended)**

This is the easiest way to run everything.

## ✔ Requirements

* Docker
* Docker Compose

## 1️⃣ Root-level `docker-compose.yml`

Your folder supports:

* frontend
* backend
* database

To run everything:

```bash
docker compose up --build
```

### After build completes:

Frontend → `http://localhost:3000`
Backend → `http://localhost:8000`
Postgres → `localhost:5432`

---

# 🐳 **Backend Dockerfile**

Located at: `backend/Dockerfile`
(Example using Debian-based image to avoid musl issues)

```dockerfile
FROM node:20-bullseye
WORKDIR /app
COPY package*.json ./
RUN apt-get update && apt-get install -y openssl
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8000
CMD ["npm", "start"]
```

---

# 🐳 **Frontend Dockerfile**

Located at: `frontend/Dockerfile`

```dockerfile
FROM node:20-bullseye AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-bullseye AS runner
WORKDIR /app

COPY --from=builder /app ./
EXPOSE 3000

CMD ["npm", "start"]

```

---

# 🔍 **Frontend Search Feature**

* Pure client-side search
* No API calls
* Filters the posts already in memory
* Instant UI response

---

# 🔐 **Authentication Flow**

### **Backend**

* JWT signed using `JWT_SECRET`
* Middleware validates tokens
* Protects CRUD APIs

### **Frontend**

* Token saved in `localStorage` and `cookies`
* Zustand stores user session
* Auto redirect for protected routes

---

# 🧱 **Frontend Folder Structure**

```
frontend/
├── app/
├── components/
├── hooks/
├── lib/
└── middleware.ts
```

---

# ▶️ **How to Run the Project**

## 🚦 **Option 1 — Run everything with Docker (recommended)**

```bash
docker compose up --build
```

## 🖥️ **Option 2 — Run locally (without Docker)**

Terminal 1:

```bash
cd backend
npm run dev
```

Terminal 2:

```bash
cd frontend
npm run dev
```

---

# 🎯 **This Project Includes**

✔ Frontend UI with protected routes
✔ Backend REST API
✔ JWT Authentication
✔ Prisma ORM
✔ Full CRUD
✔ Client-side search
✔ Docker support for easy deployment
✔ Clean code architecture


