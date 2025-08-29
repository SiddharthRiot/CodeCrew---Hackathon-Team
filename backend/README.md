
# Hackmate Backend

Express + MongoDB + JWT backend for Hackmate-style app.

## Setup
1. `cp .env.example .env` and fill values.
2. `npm install`
3. Run MongoDB locally or use Atlas.
4. Dev: `npm run dev` (http://localhost:4000)

## Routes
- `POST /api/auth/signup` {name,email,password,skills[]}
- `POST /api/auth/login` {email,password}
- `GET  /api/hackathons`
- `POST /api/hackathons` (auth)
- `POST /api/hackathons/dev/seed` seed sample data
- `GET  /api/teams`
- `POST /api/teams` (auth) {name,hackathonId?,skillsNeeded[],bio}
- `POST /api/teams/join` (auth) {teamId}
- `GET  /api/partners?skill=React`
- `POST /api/partners/toggle` (auth)

Auth header: `Authorization: Bearer <token>`
