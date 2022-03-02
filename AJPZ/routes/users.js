var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const Nominatim = require('nominatim-geocoder');
const geocoder = new Nominatim();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
//   console.log(req.body);

  var username = req.body.user;

  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(501);
      return;
    }

    var query = "SELECT Password FROM Users WHERE Users.Email = ?";
    connection.query(query, username, function(err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(502);
        return;
      }

      bcrypt.compare(req.body.pass, rows[0].Password, (err, isMatch) => {
        if (err) {
          console.error(err);
          return;
        }
        if (isMatch) {
            req.pool.getConnection(function(err,connection){
            if(err) {
                console.log(err);
                res.sendStatus(503);
                return;
            }
            var query = 'SELECT id, Role FROM Users WHERE Email=? ';
            connection.query(query,[req.body.user],function(err,rows,fields){
                connection.release();
                if(err) {
                    console.log(err);
                    res.sendStatus(504);
                    return;
                }
                if(rows.length > 0) {
                    req.session.user = rows[0].id;
                    res.json(rows);
                }
                else {
                    res.sendStatus(401);
                }
            });
        });
        }
        else {
            res.send("Invalid Login");
        }
        // if (isMatch) {
        //   alert("Logged in");
        // } else {
        //   console.log("Unable to log in");
        // }

        // console.log(isMatch);
      });
    });
  });
});


router.use(function(req,res,next){
   if('user' in req.session){
      next();
   }
   else
   {
       res.sendStatus(401);
   }
});

router.post('/logout', function(req,res,next){
    delete req.session.user;
    res.send();
});

router.get('/getUserInfo', function(req,res,next) {
    req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(501);
      return;
    }

    var query = "SELECT * FROM Users LEFT JOIN Addresses ON Users.Address = Addresses.id  UNION SELECT * FROM Users RIGHT JOIN Addresses ON Users.Address = Addresses.id WHERE Users.id = ?";
    // var query = "SELECT * FROM Users UNION SELECT * FROM Addresses ON Address.id = Users.Address WHERE Users.id = ?";

    console.log(req.session.user);
    connection.query(query, [req.session.user], function(err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(404);
        return;
      }
      console.log(rows);
      res.json(rows);
     });
    });
});

router.get('/getVenueInfo1', function(req,res,next) {
    req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(501);
      return;
    }
    var query = "select * from Users INNER JOIN Venue ON Users.id=Venue.Owner WHERE Users.id=?;";
    console.log(req.session.user);
    connection.query(query, [req.session.user], function(err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(404);
        return;
      }
      console.log(rows);
      res.json(rows);
     });
    });
});

router.get('/getVenueInfo2', function(req,res,next) {
    req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(501);
      return;
    }
    var query = "select * from Venue INNER JOIN Addresses ON Venue.Address=Addresses.id WHERE Venue.Owner=?;";
    console.log(req.session.user);
    connection.query(query, [req.session.user], function(err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(404);
        return;
      }
      console.log(rows);
      res.json(rows);
     });
    });
});

router.get('/getHistory', function(req,res,next) {
    req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(501);
      return;
    }
    var query = "SELECT Given_name, Family_name FROM Users INNER JOIN Check_In ON Users.id=Check_In.User_id INNER JOIN Venue ON Check_In.Venue=Venue.id  WHERE Venue.Owner=?;";
    console.log(req.session.user);
    connection.query(query, [req.session.user], function(err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(404);
        return;
      }
      console.log(rows);
      res.json(rows);
     });
    });
});

router.get('/getUserHistory', function(req,res,next) {
    req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(501);
      return;
    }
    var query = "select Venue_name, Check_In.TimeStamp FROM  Venue INNER JOIN Check_In ON Venue.id=Check_In.Venue WHERE Check_In.User_id=?;";
    console.log(req.session.user);
    connection.query(query, [req.session.user], function(err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(404);
        return;
      }
      console.log(rows);
      res.json(rows);
     });
    });
});

// router.post('/checkIn', function(req,res,next) {
//   req.pool.getConnection(function(err, connection) {
//     if (err) {
//       res.sendStatus(501);
//       return;
//     }

//     var date = new Date();

//     var query = "INSERT INTO Check_In (User_id, Venue, TimeStamp) VALUES (?,(SELECT id FROM Venue WHERE id = ?),?);";
//     console.log(req.session.user);
//     connection.query(query, [req.session.user,req.body.venue,date], function(err, rows, fields) {
//       connection.release();
//       if (err) {
//         res.sendStatus(404);
//         return;
//       }
//       console.log(rows);
//       res.json(rows);
//     });
//     });
// });

router.post('/checkIn', function(req,res,next) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(501);
      return;
    }

    var date = new Date();

    var query = "INSERT INTO Check_In (User_id, Venue, TimeStamp) VALUES (?,(SELECT id FROM Venue WHERE id = ?),?);";
    console.log(req.session.user);
    connection.query(query, [req.session.user,req.body.venue,date], function(err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(404);
        return;
      }
      console.log(rows);
      res.json(rows);
     });
    });
});

router.post('/saveChanges', function(req,res,next) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(501);
      return;
    }


    var query = "UPDATE Users SET Given_name = ?, Family_name = ?, DOB = ?, Email = ?, Phone = ? WHERE id = ?";
    //; UPDATE Addresses SET Street_Address = ?, Suburb_Town = ?, State = ?, Country = ? INNER JOIN Users ON Addresses.id = Users.Address WHERE Address.id = (SELECT Address FROM Users WHERE id = ?); COMMIT;";

    console.log(req.session.user);
    connection.query(query, [req.body.firstName,req.body.lastName,req.body.DOB, req.body.Email,req.body.Phone,req.session.user], function(err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(404);
        return;
      }
      res.end();
     });
    });

    req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(501);
      return;
    }


    var addquery = "UPDATE Addresses SET Street_Address = ?, Suburb_Town = ?, State = ?, Country = ? INNER JOIN Users ON Addresses.id = Users.Address WHERE Address.id = (SELECT Address FROM Users WHERE id = ?);";

    console.log(req.session.user);
    connection.query(addquery, [req.body.Street,req.body.Suburb,req.body.State, req.body.Country,req.session.user], function(err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(404);
        return;
      }
      console.log(rows);
      res.json(rows);
     });
    });
});

router.post('/getHotspotHistory', function(req,res,next) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(501);
      return;
    }


    var query = "SELECT * From Check_In INNER JOIN Venue ON Venue.id = Check_In.Venue WHERE Check_In.User_id = ? AND Venue.isHotspot = 1";
    //; UPDATE Addresses SET Street_Address = ?, Suburb_Town = ?, State = ?, Country = ? INNER JOIN Users ON Addresses.id = Users.Address WHERE Address.id = (SELECT Address FROM Users WHERE id = ?); COMMIT;";

    console.log(req.session.user);
    connection.query(query, [req.session.user], function(err, rows, fields) {
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
