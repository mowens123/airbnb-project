var connection = require("../database/database");

var Booking = function(booking) {
    this.firstname = booking.firstname;
    this.lastname = booking.lastname;
    this.email = booking.email;
    this.password = booking.password;
  };

Booking.createBooking = (newBooking, result) => {
  connection.query("INSERT INTO bookings set ?", newBooking, (err, res) => {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Booking.deleteBooking = (bookingID, result) => {
  connection.query("DELETE FROM bookings WHERE id = ?", bookingID, (err, res) => {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

Booking.getAllBookings = (result) => {
  connection.query("select * from bookings", (err, res) => {
      if (err) {
          console.log("error: ", err)
          result(err, null);
      } else {
          result(null, res);
      }
  });
};

//NOT WORKING
Booking.getBookingsByPropIDAndStatus = (propertyID, status, result) => {
  connection.query('SELECT * FROM bookings WHERE propertyID = ? AND status = ?', [propertyID, status], (err, res) => {
      if (err) {
          console.log("error: ", err)
          result(err, null);
      } else {
          result(null, res);
      }
  });
};

Booking.getBookingsByBookingIDAndStatus = (userID, status, result) => {
  connection.query('SELECT * FROM bookings WHERE userID = ? AND status = ?', [userID, status], (err, res) => {
      if (err) {
          console.log("error: ", err)
          result(err, null);
      } else {
          result(null, res);
      }
  });
};

Booking.getBookingsByDates = (dateStart, dateEnd, result) => {
  connection.query('SELECT * FROM bookings WHERE dateStart = ? AND dateEnd = ?', [dateStart, dateEnd], (err, res) => {
      if (err) {
          console.log("error: ", err)
          result(err, null);
      } else {
          result(null, res);
      }
  });
};

Booking.updateBooking = (booking, result) => {
  connection.query("UPDATE bookings SET propertyID = ?, userID = ?, hostID = ?, status = ?, dateStart = ?, dateEnd = ? WHERE id = ?", 
                     [booking.propertyID, booking.userID, booking.hostID, booking.status, booking.dateStart, booking.dateEnd, booking.id], 
                     (err, res) => {
                         if(err) {
                             console.log("error: ", err);
                             result(err, null);
                         } else {
                             result(null, res);
                             }
                     });
}


module.exports = Booking;