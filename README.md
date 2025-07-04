# Second Brain

🛜 **Live Project:** [https://second-brain-omega-five.vercel.app](https://second-brain-omega-five.vercel.app)

A full-stack web application to organize, store, and share your digital content (YouTube, Twitter, Documents, GitHub links, and notes) in one place. Built with React, TypeScript, Vite, TailwindCSS (Client), and Node.js, Express, MongoDB, and TypeScript (Server).

---

## Table of Contents
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Vercel Deployment](#vercel-deployment)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
- [Tech Stack](#tech-stack)

---

## Features
- User authentication (signup/signin)
- Add, view, and delete content cards (YouTube, Twitter, Document, GitHub, Notes)
- Filter and search content by type or title
- Share your collection via a unique link
- Responsive, modern UI with TailwindCSS
- Persistent storage with MongoDB

---

## Folder Structure
```
Second brain/
├── Client/           # Frontend React app
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # App pages (Dashboard, Signin, Signup, Share, etc.)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── icons/        # SVG icon components
│   │   └── assets/       # Images, videos
│   ├── public/           # Static files
│   ├── package.json      # Client dependencies & scripts
│   └── ...
├── Server/           # Backend Express API
│   ├── src/
│   │   ├── db.ts         # Mongoose models
│   │   ├── index.ts      # Main server & API endpoints
│   │   ├── middleware.ts # Auth middleware
│   │   ├── config.ts     # Env config
│   │   └── utils.ts      # Utility functions
│   ├── package.json      # Server dependencies & scripts
│   └── ...
```

---

## Setup & Installation (Local Development)

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### 1. Clone the repository
```bash
git clone <repo-url>
cd "Second brain"
```

### 2. Setup Environment Variables (Local)
Create a `.env` file in `Server/` with:
```
MONGO_URL=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```
Create a `.env` file in `Client/` with:
```
VITE_BACKEND_URL=http://localhost:3000
```

### 3. Install Dependencies
```bash
cd Client && npm install
cd ../Server && npm install
```

### 4. Run the Application
#### Start the backend server:
```bash
cd Server
npm run dev
```
#### Start the frontend client:
```bash
cd Client
npm run dev
```
- Client: [http://localhost:5173](http://localhost:5173)
- Server: [http://localhost:3000](http://localhost:3000)

---

## Environment Variables
- **Server/.env** (for local dev)
  - `MONGO_URL` - MongoDB connection string
  - `JWT_SECRET` - Secret for JWT authentication
- **Client/.env** (for local dev)
  - `VITE_BACKEND_URL` - Backend API URL (default: `http://localhost:3000`)
- **Vercel (Production)**
  - Set environment variables in the Vercel dashboard for both frontend and backend projects:
    - **Backend:**
      - `MONGO_URL` - MongoDB connection string
      - `JWT_SECRET` - Secret for JWT authentication
    - **Frontend:**
      - `VITE_BACKEND_URL` - Backend API URL (e.g., `https://second-brain-backend-<your-vercel-suffix>.vercel.app`)

---

## Vercel Deployment

1. **Push your code to GitHub.**
2. **Import both `Client` and `Server` as separate projects in Vercel** (or use monorepo settings).
3. **Set environment variables** in the Vercel dashboard for each project as described above.
4. **Deploy!**
5. **Access your live frontend and backend URLs from Vercel.**

---

## Scripts
### Client
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code

### Server
- `npm run dev` - Build and start server
- `npm run build` - Compile TypeScript
- `npm run start` - Run compiled server

---

## API Endpoints (Server)

### Auth
- `POST /api/v1/signup` — Register a new user
- `POST /api/v1/signin` — Login and receive JWT

### Content
- `POST /api/v1/content` — Add new content (auth required)
- `GET /api/v1/content` — Get all user content (auth required)
- `DELETE /api/v1/content` — Delete content by ID (auth required)

### Sharing
- `POST /api/v1/brain/share` — Enable/disable sharing, returns a share link (auth required)
- `GET /api/v1/brain/:sharelink` — Get shared content by link

---

## Tech Stack
- **Frontend:** React, TypeScript, Vite, TailwindCSS, React Router
- **Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose, Zod, JWT

---

<div align="center">
  <b>Made with ❤️ by Aryan</b>
</div>
