const Categorie = require('../models/Categorie');

// Get all categories
exports.getAll = async (req, res) => {
  try {
    const categories = await Categorie.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one category by ID
exports.getOne = async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id);
    if (!categorie) {
      return res.status(404).json({ message: 'Categorie not found' });
    }
    res.json(categorie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new category
exports.create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const categorie = new Categorie({ name });

  try {
    const savedCategorie = await categorie.save();
    res.status(201).json(savedCategorie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update category
exports.update = async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id);
    if (!categorie) {
      return res.status(404).json({ message: 'Categorie not found' });
    }

    if (req.body.name) {
      categorie.name = req.body.name;
    }

    const updatedCategorie = await categorie.save();
    res.json(updatedCategorie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete category
exports.delete = async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndDelete(req.params.id);
    if (!categorie) {
      return res.status(404).json({ message: 'Categorie not found' });
    }
    res.json({ message: 'Categorie deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
