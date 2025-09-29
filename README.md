# Portfolio Backend — (Express + Prisma + PostgreSQL)

> Backend for the Portfolio project. Built with **Express**, **TypeScript**, **Prisma** and **PostgreSQL**. Designed to provide secure JWT-based auth plus CRUD APIs for blogs and projects. This README explains features, installation, PostgreSQL setup, Prisma usage, seeding an admin user, and deployment notes.

## Features (Available)

* JWT-based authentication for the portfolio **owner** (admin) with bcrypt-hashed passwords.
* Seeded admin user (seed script) to enable first-time login.
* Blog management (Owner-only CRUD): create, read, update, delete.
* Public blog read endpoints for listing and single blog pages (for ISR/SSG on frontend).
* Project management (Owner-only CRUD).
* Basic error handling middleware and request validation points (use Zod or Joi recommended).
* CORS enabled for frontend domain.
* Example pagination/filtering for list endpoints (optional, can be extended).

---

## Tech Stack

* **Runtime / language**: Node.js + TypeScript
* **Server**: Express.js
* **ORM**: Prisma
* **Database**: PostgreSQL
* **Auth**: JSON Web Tokens (jsonwebtoken) + bcrypt for hashing
* **Dev tools**: ts-node-dev / nodemon, eslint, prettier

---

## Repository layout (recommended)

```
backend/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── server.ts                 
│   ├── app.ts                  
│   ├── config/
│   ├── modules/             
│   ├── middleware/              
│   └── utils/                    
├── .env
├── package.json
└── README.md
```

---

## Quick start (development)

> These steps assume you have a running PostgreSQL database and `DATABASE_URL` set.

1. Clone the repo

```bash
git clone https://github.com/takbirgazi/l2b5-assignment-7-apis
cd l2b5-assignment-7-apis
```

2. Install dependencies

```bash
npm install
# or
yarn
```

3. Create `.env` from `.env.example` and set values.

4. Generate Prisma client & run migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. Seed the DB (creates admin user)

```bash
npm run seed
```

6. Start dev server

```bash
npm run dev
# Example scripts in package.json:
# "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
```

Your API will be available at `http://localhost:5000`.

---

### Generate Prisma client

```bash
npx prisma generate
```

### Create and run a migration (dev)

```bash
npx prisma migrate dev
```

---

## API Endpoints (examples)

> Base: `http://localhost:5000`

**Auth**

* `POST /api/v1/auth/login` — body `{ email, password }` → returns `{ token }` (JWT)

**Blogs**

* `GET /api/v1/blogs` — list public blogs (supports ?page, ?limit)
* `GET /api/v1/blogs/:slug` — get single blog
* `POST /api/v1/blogs` — create blog (admin only)
* `PUT /api/v1/blogs/:id` — update blog (admin only)
* `DELETE /api/v1/blogs/:id` — delete blog (admin only)

**Projects**

* `GET /api/v1/projects` — list public projects
* `GET /api/v1/projects/:slug` — get single project
* `POST /api/v1/projects` — create project (admin only)
* `PUT /api/v1/projects/:id` — update project (admin only)
* `DELETE /api/v1/projects/:id` — delete project (admin only)