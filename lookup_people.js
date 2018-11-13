const pg = require("pg");
const settings = require("./settings.json");
const fName = process.argv[2];
const moment = require("moment");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name LIKE '${fName}' OR last_name LIKE '${fName}'`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    let queryResults = result.rows;
    queryResults.forEach((entry, index) => {
      console.log(` - ${index}: ${entry.first_name} ${entry.last_name}, born ${moment(entry.birthdate).format("YYYY-MM-DD")};`)
      // console.log("index = ", index)
    })
    // console.log(result.rows); //output: 1
    client.end();
  });
});



// client.query('', (err, res) => {
//   err;

//   `SELECT * FROM famous_people;`
//   console.log("settings.database = ", settings.database)
//   console.log("=====================================================")
//   console.log("res = ", res);
//   console.log("=====================================================")
//   console.log("client = ", client);

//   client.end()
// })





  //     console.log("result.rows = ", result.rows)
  //     console.log("=========== client = ", client)
  //     console.log("!!!!!!!!!!!!! fName = ", fName)
  //     console.log("client.user = ", client.user)
  //     console.log("settings.database = ", settings.database)
  //     console.log("SQL MUCH ATTACK = ",)

  //       client.query((err, result) => {
  //                   console.log("got this far!");
  //         `SELECT * FROM famous_people`;
  //       });

  // if (err) {
  //   return console.error("Connection Error", err);
  // }
  // client.query((err, result) => {
  //   if (err) {
  //     console.log("She here! = ", fName)
  //     return console.error("error running query", err);
  //   }
  //   client.end();
  // });