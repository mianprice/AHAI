const config = require('./config');
const fs = require('fs-promise');
const pgp = require('pg-promise')();
var db = pgp(config.dbconfig);

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
// var route_q = `
//   CREATE TABLE trips(
//     route_id integer references routes(route_id),
//     service_id varchar,
//     trip_id integer primary key,
//     trip_headsign varchar,
//     direction_id varchar,
//     block_id varchar,
//     shape_id varchar
//   );
// `;
//
// db.none(route_q)
//   .then(() => {
//     console.log("Check to see if table is there");
//     fs.readFile('trips.txt', {encoding:'utf8'})
//       .then((contents) => {
//         var lines = contents.split('\r\n');
//         lines = lines.map((element) => {
//           return element.split(",");
//         });
//         lines.forEach((element) => {
//           var qstring = `
//           insert into trips values (${element[0]},'${element[1]}',${element[2]},'${element[3]}','${element[4]}','${element[5]}','${element[6]}') returning trip_id
//           `;
//           db.one(qstring)
//             .then((result) => {
//               console.log(result);
//             });
//         });
//       });
//   })
//   .catch((err) => {
//     throw err;
//   });


// Parse STOPS
// var route_q = `
//   CREATE TABLE stops(
//     stop_id integer primary key,
//     stop_code varchar,
//     stop_name varchar,
//     stop_lat varchar,
//     stop_lon varchar
//   );
// `;
//
// db.none(route_q)
//   .then(() => {
//     console.log("Check to see if table is there");
//     fs.readFile('stops.txt', {encoding:'utf8'})
//       .then((contents) => {
//         var lines = contents.split('\r\n');
//         lines = lines.map((element) => {
//           return element.split(",");
//         });
//         lines.forEach((element) => {
//           var qstring = `
//           insert into stops values (${element[0]},'${element[1]}','${element[2]}','${element[3]}','${element[4]}') returning stop_id
//           `;
//           db.one(qstring)
//             .then((result) => {
//               console.log(result);
//             });
//         });
//       });
//   })
//   .catch((err) => {
//     throw err;
//   });

// Parse STOP_TIMES
// 
// var stop_trip_q = `
//   CREATE TABLE stop_trips(
//     trip_id integer references trips(trip_id),
//     stop_id integer references stops(stop_id)
//   );
// `;
//
// var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
// var fileSet = [];
// var base = "x";
// for (var i = 0; i<5; i++) {
//   if (i<4) {
//     for (var j = 0; j<26; j++) {
//       fileSet.push(base+alphabet[i]+alphabet[j]);
//     }
//   } else {
//     for (var j = 0; j<6; j++) {
//       fileSet.push(base+alphabet[i]+alphabet[j]);
//     }
//   }
// }
//
//
//
// for(var i=100;i<fileSet.length;i++){
//   fs.readFile(fileSet[i], {encoding:'utf8'})
//    .then((contents) => {
//      var lines = contents.split('\r\n');
//      lines = lines.map((ele) => {
//        return ele.split(",");
//      });
//      lines.forEach((ele) => {
//        var qstring = `
//        insert into stop_trips values (${ele[0]},${ele[3]})
//        `;
//        db.none(qstring)
//        .then(() => {})
//        .catch((err) => {
//          throw err;
//        })
//      });
//    })
//    .catch((err) => {
//      throw err;
//    });
// }


// db.none(stop_trip_q)
//   .then(() => {
//     console.log("Check to see if table is there");
//   })
//   .catch((err) => {
//     throw err;
//   });
