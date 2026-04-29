# 📋 MANUAL SETUP CHECKLIST

## ✅ What Needs Manual Setup

### 1. MongoDB (Required - Do This First)
```
⚠️ MUST BE RUNNING BEFORE STARTING BACKEND

✅ Steps:
1. Download MongoDB Community Edition (if not installed)
2. Open MongoDB Compass
3. It should auto-connect to localhost:27017
4. Verify you see "Connected" in green
5. Keep it running while developing
```

### 2. Backend Setup
```bash
cd backend
npm install
# Wait for all packages to install
```

### 3. Frontend Setup
```bash
cd frontend
npm install
# Wait for all packages to install
```

### 4. Create Categories (Data Seeding)
```bash
# Before creating recipes, create at least 1 category via API:
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Catégorie Test\"}"

# Copy the returned _id for creating recipes
```

---

## ✅ What's Already Done (Don't Need to Change)

- ✅ Backend folder structure created
- ✅ Frontend folder structure created
- ✅ Models defined
- ✅ Routes configured
- ✅ Controllers implemented
- ✅ Angular components created
- ✅ Services configured
- ✅ Routing set up
- ✅ Database configuration (.env)
- ✅ CORS enabled
- ✅ FormsModule imported

---

## ⚠️ TypeScript Config Warnings (Safe to Ignore)

**File:** `frontend/tsconfig.json`

**Warnings:**
```
1. "rootDir" setting should be explicitly set
2. "moduleResolution=node10" is deprecated
```

**Status:** ✅ **Safe to Ignore** - App will run fine
- These are TypeScript future compatibility warnings
- Will be fixed in Angular 18+
- Do NOT need to fix for this project

**If you want to fix (optional):**
```json
// In frontend/tsconfig.json, add under "compilerOptions":
"ignoreDeprecations": "6.0"
```

---

## ✅ File Verification

### Backend Files - All Present ✅
- `backend/app.js` ✅
- `backend/.env` ✅
- `backend/package.json` ✅
- `backend/config/db.js` ✅
- `backend/models/Recette.js` ✅
- `backend/models/Categorie.js` ✅
- `backend/routes/recetteRoutes.js` ✅
- `backend/routes/categorieRoutes.js` ✅
- `backend/controllers/recetteController.js` ✅
- `backend/controllers/categorieController.js` ✅

### Frontend Files - All Present ✅
- `frontend/src/app/app.component.ts` ✅
- `frontend/src/app/app.component.html` ✅
- `frontend/src/app/app.routes.ts` ✅
- `frontend/src/app/app.config.ts` ✅
- `frontend/src/app/services/recette.service.ts` ✅
- `frontend/src/app/components/recette-list/` ✅
- `frontend/src/app/components/recette-form/` ✅
- `frontend/src/app/components/recette-detail/` ✅

---

## 🚀 Quick Start (After Setup)

**Terminal 1:**
```bash
cd backend
npm run dev
```

**Terminal 2:**
```bash
cd frontend
ng serve
```

**Browser:**
```
http://localhost:4200
```

---

## 📝 Notes

- Backend port: **3000**
- Frontend port: **4200**
- Database: **MongoDB local (localhost:27017)**
- Database name: **recettes_db** (created automatically)
- No API key needed (local development)

---

## ✅ You're Ready!

All manual setup is done.

**Next steps:**
1. Follow COMPLETE_TESTING_GUIDE.md
2. Run the app
3. Test all features
4. Verify in MongoDB Compass
5. Present to professor! 🎓
