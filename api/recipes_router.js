const express = require('express');
const Recipes = require('../data/recipes-model');

const router = express.Router();

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Recipes.getRecipeById(id)
    .then(recipe => {
      if (recipe) {
        res.json(recipe);
      } else {
        res.status(404).json({ message: 'Recipe not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get recipe' });
    });
});

module.exports = router;
