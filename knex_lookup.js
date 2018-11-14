const settings = require("./settings.json");
const fName = process.argv[2];
const moment = require("moment");

const knex = require('knex')({
  client: 'pg',
  connection: {
      user     : settings.user,
      password : settings.password,
      database : settings.database,
      host     : settings.hostname,
      port     : settings.port,
      ssl      : settings.ssl
  },
  searchPath: ['knex', 'public']
});

knex.select().from('famous_people').where('first_name', 'Paul').asCallback((err, rows) => {
  if (err) return console.errog('ERROR: ', err);
  rows.forEach((row, index) => {
    console.log(` - ${index + 1}: ${row.first_name} ${row.last_name}, born ${moment(row.birthdate).format("YYYY-MM-DD")};`)
  })
});