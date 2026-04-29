const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');

// GET all categories
router.get('/', categorieController.getAll);

// GET one category
router.get('/:id', categorieController.getOne);

// POST new category
router.post('/', categorieController.create);

// PUT update category
router.put('/:id', categorieController.update);

// DELETE category
router.delete('/:id', categorieController.delete);

module.exports = router;
