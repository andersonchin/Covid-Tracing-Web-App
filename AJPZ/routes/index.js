// 68345547681-s6c6gkhs32l3atkmuptdh1e1jamqg2u4.apps.googleusercontent.com
// xa4rZ2-rev_Idi9mQeOB7IQb

var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const Nominatim = require('nominatim-geocoder');
var app = express();

const geocoder = new Nominatim();
const geocodingClient = new Nominatim();

// function addHotspot (longtitude, latitude, name){

// }
// geocoder.search( { q: 'Adelaide, Australia' } )
//     .then((response) => {
//         console.log('Longtitude',response[0].lon);
//         console.log('Latitude',response[0].lat);
//         //addHotspot(response[0].lon,response[0].lat, response[0].display_name);
//         //store in db
//     })
//     .catch((error) => {
//         console.log(error);
//     });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/addHotspot', function(req, res, next)  {

  // Connect to database
  // console.log('--ADDHOTSPOT--');
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "SELECT DISTINCT Street_Address, Suburb_Town, State, Country FROM Addresses;";

    connection.query(query, [req.body.Street_Address, req.body.Suburb_Town, req.body.State, req.body.Country], function(err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(404);
        return;
      }

      var mapData = [];

      for (let i = 0; i < rows.length; i++) {
      // for (let i = 0; i < 2; i++) {
        geocoder.search( { q: rows[i].Street_Address + ',' + rows[i].Suburb_Town + ',' + rows[i].State + ',' + rows[i].Country } )
        .then((response) => {
          // console.log('Longtitude',response[0].lon);
          // console.log('Latitude',response[0].lat);
          // console.log('Name',response[0].display_name);

          let newLocation = {
            name: response[0].display_name,
            longitude: response[0].lon,
            latitude: response[0].lat
          };

          // console.log(newLocation);
          mapData.push(newLocation);
          // console.log("inside",mapData);
          // res.json(mapData);
        })
        .catch((error) => {
          console.log(error);
        });
      } // end of FOR

      setTimeout(function(){res.json(mapData)},5000);
      // setTimeout(function(){console.log("outside",mapData)},5002);
      // console.log("outside",mapData);

    }); // end of CONNECTION.QUERY
  }); // end of POOL GETCONNECTION
}); // end of '/addHotspot'

router.get('/getCoordinates', function(req, res, next) {
  // console.log('--GETCOORDINATES--');
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    geocodingClient.reverseGeocode({
      query: [-95.4431142, 33.6875431]
    })
    .send()
    .then(response => {
      // GeoJSON document with geocoding matches
      const match = response.body;
    });
  });
});

//
// app.use(express.urlencoded({ extended: false }));

let users = {
  test: 'password',
  test2: 'p2'
};

router.post('/checkEmail',function(req,res,next) {

  req.pool.getConnection(function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM Users WHERE Email = ?";

    connection.query(query, [req.body.Email], function(err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(404);
        return;
      }
      res.json(rows);
    });

  });
});

router.post('/register', function(req, res, next)  {

  // Connect to database


  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "INSERT INTO Addresses (Street_Address, Suburb_Town, State, Country) VALUES (?,?,?,?);";



    connection.query(query, [req.body.Street, req.body.Suburb, req.body.State, req.body.Country], function(err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(404);
        return;
      }
    });



  });


  var isUser = true;
  if (req.body.DOB == undefined) {
    isUser = false;
  }


  bcrypt.hash(req.body.pass, 11, (err, hash) => {
    if (err) {
      console.error(err);
      return;
    }


    req.pool.getConnection(function(err, connection) {




      if (isUser == true) {
        var userquery = "INSERT INTO Users (Given_name, Family_name, Address, Phone, Email, DOB, Role, Password) VALUES (?,?,(SELECT id FROM Addresses WHERE Street_Address = ? ORDER BY id LIMIT 1),?,?,?,'1',?);";
        connection.query(userquery, [req.body.firstName, req.body.lastName, req.body.Street, req.body.Phone, req.body.Email,req.body.DOB,hash], function(err, rows, fields) {
          connection.release();
          if (err) {
            res.sendStatus(502);
            return;
          }
          res.end();
        });
      }
      else if (isUser == false && req.body.venue != undefined) {
        var managerquery = "INSERT INTO Users (Given_name, Family_name, Phone, Email, Role, Password) VALUES (?,?,?,?,'2',?);";
        connection.query(managerquery, [req.body.firstName, req.body.lastName, req.body.Phone, req.body.Email,hash], function(err, rows, fields) {
          connection.release();
          if (err) {
            res.sendStatus(500);
            return;
          }
        });

        req.pool.getConnection(function(err, connection) {
          var venuequery = "INSERT INTO Venue (Venue_Name,Owner, isHotspot, Address) VALUES (?,(SELECT id FROM Users WHERE Email = ?),'0',(SELECT id FROM Addresses WHERE Street_Address = ? ORDER BY id LIMIT 1));";
          connection.query(venuequery, [req.body.venue,req.body.Email,req.body.Street], function(err, rows, fields) {
            connection.release();
            if (err) {
              res.sendStatus(501);
              return;
            }
            res.end();
          });
        });
      }
      else if (isUser == false && req.body.venue == undefined) {
        var healthquery = "INSERT INTO Users (Given_name, Family_name, Phone, Email, Role, Password) VALUES (?,?,?,?,'3',?);";
        connection.query(healthquery, [req.body.firstName, req.body.lastName, req.body.Phone, req.body.Email,hash], function(err, rows, fields) {
          connection.release();
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
      }
    });
  });






});



