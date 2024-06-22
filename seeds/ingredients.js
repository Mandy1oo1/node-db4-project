exports.seed = function(knex) {
    return knex('ingredients').del()
      .then(function () {
        return knex('ingredients').insert([
          { ingredient_name: 'olive oil' },
          { ingredient_name: 'eggs' },
          { ingredient_name: 'flour' }
        ]);
      });
  };
  