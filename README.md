# 🤖 InterveuX – AI-Powered Interview Preparation Platform

🚀 **InterveuX** is a full-stack web application that helps candidates practice for technical interviews.  
It provides curated questions, AI-powered answers, and a modern UI to make interview prep **interactive and effective**.

---

## ✨ Features

- 🔐 **User Authentication** – Secure login & session handling  
- 📚 **Course Management** – Role & skill-based interview courses  
- ❓ **Question Bank** – Curated Q&A tailored to user’s experience  
- ⚡ **AI Assistant (Gemini)** – Ask follow-up questions and get instant AI-generated insights  
- 📊 **Dynamic Drawer UI** – AI answers displayed in a sleek side drawer with Markdown formatting  
- 🎨 **Modern UI/UX** – Built with React + Tailwind CSS + ShadCN for a clean, responsive experience  
- 🌐 **REST APIs** – Backend built with Node.js/Express.js and connected to MongoDB  

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React.js  
- 🎨 Tailwind CSS  
- 📦 Vite  

### Backend
- 🟢 Node.js & Express.js  
- 🗄️ MongoDB (Mongoose ORM)  

### AI Integration
- 🤖 Google Gemini API for intelligent Q&A  

---

## 📂 Project Structure

InterveuX/
├── Backend/ # Node.js + Express API
│ ├── routes/ # API routes
│ ├── models/ # MongoDB schemas
│ └── server.js # Backend entry
│
├── Frontend/ # React + Vite frontend
│ ├── src/components/ # UI components
│ ├── src/pages/ # Page components
│ └── src/App.jsx # App entry
│
└── README.md # Documentation

yaml
Copy code

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/InterveuX.git
cd InterveuX
### 2. Backend setup
bash
Copy code
cd Backend
npm install
npm start
### 3. Frontend setup
bash
Copy code
cd ../Frontend
npm install
npm run dev
🔑 Environment Variables
Create a .env file in both Backend and Frontend folders with:

env
Copy code
# Backend
MONGO_URI=your_mongo_connection_string
PORT=5000
GEMINI_API_KEY=your_gemini_key
JWT_SECRET=your_secret_key

# Frontend (Vite)
VITE_API_URL=http://localhost:5000
