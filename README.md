# UniSelection

## Local Development

Run both apps from the repo root:

```bash
npm run dev
```

Or run them separately:

```bash
cd backend
npm run dev
```

```bash
cd frontend
npm run dev:only
```

The frontend uses `VITE_API_URL=/api`, and Vite proxies `/api` to the local backend at `http://localhost:5000`.

## Vercel Deployment

This repo is configured to deploy the frontend and backend in one Vercel project:

- `frontend/` builds the Vite app.
- `backend/server.js` handles every `/api/*` request.
- `vercel.json` at the repo root connects both pieces.

Important Vercel setting:

- Root Directory: leave empty / project root

Do not set Root Directory to `frontend`, because then Vercel ignores the backend and only deploys the frontend.

In Vercel Environment Variables, add:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_random_secret
NODE_ENV=production
VITE_API_URL=/api
```

After changing environment variables, redeploy the Vercel project.

Test the backend after deployment:

```txt
https://your-vercel-app.vercel.app/api/health
```

It should return JSON with `"database":"connected"`.
