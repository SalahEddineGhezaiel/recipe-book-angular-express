# 🔍 STEP 8: Search & Filter Implementation

## Overview

Added complete search and filter functionality to the Recipe Management App.

---

## Backend Changes

### `controllers/recetteController.js`

Updated `getAll()` method to accept query parameters:

```javascript
// GET /api/recettes?name=pasta&category=xyz&difficulty=facile

exports.getAll = async (req, res) => {
  const { name, category, difficulty } = req.query;
  
  // Build filter object based on parameters
  const filter = {};
  
  if (name) {
    filter.name = { $regex: name, $options: 'i' }; // Case-insensitive
  }
  if (category && category !== '') {
    filter.category = category;
  }
  if (difficulty && difficulty !== '') {
    filter.difficulty = difficulty;
  }
  
  const recettes = await Recette.find(filter).populate('category');
  res.json(recettes);
};
```

**How it works:**
- `$regex` - MongoDB text search (case-insensitive)
- `$options: 'i'` - Ignore case flag
- Multiple filters combine with AND logic

---

## Frontend Changes

### Service Enhancement

**`services/recette.service.ts`**

Added new method:
```typescript
getRecettesWithFilter(filters?: any): Observable<any[]> {
  let params = '';
  if (filters) {
    if (filters.name) params += `name=${encodeURIComponent(filters.name)}&`;
    if (filters.category) params += `category=${filters.category}&`;
    if (filters.difficulty) params += `difficulty=${filters.difficulty}&`;
  }
  return this.http.get<any[]>(`${this.apiUrl}/recettes?${params}`);
}
```

---

### Component Update

**`components/recette-list/recette-list.component.ts`**

Added state management:
```typescript
// Filter state
searchName = '';
selectedCategory = '';
selectedDifficulty = '';
categories: any[] = []; // Load all categories for filter dropdown

// Methods
onSearch(): void { ... }      // Called on search button click
onFilterChange(): void { ... } // Called on category/difficulty change
resetFilters(): void { ... }  // Reset all filters
```

---

### UI/Template Update

**`components/recette-list/recette-list.component.html`**

Added search and filter section:

```html
<div class="search-filter-section">
  <h3>Rechercher et Filtrer</h3>
  
  <!-- Search Input -->
  <div class="search-box">
    <input 
      type="text" 
      [(ngModel)]="searchName" 
      placeholder="Rechercher par nom..." 
      (keyup.enter)="onSearch()"
    />
    <button (click)="onSearch()">🔍 Rechercher</button>
  </div>

  <!-- Filter Dropdowns -->
  <div class="filter-box">
    <select [(ngModel)]="selectedCategory" (change)="onFilterChange()">
      <option value="">Toutes les catégories</option>
      <option *ngFor="let cat of categories" [value]="cat._id">
        {{ cat.name }}
      </option>
    </select>
    
    <select [(ngModel)]="selectedDifficulty" (change)="onFilterChange()">
      <option value="">Toutes les difficultés</option>
      <option value="facile">Facile</option>
      <option value="moyen">Moyen</option>
      <option value="difficile">Difficile</option>
    </select>
    
    <button (click)="resetFilters()">✕ Réinitialiser</button>
  </div>
</div>
```

---

## Features

### ✅ Search by Name
- Real-time search input
- Case-insensitive matching
- Enter key to search
- Click search button

### ✅ Filter by Category
- Dropdown with all categories
- Updates on selection change
- Combines with other filters

### ✅ Filter by Difficulty
- Easy/Medium/Hard options
- Updates on selection change
- Combines with other filters

### ✅ Reset Filters
- One-click reset button
- Clears all filters
- Shows all recipes again

---

## Usage Examples

### Search by Name
1. Type "pasta" in search box
2. Click search or press Enter
3. See only recipes with "pasta" in name

### Filter by Category & Difficulty
1. Select "Desserts" from category dropdown
2. Select "facile" from difficulty dropdown
3. See only easy desserts

### Combine Filters
1. Search for "cake"
2. Select "Desserts" category
3. Select "moyen" difficulty
4. See only medium-difficulty desserts with "cake" in name

### Reset Everything
1. Click "✕ Réinitialiser"
2. All filters cleared
3. All recipes shown

---

## API Requests

### Search by Name
```
GET /api/recettes?name=pasta
```

### Filter by Category
```
GET /api/recettes?category=665a1b2c...
```

### Filter by Difficulty
```
GET /api/recettes?difficulty=facile
```

### Combine All
```
GET /api/recettes?name=pasta&category=665a1b2c...&difficulty=moyen
```

---

## Code Simplicity

✅ **Backend**: Simple filter object building (3 if statements)
✅ **Frontend**: Two-way binding with ngModel
✅ **Service**: Query parameter building (straightforward)
✅ **No complex libraries**: Pure Angular + MongoDB

---

## Easy to Explain

1. **Search**: "We take the search text and use MongoDB regex to find matching recipes"
2. **Filter**: "We build a filter object with selected values and send to backend"
3. **Reset**: "We clear all filters and reload all recipes"

---

## Complete Feature List ✅

- ✅ Search recipes by name (case-insensitive)
- ✅ Filter recipes by category
- ✅ Filter recipes by difficulty
- ✅ Combine multiple filters
- ✅ Reset all filters
- ✅ Real-time updates
- ✅ Responsive UI
- ✅ Simple, readable code

---

## Project Now Complete! 🎉

All features from requirements implemented:
- ✅ CRUD recettes
- ✅ CRUD categories
- ✅ Assign category to recipe
- ✅ List + detail view
- ✅ Search by name
- ✅ Filter by category or difficulty
- ✅ Simple forms
- ✅ API testing examples

Ready to run and present to professor!
