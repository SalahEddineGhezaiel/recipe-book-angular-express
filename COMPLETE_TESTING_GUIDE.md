# ✅ COMPLETE TESTING GUIDE - Recipe Management App

## 🔧 PART 1: MANUAL SETUP (Before Testing)

### Prerequisites Check
- [ ] Node.js installed → Run: `node --version` (should be v18+)
- [ ] npm installed → Run: `npm --version` (should be v9+)
- [ ] MongoDB running locally → Open MongoDB Compass
- [ ] Git initialized → Already done (you have .git folder)

### What You Need to Do Manually

#### 1. Start MongoDB
```
✅ Open MongoDB Compass
   - Verify it shows "Connected" in top-left
   - No action needed if already running
```

#### 2. Install Backend Dependencies
```bash
cd backend
npm install
```
Expected output:
```
added XXX packages in XXs
```

#### 3. Install Frontend Dependencies
```bash
cd frontend
npm install
```
Expected output:
```
added XXX packages in XXs
```

✅ That's it! No other manual setup needed.

---

## 🚀 PART 2: STARTING THE APPLICATION

### Terminal 1 - Backend Server

```bash
cd backend
npm run dev
```

**✅ What to Look For:**
```
Server running on port 3000
MongoDB connected
```

**❌ If you see errors:**
- "Cannot find module 'mongoose'" → Run `npm install` in backend
- "MongoDB connection error" → Open MongoDB Compass
- "Port 3000 in use" → Close other Node apps or use different port

---

### Terminal 2 - Frontend Development Server

```bash
cd frontend
ng serve --open
```

Or without auto-open:
```bash
ng serve
```

**✅ What to Look For:**
```
✔ Compiled successfully.
✔ Application bundle generated successfully in X.Xs.

Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200
```

**❌ If you see errors:**
- "Command 'ng' not found" → Run `npm install -g @angular/cli`
- Compilation errors → Check import statements and module declarations
- "Port 4200 in use" → Close other Angular apps or use `--port 4300`

---

## 🌐 PART 3: TESTING FRONTEND

### Step 1: Open Frontend in Browser
```
URL: http://localhost:4200
```

**✅ What to Look For:**
- Header: "🍳 Mes Recettes" (Recipe title visible)
- "Accueil" (Home link) on the right
- "Ajouter une recette" button (Add recipe)
- Search and filter section should show
- "Aucune recette trouvée" message (No recipes yet - normal)

**❌ Common Issues:**
- Blank page → Check browser console (F12)
- Header missing → CSS not loaded (check app.component.css)
- Filters not showing → Check FormsModule in component imports

### Step 2: Create Categories (via Backend)

Open Terminal 3:

```bash
# Create Category 1
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Desserts\"}"
```

**✅ What You Should See:**
```json
{
  "_id": "665a1b2c3d4e5f6g7h8i9j0k",
  "name": "Desserts",
  "createdAt": "2026-04-29T..."
}
```

**Important:** Copy the `_id` value - you'll need it!

```bash
# Create Category 2
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Plats Principaux\"}"
```

**✅ Verify Categories Loaded:**
- Refresh http://localhost:4200 (F5)
- "Toutes les catégories" dropdown should now show:
  - Desserts
  - Plats Principaux

### Step 3: Create a Recipe via Frontend

1. Click **"+ Ajouter une recette"** button
2. Fill in the form:
   ```
   Nom: Pâtes Carbonara
   Description: Délicieuses pâtes avec œufs et parmesan
   Catégorie: Desserts (select from dropdown)
   Difficulté: facile
   Ingrédients: Pâtes, Œufs, Bacon, Parmesan
   ```
3. Click **"Enregistrer"**

**✅ What You Should See:**
- Form disappears
- Redirected back to home page
- Your recipe shows in a card
- Shows the category badge
- Shows difficulty badge (green for "facile")

**❌ If Recipe Doesn't Appear:**
- Check browser console (F12) for errors
- Check backend terminal for errors
- Verify category was selected

