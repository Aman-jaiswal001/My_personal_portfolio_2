# Aman Jaiswal Portfolio

Personal portfolio website for Aman Jaiswal, built as a full-stack MERN application. The site presents projects, skills, education, achievements, and a contact form, with an admin API for managing portfolio content.

## Tech stack

- React 19 and Vite
- Express.js and Node.js
- MongoDB with Mongoose
- Axios for client-side API requests
- ImageKit and Multer for image uploads

## Project structure

```text
.
├── client/        React/Vite frontend
│   ├── public/     Images, certificates, and resume files
│   └── src/        Components, API helpers, and styles
├── server/        Express backend
│   └── src/        Routes, controllers, models, and configuration
└── README.md
```

## Requirements

- Node.js 18 or newer
- npm
- MongoDB database

## Getting started

Install dependencies in both applications:

```bash
cd client
npm install

cd ../server
npm install
```

Create `server/.env` with the values required by the backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Create `client/.env` for the API URL used by the frontend:

```env
VITE_BASEURL=http://localhost:5000/api
VITE_API_ORIGIN=http://localhost:5000
```

Start the backend in one terminal:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

Open the local Vite URL shown in the terminal, usually `http://localhost:5173`.

## Available scripts

### Client

- `npm run dev` — start the Vite development server
- `npm run build` — create a production build in `client/dist`
- `npm run preview` — preview the production build locally

### Server

- `npm run dev` — start the API with Nodemon
- `npm start` — start the API with Node.js

## API overview

- `GET /api/health` — health check
- `GET /api/projects` — list portfolio projects
- `GET /api/achievements` — list achievements
- `POST /api/contact` — submit a contact message
- `/api/admin/*` — admin login, content management, and contact message access

Do not commit real environment files or API credentials. Use local `.env` files for development and configure secrets through the hosting provider in production.
