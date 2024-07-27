// const knex =require('knex')
// const config =require('../knexfile')
// const {attachPaginate} = require('knex-paginate')

// attachPaginate()
// module.exports = () => {

//   return knex(config.development); 
// };


const knex = require('knex');
const config = require('../knexfile');
const { attachPaginate } = require('knex-paginate');

attachPaginate();

module.exports = () => {
  const db = knex(config.development);

  db.raw('SELECT 1')
    .then(() => {
      console.log('Database connection successfully');
    })
    .catch((error) => {
      console.error('Failed to establish database connection:', error.message);
    });

  return db;
};