### Step 4: Create More Recipes

Create at least 3 recipes with:
- Different categories
- Different difficulty levels
- Different ingredients

**Examples:**
```
1. Tiramisu
   - Category: Desserts
   - Difficulty: moyen
   - Ingredients: Mascarpone, Œufs, Café, Cacao

2. Poulet Rôti
   - Category: Plats Principaux
   - Difficulty: facile
   - Ingredients: Poulet, Sel, Poivre, Ail

3. Crème Brûlée
   - Category: Desserts
   - Difficulty: difficile
   - Ingredients: Crème, Œuf, Sucre, Vanille
```

### Step 5: Test Search Feature

1. In search box, type: **"pâtes"**
2. Click **"🔍 Rechercher"** or press Enter

**✅ What You Should See:**
- Only "Pâtes Carbonara" recipe displays
- Others are filtered out

Try searching for:
- "tiramisu" → Should show Tiramisu
- "poulet" → Should show Poulet Rôti
- "xyz" → Should show "Aucune recette trouvée"

### Step 6: Test Category Filter

1. Leave search empty
2. Select **"Desserts"** from category dropdown

**✅ What You Should See:**
- Only dessert recipes show:
  - Pâtes Carbonara (if you put it in Desserts)
  - Tiramisu
  - Crème Brûlée
- Plats Principaux recipes hidden

Try:
- Select "Plats Principaux" → Only shows Poulet Rôti
- Select "Toutes les catégories" → All recipes show

### Step 7: Test Difficulty Filter

1. Leave search and category empty
2. Select **"facile"** from difficulty dropdown

**✅ What You Should See:**
- Only easy recipes show:
  - Pâtes Carbonara (if marked facile)
  - Poulet Rôti

Try:
- Select "moyen" → Shows medium recipes
- Select "difficile" → Shows hard recipes

### Step 8: Test Combined Filters

1. Type "pâ" in search
2. Select "Desserts" category
3. Select "facile" difficulty

**✅ What You Should See:**
- Only recipes that match ALL three criteria
- If you created "Pâtes Carbonara" as easy dessert → Shows it
- If only one criterion matches → Recipe won't show

### Step 9: Test Reset Button

1. Any filters applied
2. Click **"✕ Réinitialiser"**

**✅ What You Should See:**
- All filters cleared
- All recipes show
- Search box empty
- Dropdowns reset to "Toutes les..."

### Step 10: Test View Details

1. Click **"Voir"** button on any recipe

**✅ What You Should See:**
- New page with recipe details
- Full name and description
- Category badge
- Difficulty badge
- Ingredients list with ✓ checkmarks
- "Modifier" button
- "Retour à la liste" button

**Test:**
- Click "Modifier" → Goes to edit form
- Click "Retour à la liste" → Goes back to home

### Step 11: Test Edit Recipe

1. Click **"Voir"** on any recipe
2. Click **"Modifier"**

**✅ What You Should See:**
- Form pre-filled with recipe data
- Can change any field
- Save → Updates recipe

**Test Edit:**
- Change difficulty from "facile" to "difficile"
- Add ingredient: "Poivre Noir"
- Click "Enregistrer"
- Verify changes on recipe list

### Step 12: Test Delete Recipe

1. On recipe card, click **"Supprimer"**
2. Confirm deletion

**✅ What You Should See:**
- Confirmation popup
- If you confirm → Recipe disappears from list
- Recipe count decreases by 1

---

## 🖥️ PART 4: TESTING BACKEND API

### Test 1: Get All Recipes

```bash
curl http://localhost:3000/api/recettes
```

**✅ Expected Response:**
```json
[
  {
    "_id": "...",
    "name": "Pâtes Carbonara",
    "description": "...",
    "difficulty": "facile",
    "category": {
      "_id": "...",
      "name": "Desserts",
      "createdAt": "..."
    },
    "ingredients": ["Pâtes", "Œufs", "Bacon", "Parmesan"],
    "createdAt": "..."
  },
  ...
]
```

