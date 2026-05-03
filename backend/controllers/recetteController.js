const Recette = require('../models/Recette');

// Get all recipes (with search and filter)
exports.getAll = async (req, res) => {
  try {
    const { name, category, difficulty } = req.query;
    
    const filter = {};
    
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }
    
    if (category && category !== '') {
      filter.category = category;
    }
    
    if (difficulty && difficulty !== '') {
      filter.difficulty = difficulty;
    }
    
    const recettes = await Recette.find(filter).populate('category');
    res.json(recettes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one recipe by ID
exports.getOne = async (req, res) => {
  try {
    const recette = await Recette.findById(req.params.id).populate('category');
    if (!recette) {
      return res.status(404).json({ message: 'Recette not found' });
    }
    res.json(recette);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new recipe
exports.create = async (req, res) => {
  const { name, description, difficulty, category, ingredients } = req.body;

  if (!name || !description || !category) {
    return res.status(400).json({ message: 'Name, description, and category are required' });
  }

  const recette = new Recette({
    name,
    description,
    difficulty: difficulty || 'moyen',
    category,
    ingredients: ingredients || []
  });

  try {
    const savedRecette = await recette.save();
    const populatedRecette = await savedRecette.populate('category');
    res.status(201).json(populatedRecette);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update recipe
exports.update = async (req, res) => {
  try {
    const recette = await Recette.findById(req.params.id);
    if (!recette) {
      return res.status(404).json({ message: 'Recette not found' });
    }

    if (req.body.name) recette.name = req.body.name;
    if (req.body.description) recette.description = req.body.description;
    if (req.body.difficulty) recette.difficulty = req.body.difficulty;
    if (req.body.category) recette.category = req.body.category;
    if (req.body.ingredients) recette.ingredients = req.body.ingredients;

    const updatedRecette = await recette.save();
    const populatedRecette = await updatedRecette.populate('category');
    res.json(populatedRecette);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete recipe
exports.delete = async (req, res) => {
  try {
    const recette = await Recette.findByIdAndDelete(req.params.id);
    if (!recette) {
      return res.status(404).json({ message: 'Recette not found' });
    }
    res.json({ message: 'Recette deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
