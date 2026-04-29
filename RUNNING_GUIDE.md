# 🚀 RUNNING THE COMPLETE APPLICATION

## Prerequisites
- ✅ Node.js installed
- ✅ MongoDB running locally (MongoDB Compass)
- ✅ Backend dependencies installed (`npm install` in backend)
- ✅ Frontend dependencies installed (`npm install` in frontend)

---

## STEP 1: Start Backend Server

Open Terminal 1:

```bash
cd backend
npm run dev
```

Expected output:
```
Server running on port 3000
MongoDB connected
```

✅ Backend is running on `http://localhost:3000`

---

## STEP 2: Start Frontend (Angular)

Open Terminal 2:

```bash
cd frontend
ng serve --open
```

Or without auto-open:
```bash
ng serve
```

Then open your browser to: `http://localhost:4200`

Expected output:
```
✔ Compiled successfully.
✔ Application bundle generated successfully in 5.2s.
```

✅ Frontend is running on `http://localhost:4200`

---

## STEP 3: Test the Application

### 3.1 Create First Category (Backend)

Open Terminal 3 or use Postman:

```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Desserts\"}"
```

Response:
```json
{
  "_id": "665a1b2c...",
  "name": "Desserts",
  "createdAt": "2026-04-29T..."
}
```

**Copy the `_id` - you'll need it!**

---

### 3.2 Create Another Category

```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Plats Principaux\"}"
```

---

### 3.3 Test Frontend - Create Recipe

1. Open `http://localhost:4200` in your browser
2. Click **"+ Ajouter une recette"**
3. Fill in the form:
   - **Nom**: "Pâtes Carbonara"
   - **Description**: "Délicieuses pâtes avec œufs et bacon"
   - **Catégorie**: Select "Desserts" or "Plats Principaux"
   - **Difficulté**: "facile"
   - **Ingrédients**: "Pâtes, Œufs, Bacon, Parmesan" (separated by commas)
4. Click **"Enregistrer"**

✅ You should be redirected to home and see your recipe in the list!

---

### 3.4 Test Frontend Features

**View Recipe Details:**
- Click **"Voir"** on any recipe
- See full details, ingredients, category

**Edit Recipe:**
- Click **"Modifier"** on any recipe
- Update any field
- Click **"Enregistrer"**

**Delete Recipe:**
- Click **"Supprimer"** on any recipe
- Confirm deletion

**Create Another Recipe:**
- Click **"+ Ajouter une recette"** again
- Create recipe with different category/difficulty

---

## STEP 4: Verify in MongoDB Compass

1. Open MongoDB Compass
2. Look for database: **`recettes_db`**
3. You should see:
   - **collections/categories** - with your categories
   - **collections/recettes** - with your recipes

✅ Everything is synchronized!

---

## Troubleshooting

### Frontend shows "Aucune recette trouvée"
- ✅ Normal - no recipes created yet
- Create a recipe using the form

### "Cannot GET /api/recettes"
- ❌ Backend is not running
- Make sure `npm run dev` is running in Terminal 1

### CORS Error
- ✅ Already handled - backend has CORS enabled
- If error persists, check backend logs

### "MongoDB connected" doesn't appear
- ❌ MongoDB is not running
- Open MongoDB Compass to start MongoDB

---

## Testing Workflow

1. ✅ Backend running (`npm run dev`)
2. ✅ Frontend running (`ng serve`)
3. ✅ Create 2-3 categories via curl or Postman
4. ✅ Create recipes via Angular form
5. ✅ Edit and delete recipes
6. ✅ View details
7. ✅ Check MongoDB Compass

---

## Quick Summary

| Component | URL | Command |
|-----------|-----|---------|
| **Backend API** | `http://localhost:3000` | `npm run dev` |
| **Frontend** | `http://localhost:4200` | `ng serve` |
| **MongoDB** | Local | MongoDB Compass |

---

## Next Steps

- STEP 8: Add Search & Filter functionality
- Then: Full project is complete! 🎉