**Key Things to Check:**
- ✅ `category` is populated (shows full object, not just ID)
- ✅ `ingredients` is an array
- ✅ All recipes have required fields

### Test 2: Search by Name

```bash
curl "http://localhost:3000/api/recettes?name=pâtes"
```

**✅ Expected Response:**
- Only recipes with "pâtes" in name
- Case-insensitive match

### Test 3: Filter by Category

```bash
# First, get a category ID
curl http://localhost:3000/api/categories

# Then use the ID
curl "http://localhost:3000/api/recettes?category=665a1b2c3d4e5f6g7h8i9j0k"
```

**✅ Expected Response:**
- Only recipes with that category

### Test 4: Filter by Difficulty

```bash
curl "http://localhost:3000/api/recettes?difficulty=facile"
```

**✅ Expected Response:**
- Only easy recipes

### Test 5: Combine Filters

```bash
curl "http://localhost:3000/api/recettes?name=pâtes&category=665a1b2c3d4e5f6g7h8i9j0k&difficulty=facile"
```

**✅ Expected Response:**
- Only recipes matching ALL criteria

### Test 6: Create Recipe (POST)

```bash
curl -X POST http://localhost:3000/api/recettes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Recipe",
    "description": "Test Description",
    "difficulty": "moyen",
    "category": "665a1b2c3d4e5f6g7h8i9j0k",
    "ingredients": ["Ingredient1", "Ingredient2"]
  }'
```

**✅ Expected Response:**
- Status: 201 (Created)
- Returns recipe with new `_id`

### Test 7: Error Case - Missing Required Field

```bash
curl -X POST http://localhost:3000/api/recettes \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Recipe"}'
```

**✅ Expected Response:**
- Status: 400 (Bad Request)
- Error: "Name, description, and category are required"

### Test 8: Update Recipe (PUT)

```bash
curl -X PUT http://localhost:3000/api/recettes/665a1b2c3d4e5f6g7h8i9j0k \
  -H "Content-Type: application/json" \
  -d '{"difficulty": "difficile"}'
```

**✅ Expected Response:**
- Updated recipe data
- Old data unchanged (only difficulty updated)

### Test 9: Delete Recipe (DELETE)

```bash
curl -X DELETE http://localhost:3000/api/recettes/665a1b2c3d4e5f6g7h8i9j0k
```

**✅ Expected Response:**
- Status: 200
- Message: "Recette deleted"

---

## 🗄️ PART 5: TESTING MONGODB

### Open MongoDB Compass

1. Start MongoDB Compass (should already be running)
2. You should see: **"Connected"** in green

### Check Database

1. Look for **`recettes_db`** in the left panel
2. Click to expand it
3. You should see **2 collections**:
   - `categories`
   - `recettes`

**✅ What to Verify in Each Collection:**

#### Categories Collection
- Click on `categories`
- You should see your categories:
  ```json
  {
    "_id": ObjectId(...),
    "name": "Desserts",
    "createdAt": Date(...)
  }
  ```

#### Recettes Collection
- Click on `recettes`
- You should see your recipes:
  ```json
  {
    "_id": ObjectId(...),
    "name": "Pâtes Carbonara",
    "description": "...",
    "difficulty": "facile",
    "category": ObjectId(...),
    "ingredients": ["Pâtes", "Œufs", "Bacon", "Parmesan"],
    "createdAt": Date(...)
  }
  ```

**Key Things to Verify:**
- ✅ Documents have proper structure
- ✅ `category` is an ObjectId (not a string)
- ✅ `ingredients` is an array
- ✅ Timestamps are correct
- ✅ Document count matches what you created

### Test Data Persistence

1. Create a recipe in frontend
2. Check MongoDB Compass - new document appears
3. Refresh browser - recipe still shows
4. Close MongoDB Compass and reopen - data still there
5. Restart backend - data still there

