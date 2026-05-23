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

- Backend: `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL`
- Frontend on Vercel: `VITE_API_URL=https://your-backend-domain.com/api`

If you have multiple frontend domains, set backend `FRONTEND_URLS` to a comma-separated list.

## Vercel Frontend

Use these Vercel project settings:

- Root Directory: `frontend`
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

Your link `https://vercel.com/ayubi-s-projects/uni-guide` is the Vercel dashboard URL. Use the public deployment URL for backend CORS, usually something like `https://uni-guide.vercel.app`.

Set the backend environment:

```bash
FRONTEND_URL=https://uni-guide.vercel.app
```
