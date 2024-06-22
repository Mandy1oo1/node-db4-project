const db = require('../data/db-config');

function getRecipeById(recipe_id) {
  return db('recipes as r')
    .leftJoin('steps as s', 'r.recipe_id', 's.recipe_id')
    .leftJoin('step_ingredients as si', 's.step_id', 'si.step_id')
    .leftJoin('ingredients as i', 'si.ingredient_id', 'i.ingredient_id')
    .where('r.recipe_id', recipe_id)
    .select(
      'r.recipe_id', 'r.recipe_name', 'r.created_at',
      's.step_id', 's.step_number', 's.step_instructions',
      'i.ingredient_id', 'i.ingredient_name', 'si.quantity'
    )
    .then(rows => {
      const recipe = {
        recipe_id: rows[0].recipe_id,
        recipe_name: rows[0].recipe_name,
        created_at: rows[0].created_at,
        steps: []
      };

      rows.forEach(row => {
        const step = recipe.steps.find(s => s.step_id === row.step_id);

        if (!step) {
          recipe.steps.push({
            step_id: row.step_id,
            step_number: row.step_number,
            step_instructions: row.step_instructions,
            ingredients: row.ingredient_id ? [{
              ingredient_id: row.ingredient_id,
              ingredient_name: row.ingredient_name,
              quantity: row.quantity
            }] : []
          });
        } else if (row.ingredient_id) {
          step.ingredients.push({
            ingredient_id: row.ingredient_id,
            ingredient_name: row.ingredient_name,
            quantity: row.quantity
          });
        }
      });

      return recipe;
    });
}

module.exports = {
  getRecipeById
};
