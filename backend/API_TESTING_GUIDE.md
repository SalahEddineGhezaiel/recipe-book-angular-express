# API Testing Guide

## Base URL
```
http://localhost:3000
```

## STEP 1: Start Backend Server

```bash
cd backend
npm install
npm run dev
```

Expected output:
```
Server running on port 3000
MongoDB connected
```

---

## STEP 2: Test Categories

### 1. Create a Category (POST)
```
POST /api/categories
Body:
{
  "name": "Desserts"
}

Response (201):
{
  "_id": "xyz123...",
  "name": "Desserts",
  "createdAt": "2026-04-29T..."
}
```

### 2. Create Another Category
```
POST /api/categories
Body:
{
  "name": "Plats Principaux"
}
```
**Note:** Copy the `_id` returned—you'll need it for recipes!

### 3. Get All Categories (GET)
```
GET /api/categories

Response:
[
  { "_id": "xyz123...", "name": "Desserts", ... },
  { "_id": "abc456...", "name": "Plats Principaux", ... }
]
```

### 4. Get One Category (GET)
```
GET /api/categories/{categoryId}

Response:
{ "_id": "xyz123...", "name": "Desserts", ... }
```

### 5. Update Category (PUT)
```
PUT /api/categories/{categoryId}
Body:
{
  "name": "Desserts Français"
}

Response:
{ "_id": "xyz123...", "name": "Desserts Français", ... }
```

### 6. Delete Category (DELETE)
```
DELETE /api/categories/{categoryId}

Response:
{ "message": "Categorie deleted" }
```

---

## STEP 3: Test Recipes

### 1. Create a Recipe (POST)
```
POST /api/recettes
Body:
{
  "name": "Pâtes Carbonara",
  "description": "Délicieuses pâtes avec œufs, bacon et parmesan",
  "difficulty": "facile",
  "category": "{paste_categoryId_here}",
  "ingredients": ["Pâtes", "Œufs", "Bacon", "Parmesan"]
}

Response (201):
{
  "_id": "def789...",
  "name": "Pâtes Carbonara",
  "description": "Délicieuses pâtes avec œufs, bacon et parmesan",
  "difficulty": "facile",
  "category": {
    "_id": "abc456...",
    "name": "Plats Principaux",
    ...
  },
  "ingredients": ["Pâtes", "Œufs", "Bacon", "Parmesan"],
  "createdAt": "2026-04-29T..."
}
```

### 2. Get All Recipes (GET)
```
GET /api/recettes

Response:
[
  {
    "_id": "def789...",
    "name": "Pâtes Carbonara",
    "description": "...",
    "difficulty": "facile",
    "category": { ... },
    "ingredients": [...],
    "createdAt": "..."
  }
]
```

### 3. Get One Recipe (GET)
```
GET /api/recettes/{recetteId}

Response: Same structure as above
```

### 4. Update Recipe (PUT)
```
PUT /api/recettes/{recetteId}
Body:
{
  "difficulty": "moyen",
  "ingredients": ["Pâtes", "Œufs", "Bacon", "Parmesan", "Poivre Noir"]
}

Response: Updated recipe with new data
```

### 5. Delete Recipe (DELETE)
```
DELETE /api/recettes/{recetteId}

Response:
{ "message": "Recette deleted" }
```

---

## STEP 4: Test Error Cases

### Missing Required Field (POST Recipe)
```
POST /api/recettes
Body:
{
  "name": "Pâtes",
  "difficulty": "facile"
  // Missing: description, category
}

Response (400):
{ "message": "Name, description, and category are required" }
```

### Missing Required Field (POST Category)
```
POST /api/categories
Body: {}

Response (400):
{ "message": "Name is required" }
```

### Not Found (GET)
```
GET /api/recettes/invalid_id_123

Response (500 or 404):
{ "message": "..." }
```

---

## Testing Workflow

1. **Create 2 categories** first
2. **Create 3 recipes** (use different categories)
3. **Get all recipes** → verify they have populated categories
4. **Update a recipe**
5. **Delete a recipe**
6. **Get all recipes** → verify it's deleted
7. **Delete a category** → verify recipes still exist

---

## Using Postman

1. Import `API_TESTING.json` into Postman
2. Replace `{categoryId}`, `{recetteId}` with actual IDs from responses
3. Send requests and verify responses

---

## Quick Test Script (Optional - Node.js)

Run this to test all endpoints automatically:

```bash
# Copy API_TESTING.json to Postman
# Or use: npx newman run API_TESTING.json
```