✅ This confirms data is actually saved to MongoDB!

---

## ✅ COMPLETE TESTING CHECKLIST

### Frontend Tests
- [ ] Page loads without errors
- [ ] Header shows "🍳 Mes Recettes"
- [ ] Categories dropdown shows all categories
- [ ] Can create recipe
- [ ] Recipe appears in list
- [ ] Recipe shows correct category badge
- [ ] Recipe shows correct difficulty color
- [ ] Search by name works
- [ ] Filter by category works
- [ ] Filter by difficulty works
- [ ] Combined filters work
- [ ] Reset filters works
- [ ] View details shows full recipe
- [ ] Edit recipe updates data
- [ ] Delete recipe removes it
- [ ] No console errors (F12)

### Backend Tests
- [ ] Server starts without errors
- [ ] MongoDB connection successful
- [ ] GET all recipes returns data
- [ ] GET all recipes has populated categories
- [ ] Search by name filters correctly
- [ ] Filter by category works
- [ ] Filter by difficulty works
- [ ] Combined filters work
- [ ] Create recipe returns 201
- [ ] Error on missing field returns 400
- [ ] Update recipe works
- [ ] Delete recipe works

### MongoDB Tests
- [ ] Database `recettes_db` exists
- [ ] `categories` collection exists and has data
- [ ] `recettes` collection exists and has data
- [ ] Documents have correct structure
- [ ] `category` field is ObjectId (not string)
- [ ] `ingredients` field is array
- [ ] Data persists after app restart

---

## 🎯 QUICK VERIFICATION FLOW

**Do this to verify EVERYTHING works in 5 minutes:**

```bash
# Terminal 1
cd backend
npm run dev
# Wait for: "Server running on port 3000, MongoDB connected"

# Terminal 2
cd frontend
ng serve
# Wait for: "✔ Compiled successfully"

# Terminal 3 - Create test data
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Test\"}"

# Terminal 3 - Get the ID from response, then create recipe
curl -X POST http://localhost:3000/api/recettes \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Test Recipe\", \"description\": \"Test\", \"category\": \"<paste_id_here>\", \"ingredients\": [\"Test\"]}"
```

**Then:**
1. Open http://localhost:4200
2. Should see recipe in list
3. Open MongoDB Compass
4. Check `recettes_db` → should have data
5. Click "Search" → should filter correctly

✅ If all 5 steps work → **APP IS PERFECT!**

---

## ❌ COMMON ISSUES & SOLUTIONS

### Issue: "Cannot find module"
**Solution:** Run `npm install` in that folder

### Issue: Port already in use
**Solution:** Kill process or use different port:
```bash
ng serve --port 4300
```

### Issue: CORS error in browser console
**Solution:** Restart backend (should already have CORS enabled)

### Issue: Empty recipe list on frontend
**Solution:** 
1. Create categories via curl first
2. Then create recipes

### Issue: Recipe shows but category is empty
**Solution:** Backend might not be using `.populate('category')`
Check: `controllers/recetteController.js` line with `populate('category')`

### Issue: Search/filters not working
**Solution:** 
- Check browser console for errors
- Verify backend received query parameters
- Check MongoDB connection

### Issue: MongoDB shows no data
**Solution:**
1. Verify MongoDB Compass shows "Connected"
2. Make sure you're looking at `recettes_db` database
3. Try creating data via API again

---

## 📊 FINAL VERIFICATION SUMMARY

✅ **Backend:** Server runs on port 3000 with MongoDB connected
✅ **Frontend:** Angular app loads on port 4200 with no errors
✅ **Database:** MongoDB has `recettes_db` with 2 collections
✅ **CRUD:** All create/read/update/delete operations work
✅ **Search:** Search by name filters correctly
✅ **Filter:** Category and difficulty filters work
✅ **Combined:** Multiple filters work together
✅ **UI:** All pages render and navigate correctly

**If all these are green → PROJECT IS COMPLETE AND WORKING! 🎉**
