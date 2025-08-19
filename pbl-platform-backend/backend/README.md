# PBL Platform — Backend

Backend for the project-based learning platform (Node.js + Express + MongoDB).

## Quick Start

```bash
cd backend
cp .env.example .env   # fill in values
npm install
npm run dev            # starts on PORT (default 4000)
```

## Routes (prefix: `/api`)

- `POST /auth/signup` — email verification link sent
- `POST /auth/login`
- `POST /auth/verify-email` — body: `{ token }`
- `POST /auth/delete` — GDPR delete self (auth required)
- `POST /projects/create` — entrepreneurs only (100-word checks)
- `POST /projects/approve` — admin only
- `GET  /projects` — list approved/open
- `POST /teams/join` — Level 3 students only
- `GET  /dashboard/:projectId`
- `POST /teams/reassign`
- `GET  /mock-projects/:role/:level`
- `POST /mock-projects/submit`
- `POST /admin/verify-level`
- `GET  /admin/pending-projects`
- `GET  /admin/users`
- `POST /admin/suspend`
- `POST /payments/stripe/webhook` (raw body)
```

Deploy to Heroku: set env vars (MONGODB_URI, JWT_SECRET, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, EMAIL_*).
```

## Testing

```bash
npm test
```
