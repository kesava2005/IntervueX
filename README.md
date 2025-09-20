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

# Clone the repo
git clone https://github.com/your-username/InterveuX.git
cd InterveuX

# Setup backend
cd Backend
npm install
npm start

# Setup frontend
cd ../Frontend
npm install
npm run dev

# Create .env in Backend
MONGO_URI=your_mongo_connection_string
PORT=5000
GEMINI_API_KEY=your_gemini_key
JWT_SECRET=your_secret_key

# Create .env in Frontend
VITE_API_URL=http://localhost:5000
