// Update with your config settings.
const settings = require("./settings.json");


module.exports = {

  development: {
  client: 'pg',
  connection:
      settings,
  searchPath: ['knex', 'public']
  },

};
