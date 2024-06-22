exports.up = function(knex) {
    return knex.schema
      .createTable('recipes', table => {
        table.increments('recipe_id');
        table.string('recipe_name').unique().notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
      .createTable('steps', table => {
        table.increments('step_id');
        table.integer('recipe_id').unsigned().notNullable()
             .references('recipe_id').inTable('recipes').onDelete('CASCADE');
        table.integer('step_number').notNullable();
        table.text('step_instructions').notNullable();
      })
      .createTable('ingredients', table => {
        table.increments('ingredient_id');
        table.string('ingredient_name').notNullable();
      })
      .createTable('step_ingredients', table => {
        table.increments('step_ingredient_id');
        table.integer('step_id').unsigned().notNullable()
             .references('step_id').inTable('steps').onDelete('CASCADE');
        table.integer('ingredient_id').unsigned().notNullable()
             .references('ingredient_id').inTable('ingredients').onDelete('CASCADE');
        table.decimal('quantity').notNullable();
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('step_ingredients')
      .dropTableIfExists('ingredients')
      .dropTableIfExists('steps')
      .dropTableIfExists('recipes');
  };
  