const express = require('express');
var userService = require('./models/user');
var propertyService = require('./models/property');
var bookingService = require('./models/booking');

const app = express();

//Body Parser Middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Cross-Origin Middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Creating a path (action, endpoint)
app.get('/users', (req,res) => {
    userService.getAllUsers((db_err, db_res) => {
        if (db_err) {
            console.log("error from db: " + db_err);
            res.json('error connecting to db');
        } else {
            console.log(db_res);
            res.json(db_res);
        }
    });
});

app.post('/users', (req, res) => {
    console.log(req.body);
    var newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
    };
    userService.createUser(newUser, (db_err, db_res) => {
        if (db_err) {
            console.log("error from db: " + db_err);
            res.json('error connecting to db');
        } else {
            console.log(db_res);
            res.json(db_res);
        }
    })

});

//NOT WORKING
app.get('api/users/:role', (req, res) => {
    userService.getUserByRole(req.params.role, (db_err, db_res) => {
        if (db_err) {
            console.log("error from db: " + db_err);
            res.json('error connecting to db');
        } else {
            console.log(db_res);
            res.json(db_res);
        }
    })
});

//WORKING
app.post('/api/auth/register', (req,res) => {
    const userPostData = req.body;
    userService.getIdByEmail(userPostData.email, (db_err1, db_res1) => {
        if(db_err1) {
          console.log("error: " + db_err1);
          res.send(db_err1)
        } else {
            if (db_res1.length === 0) {
                userService.createUser(userPostData, (db_err2, db_res2) => {
                    if(db_err2) {
                        console.log("error from db: " + db_err2);
                        res.json('error connecting to db');
                     } else {
                        res.json(db_res2)
                    }
                });
            } else {
                res.status(400).send({error: "Email is already taken"});
            }
        }
    });
});

//WORKING
app.post('/login', (req, res) => {
    const userPostData = req.body;
    console.log('BODY: ' + userPostData.email);
    userService.getPasswordByEmail(userPostData.email, (err, db_res) => {
        if (err) {
            console.log("error: " + err);
            res.send(err);
        } else {
            console.log(db_res);
            if (db_res[0].password == userPostData.password) {
                res.send(db_res[0].password);
            } else {
                res.send(false);
            }
        }
    })
});
 
//NOT READING IN THE FUNCTIONS FROM THE PROPERTY MODEL
app.get('/api/properties', (req,res) => {
    propertyService.getAllProperties((db_err, db_res) => {
        if (db_err) {
            console.log("error from db: " + db_err);
            res.json('error connecting to db');
        } else {
            console.log(db_res);
            res.json(db_res);
        }
    });
});

//ONLY SENDING BACK AN EMPTY LIST
app.get('/api/properties/:userID', (req,res) => {
    console.log(req.params.userID);
    propertyService.getPropertyByHostID(req.param.userID, (db_err, db_res) => {
        if(db_err) {
            console.log("error from db: " + db_err);
            res.json('error connecting to db');
        } else {
            console.log(db_res);
            res.json(db_res)
        }
    })
});

//WORKING
app.post('/api/properties/add', (req, res) => {
    propertyService.createProperty(req.body, (db_err, db_res) => {
        if(db_err) {
            console.log("error from db: " + db_err);
            res.json('error connecting to db');
        } else {
            console.log(db_res);
            res.json(db_res)
        }
    })
});

//WORKING
app.post('/api/properties/delete/:propertyID', (req, res) => {
    propertyService.deleteProperty(req.params.propertyID, (db_err, db_res) => {
        if(db_err) {
            console.log("error from db: " + db_err);
            res.json('error connecting to db');
        } else {
            console.log(db_res);
            res.json(db_res)
        }
    })
});

//NOT SURE WHAT THIS IS SUPPOSED TO DO
app.post('/api/properties/update', (req, res) => {
    propertyService.updateProperty(req.body, (db_err, db_res) => {
        if(db_err) {
            console.log("error from db: " + db_err);
            res.json('error connecting to db');
        } else {
            console.log(db_res);
            res.json(db_res)
        }
    })
});

//WORKING
app.post('/api/bookings/add', (req, res) => {
    bookingService.createBooking(req.body, (db_err, db_res) => {
        if(db_err) {
            console.log("error from db: " + db_err);
            res.json('error connecting to db');
        } else {
            console.log(db_res);
            res.json(db_res)
        }
    })
});

app.post('/api/bookings/delete/:bookingID', (req, res) => {
    bookingService.deleteBooking(req.params.bookingID, (db_err, db_res) => {
        if(db_err) {
            console.log("error from db: " + db_err);
            res.json('error connecting to db');
        } else {
            console.log(db_res);
            res.json(db_res)
        }
    })
});

app.post('/api/bookings/update', (req, res) => {
    bookingService.updateBooking(req.body, (db_err, db_res) => {
        if(db_err) {
            console.log("error from db: " + db_err);
            res.json('error connecting to db');
        } else {
            console.log(db_res);
            res.json(db_res)
        }
    })
});

//WORKING
app.get('/api/bookings/', (req, res) => {
    bookingService.getAllBookings((db_err, db_res) => {
        if(db_err) {
            console.log("error from db: " + db_err);
            res.json('error connecting to db');
        } else {
            console.log(db_res);
            res.json(db_res)
        }
    })
});

//NOT WORKING
app.get('/api/bookings/property/:propertyID/:status', (req, res) => {
    bookingService.getBookingsByPropIDAndStatus(req.params.propertyID, req.params.status, (db_err, db_res) => {
        if(db_err) {
            console.log("error from db: " + db_err);
            res.json('error connecting to db');
        } else {
            console.log(db_res);
            res.json(db_res)
        }
    })
});

//NOT WORKING
app.get('/api/bookings/user/:userID/:status', (req, res) => {
    bookingService.getBookingsByUserIDAndStatus(req.params.userID, req.params.status, (db_err, db_res) => {
        if(db_err) {
            console.log("error from db: " + db_err);
            res.json('error connecting to db');
        } else {
            console.log(db_res);
            res.json(db_res)
        }
    })
});

app.get('/api/bookings/date/:startDate/:endDate', (req, res) => {
    bookingService.getBookingsByDates(req.params.startDate, req.params.endDate, (db_err, db_res) => {
        if(db_err) {
            console.log("error from db: " + db_err);
            res.json('error connecting to db');
        } else {
            console.log(db_res);
            res.json(db_res)
        }
    })
});


 
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
