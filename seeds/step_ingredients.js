exports.seed = function(knex) {
    return knex('step_ingredients').del()
      .then(function () {
        return knex('step_ingredients').insert([
          { step_id: 2, ingredient_id: 1, quantity: 0.014 },
          { step_id: 3, ingredient_id: 2, quantity: 2 },
          { step_id: 3, ingredient_id: 3, quantity: 0.1 }
        ]);
      });
  };
  