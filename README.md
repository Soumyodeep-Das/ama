
---

# 🗨️ AMA — Ask Me Anything

A minimalist social-media-style app where users can ask anonymous questions and the admin can respond. Built using the **MERN stack** with a modern UI powered by **Vite + React + TailwindCSS**.

---

## 🚀 Tech Stack

- **Frontend**: React (Vite) + TailwindCSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (with Mongoose)

---

## 🔗 Live Links

- 🔹 **Frontend (Vercel)**: [https://ama.soumyodeep.tech](https://ama.soumyodeep.tech)
- 🔹 **Backend API (Render)**: [https://ama-backend-x7tk.onrender.com/api](https://ama-backend-x7tk.onrender.com/api)

---

## 🧠 API Overview


### 📌 API Endpoints

#### `GET /questions`
> Fetch all submitted questions.

- **Method**: `GET`
- **Response**:
```json
[
  {
    "_id": "123...",
    "question": "What inspired you to build this?",
    "answer": "To learn and apply the MERN stack!",
    "createdAt": "2025-06-19T12:00:00Z"
  }
]
````

---

#### `POST /questions`

> Submit a new anonymous question.

* **Method**: `POST`
* **Body**:

```json
{
  "question": "What is your favorite tech stack?"
}
```

* **Response**:

```json
{
  "message": "Question created",
  "question": { "_id": "abc123", "question": "...", "answer": null }
}
```

---

#### `PUT /questions/:id/answer`

> Add or update an answer to a specific question.

* **Method**: `PUT`
* **Body**:

```json
{
  "answer": "Definitely MERN + Tailwind!"
}
```

* **Response**:

```json
{
  "message": "Answer updated",
  "question": { "_id": "...", "question": "...", "answer": "..." }
}
```

---

#### `DELETE /questions/:id`

> Delete a question by ID.

* **Method**: `DELETE`
* **Response**:

```json
{ "message": "Question deleted" }
```

---

#### `GET /stats`

> Get a summary of total, answered, and unanswered questions.

* **Method**: `GET`
* **Response**:

```json
{
  "total": 10,
  "answered": 4,
  "unanswered": 6
}
```

---

## 🛠️ Database Integration

* **MongoDB** is used as the database, integrated via **Mongoose**.
* Each question is stored as a document with fields:
  `question`, `answer`, `createdAt`.

**MongoDB Atlas / Local Mongo URI** stored in `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/ama
```

---

## 🧑‍💻 Run Locally

### 📦 Backend (Express + MongoDB)

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Add your Mongo URI to .env
touch .env
# Inside .env:
# MONGODB_URI=your_mongo_connection_string

# Run the server
npm run dev
```

The backend will run on:
📍 `http://localhost:5000`

---

### 💻 Frontend (React + Vite + TailwindCSS)

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Add the backend API URL to .env
touch .env
# Inside .env:
# VITE_API_URL=http://localhost:5000/api

# Start the dev server
npm run dev
```

The frontend will run on:
📍 `http://localhost:5173`

---

## 📬 Interacting With the API

You can interact using:

* ✅ Frontend UI (fully functional)
* ✅ Postman (manually test each route)
* ✅ `curl` (e.g.):

```bash
curl http://localhost:5000/api/questions
```

---

## 📂 Project Structure

```
backend/
│  server.js
│  routes/
│  models/
│  controllers/
│  .env
│  package.json

frontend/
│  src/
│    components/
│    pages/
│  .env
│  index.html
│  vite.config.js
```

---
