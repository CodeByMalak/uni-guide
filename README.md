# UniSelection

## Local Development

1. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

The frontend uses `VITE_API_URL=/api`, and Vite proxies `/api` to `http://localhost:5000`.

## Production Environment

Set these variables in your deployment platforms:

- Backend/API: `MONGO_URI`, `JWT_SECRET`
- Frontend on Vercel: `VITE_API_URL=/api`

If you have multiple frontend domains, set backend `FRONTEND_URLS` to a comma-separated list.

## Vercel Deployment

This repo has a root `vercel.json` that deploys both pieces:

- `frontend/` builds the Vite app.
- `backend/server.js` handles every `/api/*` request as a Vercel serverless function.

Use these Vercel project settings:

- Root Directory: project root
- Build/install settings: leave defaults so Vercel reads `vercel.json`

Your link `https://vercel.com/ayubi-s-projects/uni-guide` is the Vercel dashboard URL. The public app URL is usually something like `https://uni-guide.vercel.app`.
