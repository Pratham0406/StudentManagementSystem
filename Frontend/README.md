# Frontend for Student Management

This is a minimal React + Vite frontend that communicates with the provided Spring Boot backend.

Quick start (Windows PowerShell):

1. Install dependencies
   npm install

2. Run dev server
   npm run dev

The dev server runs on http://localhost:3000 and proxies API requests starting with `/api` to http://localhost:8080.

Notes:
- Backend endpoints used:
  - GET /students
  - POST /students (create)
  - POST /{rollNo} (update)
  - DELETE /{rollNo}

- If the backend is not running on port 8080, update `vite.config.js` proxy target or run the backend on 8080.
- The backend currently has no CORS configuration; using the dev proxy avoids CORS issues in development.
