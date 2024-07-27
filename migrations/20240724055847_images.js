/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('upload-images', (table) => {
        table.increments('id').primary();
        table.text('images').nullable(); 
        table.string('location').nullable(); 
        table.text('description').nullable(); 
        table.text('videos').nullable(); 
        table.text('name').nullable(); 

        table.string("createdAt").defaultTo(knex.fn.now());
        table.string("updatedAt").nullable();
      
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('upload-images')
  
};
