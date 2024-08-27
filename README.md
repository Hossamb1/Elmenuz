# Elmenus app clone

This project is built using the power of MERN (mongoDB, Express.js, React JS, Node.js) with TypeScript, Tailwind CSS for styling, and Auth0 for secure user authentication.

A full-stack web application inspired by the popular food discovery platform, Elmenus. This project allows users to explore and implement their own restaurant within the platform, providing a personalized dining experience.

## Features

- Restaurant Management
- Interactive UI
- Secure Authentication
- Image Upload
- Payments

## Tech Stack

**Client:** React & TypeScript, Vite, Tailwind CSS, Radix UI, React Query, React Hook Form & Zod

**Server:** Node.js & Express, MongoDB & Mongoose, JWT & OAuth2, Multer & Cloudinary

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. \
`MONGO_URI`
```
#Auth0
AUTH0_AUDIENCE
AUTH0_ISSUER_BASE_URL

```
```
#Cloudinary
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```
```
#Stripe
FRONTEND_URL
STRIPE_API_KEY
STRIPE_WEBHOOK_SECRET
```



## Available Scripts

### Install backend dependencies

```bash
cd backend
npm install
```

### Install client dependencies

```bash
cd frontend
npm install
```

In the project directory, you can run:

```bash
cd backend
npm run dev
```

for the backend in the server folder.
on[http://localhost:5000]
Open another terminal in folder, Also make sure mongodb is running in background.

```bash
cd frontend
npm run dev
```

and for the frontend in the client folder.
on[http://localhost:5173]

That's all for this project, A small app achieving all MERN fundamentals.

made by, <br />
_**Hossam Barakat**_
