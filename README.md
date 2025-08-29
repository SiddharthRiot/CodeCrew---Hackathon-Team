
# CodeCrew (Full-Stack)

This is a CodeCrew-like full-stack app using **Next.js (frontend)** and **Node.js/Express + MongoDB (backend)**.

## Quick Start

### Backend
```bash
cd backend
cp .env.example .env
# edit .env with your Mongo URI + JWT secret
npm install
npm run dev
# API on http://localhost:4000
# seed sample hackathons:
curl -X POST http://localhost:4000/api/hackathons/dev/seed
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# open http://localhost:3000
```

## Features
- Auth (signup/login) with JWT
- Dashboard showing teams
- Hackathon listings with seeding
- Team creation and join
- Partner finder with "looking for team" toggle

## Notes
- Change UI, copy components and styles to match your reference repo.
- Secure JWT and CORS for production.
- Add validations & rate limits for real deployments.
