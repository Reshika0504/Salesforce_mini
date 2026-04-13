# Mini Salesforce CRM

A multi-tenant SaaS CRM starter modeled after a simplified Salesforce-style system. Multiple companies share the same platform, while tenant data remains isolated through `tenantId` scoping in MongoDB queries and JWT claims.

## Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT + Role-Based Access Control

## Features

- Tenant registration and tenant-scoped login
- Role-aware workspace for `admin`, `manager`, and `employee`
- REST APIs for leads, contacts, deals
- Audit log tracking for CRM mutations
- Pagination-ready list APIs and MongoDB indexes for tenant queries

## Run Locally

1. Copy `backend/.env.example` to `backend/.env`
2. Copy `frontend/.env.example` to `frontend/.env`
3. Install all dependencies from the project root:
   - `npm install`
   - `npm run install:all`
4. Seed demo data:
   - `npm run seed`
5. Start backend and frontend together:
   - `npm run dev`

## Demo Users

- Tenant slug: `acme`
- Admin: `admin@acme.com` / `password123`
- Manager: `manager@acme.com` / `password123`
- Employee: `employee@acme.com` / `password123`

## Deploy On Render

This repo includes a root-level `render.yaml` for deploying both services with a Render Blueprint:

- `salesforce-mini-backend` as a Node web service
- `salesforce-mini-frontend` as a static site

### Before deploy

1. Push this project to GitHub/GitLab.
2. Create a MongoDB database that Render can reach.
   - This app uses MongoDB, so the simplest option is MongoDB Atlas.
3. Seed your database once using the backend seed script:
   - `npm install`
   - `npm run install:all`
   - `npm run seed`

### Render setup

1. In Render, click `New +` -> `Blueprint`.
2. Connect the repository.
3. Render will detect `render.yaml` and create both services.
4. Set these required environment variables before the first successful deploy:
   - Backend `MONGODB_URI`: your MongoDB connection string
   - Backend `CLIENT_ORIGIN`: your frontend Render URL, for example `https://your-frontend-name.onrender.com`
   - Frontend `VITE_API_BASE_URL`: your backend API URL, for example `https://your-backend-name.onrender.com/api`
5. Deploy the Blueprint.

### Notes

- Backend health check path is `/api/health`.
- The frontend uses a rewrite rule to `/index.html` so React Router works on refresh.
- Render sets `PORT` automatically for the backend, and the server already respects it.
