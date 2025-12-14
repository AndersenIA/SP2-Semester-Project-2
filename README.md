# The Auction House 🏷️

Semester Project 2 – Front-End Development  
Noroff School of Technology and Digital Media

## 📌 Project Overview

**The Auction House** is a front-end web application for an online auction platform.  
Users can browse active auctions, search and filter listings, place bids, and manage their own profile and listings.

The project is built with **vanilla JavaScript**, **Vite**, and **Tailwind CSS**, and integrates with the **Noroff Auction API**.

---

## ✨ Features

- View all active auction listings
- Search listings by title and description
- Filter listings by tags
- View individual auction details
- User authentication (login & signup)
- User profile page
  - View own listings
  - Edit profile
  - Create new listings
- Conditional UI based on authentication state
- Responsive design

---

## 🔐 Authentication Requirements

⚠️ **Important**

To log in or sign up, you must use a **valid Noroff student email**:

@stud.noroff.no

Accounts using other email domains will not work with the API.

---

## 🛠️ Tech Stack

- **JavaScript (ES Modules)**
- **Vite**
- **Tailwind CSS**
- **Noroff Auction API**

---

## 📂 Project Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/AndersenIA/SP2-Semester-Project-2
cd <project-folder>
```

### 2️⃣ Install dependencies

⚠️ node_modules is NOT included in the repository

You must install it manually:

```bash
npm install
```

### 3️⃣ Environment / API Configuration

This project uses **environment variables** for API configuration.

Create a `.env` file in the root directory:

```bash
VITE_API=https://v2.api.noroff.dev
VITE_API_KEY=YOUR_NOROFF_API_KEY
```

The `.env` file is excluded from version control for security reasons.

For production (Netlify), these variables are set in the Netlify dashboard.

### 4️⃣ Run the project locally

```bash
npm run dev
```

Vite will start the development server, usually at:

```bash
http://localhost:5173
```

## 🌍 Deployment

The project is deployed using **Netlify**.

Environment variables are configured in the Netlify dashboard under:

Site Settings → Environment Variables

No secrets are stored in the repository.

## 🚀 How to Use the App

- Browse auctions on the homepage

- Use Search or Filter by tag

- Click a listing to view details

- Log in using a @stud.noroff.no email to:

  - Place bids

  - Create listings

  - Edit your profile

  - Visit your profile page to manage your listings

## ⚠️ Known Limitations

- Deposit functionality is not implemented yet

- Bidding logic relies fully on the Noroff API

- No backend or database beyond the provided API

## 📌 Notes for Reviewers

- node_modules is intentionally excluded

- All functionality is written in vanilla JavaScript (no frameworks)

- Authentication and authorization are handled via the Noroff API

- The project follows modular ES6 architecture

## 📄 License

This project is for educational purposes only.

## <p align="center">👤 Author </p>

<p align="center">
  <strong>Anders</strong><br>
  Front-End Development Student<br>
  Noroff School of Technology and Digital Media
</p>
