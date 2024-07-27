/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('link-data', (table) => {
        table.increments('id').primary();
        table.string('link').nullable(); 
        table.integer('duration').nullable(); 
       

        table.string("createdAt").defaultTo(knex.fn.now());
        table.string("updatedAt").nullable();
      
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('link-data')

  
};
