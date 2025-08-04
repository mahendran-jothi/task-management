# 🧪 Project Setup Instructions

This is a full-stack project containing:

- **Backend**: [Node.js]
- **Frontend**: [React.js]

---

## 📁 Project Structure

```
/project-root
  ├── /backend       ← Node.js backend
  └── /frontend      ← React.js frontend
```

---

## 🔧 Backend Setup (Node.js)

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configuration is handled using TypeScript config files:

   - **MongoDB URI** is set in `config/config.json`:

   - **Server Port** is set in `.env`:

4. Run the backend server in development mode:

   ```bash
   npm run dev
   ```

   The API will be available at: `http://localhost:3000`

---

## 💻 Frontend Setup (React.js)

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory and add the backend URL:

   ```env
   API_URL=http://localhost:3000
   ```

4. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend will be running at: `http://localhost:5173`

---

## ✅ Local URLs

| Service  | URL                   |
| -------- | --------------------- |
| Backend  | http://localhost:3000 |
| Frontend | http://localhost:5173 |

---
