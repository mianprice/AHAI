const config = require('./config');
const fs = require('fs-promise');
const pgp = require('pg-promise')();
var db = pgp(config);

// Parse ROUTES
// var route_q = `
//   CREATE TABLE routes(
//     route_id integer PRIMARY KEY,
//     route_short_name varchar,
//     route_long_name varchar,
//     route_desc varchar,
//     route_type varchar,
//     route_url varchar,
//     route_color varchar,
//     route_text_color varchar
//   );
// `;
//
// db.none(route_q)
//   .then(() => {
//     console.log("Check to see if table is there");
//   })
//   .catch((err) => {
//     throw err;
//   })
// fs.readFile('routes.txt', {encoding:'utf8'})
//   .then((contents) => {
//     var lines = contents.split('\r\n');
//     lines = lines.map((element) => {
//       return element.split(",");
//     });
//     lines.forEach((element) => {
//       var qstring = `
//       insert into routes values (${element[0]},'${element[1]}','${element[2]}','${element[3]}','${element[4]}','${element[5]}','${element[6]}','${element[7]}') returning route_id
//       `;
//       db.one(qstring)
//         .then((result) => {
//           console.log(result);
//         });
//     });
//   })
//   .catch((err) => {
//     throw err;
//   });

// Parse TRIPS
var route_q = `
  CREATE TABLE trips(
    route_id integer PRIMARY KEY,
    route_short_name varchar,
    route_long_name varchar,
    route_desc varchar,
    route_type varchar,
    route_url varchar,
    route_color varchar,
    route_text_color varchar
  );
`;

db.none(route_q)
  .then(() => {
    console.log("Check to see if table is there");
  })
  .catch((err) => {
    throw err;
  })
fs.readFile('routes.txt', {encoding:'utf8'})
  .then((contents) => {
    var lines = contents.split('\r\n');
    lines = lines.map((element) => {
      return element.split(",");
    });
    lines.forEach((element) => {
      var qstring = `
      insert into routes values (${element[0]},'${element[1]}','${element[2]}','${element[3]}','${element[4]}','${element[5]}','${element[6]}','${element[7]}') returning route_id
      `;
      db.one(qstring)
        .then((result) => {
          console.log(result);
        });
    });
  })
  .catch((err) => {
    throw err;
  });

// Parse STOPS

// Parse STOP_TIMES
