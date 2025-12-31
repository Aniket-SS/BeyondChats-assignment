# BeyondChats Assignment – Full Stack Content Automation System

## 📌 Project Overview

This project is a full-stack application built as part of the **BeyondChats Assignment**.  
It demonstrates a complete pipeline for:

- Scraping blog articles from the BeyondChats website
- Storing them in a MongoDB database
- Exposing CRUD APIs using Express.js
- Running an automation pipeline to enhance articles
- Displaying articles using a React frontend

The system is designed with **real-world backend architecture**, scalability, and automation readiness in mind.

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- Axios
- Cheerio

### Automation Script
- Node.js
- Axios
- Cheerio
- Modular automation design (LLM-ready)

### Frontend
- React (Vite)
- Axios
- Plain CSS

---

## ⚙️ Features Implemented

### ✅ Phase-1: Backend & Scraping
- Scrapes the **5 oldest BeyondChats blog articles**
- Handles pagination dynamically
- Stores articles in MongoDB
- Prevents duplicate entries
- REST APIs for full CRUD operations

### ✅ Phase-2: Automation Pipeline
- Fetches articles via backend APIs
- Fetches external reference articles
- Enhances article content using a **mock automation module**
- Updates enhanced content back into MongoDB
- Designed as **one-run-only automation** to prevent repeated processing

### ✅ Frontend
- Displays list of articles
- Click to view article details
- Shows original and enhanced content
- Clean and minimal UI

---

## 🤖 Note on LLM Integration

The automation pipeline is **designed to support LLM-based content enhancement**.

Due to billing constraints during development, a **mock enhancement module** was used to demonstrate the complete automation workflow.

The system can seamlessly integrate OpenAI or similar LLM APIs by replacing the mock module without changing the overall architecture.

---

## 🚀 How to Run the Project Locally

### 1️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev

Backend runs on:

http://localhost:5000

2️⃣ Automation Script

cd automation-script
node index.js

This will enhance articles using the mock automation module.

3️⃣ Frontend Setup

cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173


🧑‍💻 Author

Aniket Sonawane
Full-Stack Developer
BeyondChats Assignment Submission