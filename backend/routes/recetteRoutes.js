const express = require('express');
const router = express.Router();
const recetteController = require('../controllers/recetteController');

// GET all recipes
router.get('/', recetteController.getAll);

// GET one recipe
router.get('/:id', recetteController.getOne);

// POST new recipe
router.post('/', recetteController.create);

// PUT update recipe
router.put('/:id', recetteController.update);

// DELETE recipe
router.delete('/:id', recetteController.delete);

module.exports = router;