// router.post('/login', function(req, res, next) {
//   console.log(req.body);

//   var username = req.body.username;

//   req.pool.getConnection(function(err, connection) {
//     if (err) {
//       res.sendStatus(500);
//       return;
//     }

//     var query = "SELECT Password FROM Users WHERE Users.Email = ?";
//     connection.query(query, username, function(err, rows, fields) {
//       connection.release();
//       if (err) {
//         res.sendStatus(500);
//         return;
//       }

//       bcrypt.compare(req.body.password, rows[0].Password, (err, isMatch) => {
//         if (err) {
//           console.error(err);
//           return;
//         }
//         res.send(isMatch);
//         // if (isMatch) {
//         //   alert("Logged in");
//         // } else {
//         //   console.log("Unable to log in");
//         // }

//         // console.log(isMatch);
//       });
//     });
//   });




// });

router.get('/getHotspots',function(req,res,next) {
  //connect
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(501);
      return;
    }

    var query = "SELECT id, Venue_Name FROM Venue WHERE isHotspot = 1;";


    //SELECT Venue_Name, Addresses.Street_Address, Addresses.Suburb_Town, Addresses.State FROM Venue INNER JOIN Addresses WHERE Address.id = Venue.Address AND Venue.isHotspot = 0;



    connection.query(query, function(err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(404);
        return;
      }
      res.json(rows);
    });



  });
});

router.post('/createHotspot',function(req,res,next) {

  // req.pool.getConnection(function(err, connection) {
  //   if (err) {
  //     res.sendStatus(500);
  //     return;
  //   }

  //   // var query = "INSERT INTO Venue (Venue_Name,Owner, isHotspot, Address) VALUES (?,(SELECT id FROM Users WHERE Email = ?),'0',(SELECT id FROM Addresses WHERE Street_Address = ? ORDER BY id LIMIT 1));";
  //   var addquery = "SELECT id FROM Addresses WHERE Street_Address = ?";
  //   //SELECT Venue_Name, Addresses.Street_Address, Addresses.Suburb_Town, Addresses.State FROM Venue INNER JOIN Addresses WHERE Address.id = Venue.Address AND Venue.isHotspot = 0;



  //   connection.query(addquery,[req.body.Street], function(err, rows, fields) {
  //     connection.release();
  //     if (err) {
  //       res.sendStatus(404);
  //       return;
  //     }
  //     if (rows.length > 0) {
  //       res.send("Venue already in database, Please modify venue 'isHotspot' value");
  //       res.end();
  //     }
  // });
  // return 0;
  // });




  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    // var query = "INSERT INTO Venue (Venue_Name,Owner, isHotspot, Address) VALUES (?,(SELECT id FROM Users WHERE Email = ?),'0',(SELECT id FROM Addresses WHERE Street_Address = ? ORDER BY id LIMIT 1));";
    var addquery = "INSERT INTO Addresses (Street_Address, Suburb_Town, State, Country) VALUES (?,?,?,?);";
    //SELECT Venue_Name, Addresses.Street_Address, Addresses.Suburb_Town, Addresses.State FROM Venue INNER JOIN Addresses WHERE Address.id = Venue.Address AND Venue.isHotspot = 0;



    connection.query(addquery,[req.body.Street, req.body.Suburb, req.body.State, req.body.Country], function(err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(404);
        return;
      }
    });



  });

  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(501);
      return;
    }

    geocoder.search( { q: req.body.Street + ',' + req.body.Suburb + ',' + req.body.Country } )
      .then((response) => {
        console.log('Longtitude',response[0].lon);
        console.log('Latitude',response[0].lat);
        //addHotspot(response[0].lon,response[0].lat, response[0].display_name);
        //store in db
        var hotquery = "INSERT INTO Venue (Venue_Name, Address,isHotspot,Start_Date,End_Date,Longitute,Latitude) VALUES (?,(SELECT id FROM Addresses WHERE Street_Address = ? ORDER BY id LIMIT 1),'1',?,?,?,?);";



        connection.query(hotquery,[req.body.Name, req.body.Street,req.body.Start,req.body.End,response[0].lon,response[0].lat], function(err, rows, fields) {
          connection.release();
          if (err) {
            res.sendStatus(404);
            return;
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });


    res.end();



  });





});

router.post('/deleteHotspot',function(req,res,next) {

  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    // var query = "INSERT INTO Venue (Venue_Name,Owner, isHotspot, Address) VALUES (?,(SELECT id FROM Users WHERE Email = ?),'0',(SELECT id FROM Addresses WHERE Street_Address = ? ORDER BY id LIMIT 1));";
    var delquery = "UPDATE Venue SET isHotspot = 0 WHERE id = ?";
    //SELECT Venue_Name, Addresses.Street_Address, Addresses.Suburb_Town, Addresses.State FROM Venue INNER JOIN Addresses WHERE Address.id = Venue.Address AND Venue.isHotspot = 0;


    console.log(req.body.venueid);
    connection.query(delquery,[req.body.venueid], function(err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(404);
        return;
      }
    });



  });
});



module.exports = router;