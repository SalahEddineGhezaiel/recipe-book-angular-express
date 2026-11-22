# Projet Angular – Recipe Manager

Full-stack recipe management app: an Angular 17 frontend and an Express/MongoDB REST API.

## Structure

- `frontend/` – Angular 17 app
- `backend/` – Express + Mongoose API (recipes and categories)

## Getting started

Requires Node.js and a running MongoDB instance.

### Backend

```bash
cd backend
cp .env.example .env   # then edit MONGODB_URI if needed
npm install
npm run dev            # or: npm start
```

The API runs on `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm install
npm start
```

The app runs on `http://localhost:4200`.

## API

| Resource | Base path |
|----------|-----------|
| Categories | `/api/categories` |
| Recipes | `/api/recettes` |

Each resource supports list, get one, create, update and delete.

A recipe has: `name`, `description`, `difficulty` (`facile` / `moyen` / `difficile`), `category`, `ingredients`.
