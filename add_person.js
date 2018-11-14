const settings = require("./settings.json");
const fName = process.argv[2];
const lName = process.argv[3];
const dob = process.argv[4];
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

console.log(fName);



knex('famous_people').insert(
  {first_name: fName,
  last_name: lName,
  birthdate: dob
  }).returning('id').asCallback((err, id) => {
    if (err) return console.error('ERROR: ', err);
      knex.select().from('famous_people').asCallback((err, rows) => {
      if (err) return console.error('ERROR: ', err);
        console.log("rows", rows)
    });
});

