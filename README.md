# 🚀Node Vercel CI-CD 
 
A **Node.js + Express REST API** with full **CRUD operations** on MongoDB Atlas, automated with a **CI/CD Pipeline** using **GitHub Actions** and deployed to **Vercel**.

---

## 📋 Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment](#deployment)

---

## 📖 About

This project is a **Users Management REST API** built with Node.js and Express. It supports full CRUD operations — Create, Read, Update, and Delete users — with data stored in **MongoDB Atlas**.

The project includes a complete **CI/CD pipeline** using **GitHub Actions**. On every push to the `main` branch, the pipeline automatically installs dependencies, runs tests, and deploys the latest code to **Vercel** — fully automated, no manual steps needed.

---

## 🛠️ Tech Stack

| Technology | Version | Usage |
|---|---|---|
| **Node.js** | 20.x | Runtime Environment |
| **Express.js** | 5.x | Web Framework |
| **MongoDB Atlas** | Latest | Cloud Database |
| **Mongoose** | 9.x | MongoDB ODM |
| **dotenv** | 17.x | Environment Variables |
| **Nodemon** | 3.x | Development Server |
| **GitHub Actions** | — | CI/CD Pipeline |
| **Vercel** | — | Cloud Deployment |

---

## 📁 Project Structure

```
CI-CD-Demo/
├── .github/
│   └── workflows/
│       └── ci-cd.yml        # GitHub Actions CI/CD Pipeline
├── model/
│   └── userSchema.js        # Mongoose User Schema
├── app.js                   # Main Server + All API Routes
├── .env                     # Environment Variables (not committed)
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v20+
- MongoDB Atlas Account
- Git

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/AhmedDevx07/CI-CD-Demo.git
cd CI-CD-Demo
```

**2. Install dependencies**
```bash
npm install
```

**3. Setup environment variables**
```bash
# .env file banao aur apni MongoDB URI daalo
MONGODB_URI=your_mongodb_connection_string
```

**4. Run the server**
```bash
# Development (nodemon)
npm run dev

# Production
npm start
```

Server will start at: `http://localhost:3000`

---

## 🔐 Environment Variables

`.env` file mein yeh variable add karo:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
```

> ⚠️ `.env` file kabhi GitHub pe push mat karo — `.gitignore` mein already add karo.

---

## 📡 API Endpoints

Base URL: `http://localhost:3000`

### User Routes

| Method | Endpoint | Description | Body Required |
|---|---|---|---|
| `POST` | `/adduser` | Naya user add karo | `name, email, age, profession` |
| `GET` | `/alluser` | Sare users lo | — |
| `GET` | `/user/:id` | Single user lo by ID | — |
| `PUT` | `/user/:id` | User update karo | Any user field |
| `DELETE` | `/user/:id` | User delete karo | — |

### Request Body Example — POST `/adduser`

```json
{
  "name": "Ahmed",
  "email": "ahmed@example.com",
  "age": 22,
  "profession": "Full Stack Developer"
}
```

### Success Response Example

```json
{
  "status": true,
  "message": "user add ho gaye",
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Ahmed",
    "email": "ahmed@example.com",
    "age": 22,
    "profession": "Full Stack Developer",
    "isActive": true
  }
}
```

### Error Response Example

```json
{
  "status": false,
  "message": "error description here"
}
```

---

## 👤 User Schema

```javascript
{
  name:       String  // required
  email:      String  // required, unique
  age:        Number  // required
  profession: String  // required
  isActive:   Boolean // default: true
}
```

---

## ⚙️ CI/CD Pipeline

### Pipeline Flow

```
Push to main branch
        ↓
┌──────────────────────┐
│    Build & Test      │
│  ✔ Checkout code     │
│  ✔ Setup Node.js 20  │
│  ✔ npm install       │
│  ✔ npm test          │
└──────────────────────┘
        ↓
┌──────────────────────┐
│   Deploy to Vercel   │
│  ✔ Checkout code     │
│  ✔ Install Vercel CLI│
│  ✔ vercel --prod     │
└──────────────────────┘
        ↓
   Live on Vercel ✅
```

### GitHub Secrets Setup

`GitHub Repo → Settings → Secrets and Variables → Actions` mein yeh secrets add karo:

| Secret Name | Description | Kahan Se Milega |
|---|---|---|
| `MONGODB_URI` | MongoDB connection string | MongoDB Atlas |
| `VERCEL_TOKEN` | Vercel API Token | vercel.com → Settings → Tokens |
| `VERCEL_ORG_ID` | Vercel Team ID | vercel.com → Settings → General |
| `VERCEL_PROJECT_ID` | Vercel Project ID | vercel.com → Project → Settings |

### CI/CD Workflow (`ci-cd.yml`)

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    name: Build & Test
    runs-on: ubuntu-latest
    env:
      MONGODB_URI: ${{ secrets.MONGODB_URI }}
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install Dependencies
        run: npm install
      - name: Run Tests
        run: npm test --if-present

  deploy:
    name: Deploy to Vercel
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
      - name: Install Vercel CLI
        run: npm install -g vercel
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }} --yes
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 🌐 Deployment

App is live on **Vercel** — auto-deployed on every push to `main`.

```bash
# Koi bhi change karo aur push karo
git add .
git commit -m "your changes"
git push origin main

# GitHub Actions automatic:
# ✅ Build & Test karega (~8s)
# ✅ Vercel pe deploy karega (~32s)
# ✅ Total ~40 seconds mein live!
```

---

## 📦 NPM Scripts

```bash
npm start      # Production server (node app.js)
npm run dev    # Development server (nodemon app.js)
npm test       # Tests run karo
```

---

## 👨‍💻 Author

**Ahmed** — [@AhmedDevx07](https://github.com/AhmedDevx07)

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).

---

<p align="center">Made with ❤️ by AhmedDevx07</p>
