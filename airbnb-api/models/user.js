var connection = require("../database/database");

//User object constructor
var User = function(user) {
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.email = user.email;
  this.password = user.password;
};

User.createUser = (newUser, result) => {
    connection.query("INSERT INTO users set ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
};

User.getAllUsers = (result) => {
    connection.query("select * from users", (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


User.getAllProperties = (result) => {
  connection.query("SELECT * FROM properties", (err, res) => {
    if(err) {
      console.log("error: ", err)
      result(err, null);
    } else {
      result(null, res);
    }
  })
}

//searches for a given email in the db
User.getIdByEmail = (email, result) => {
    connection.query("SELECT id from users WHERE email = ?", email, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

User.getPasswordByEmail = (email, result) => {
  connection.query("SELECT password from users WHERE email = ?", email, (err, res) => {
      if(err) {
          console.log("error: ", err);
          result(err, null);
      } else {
          console.log(res);
          result(null, res);
      }
  })
}

User.getIdByPassword = (password, result) => {
    connection.query("SELECT id FROM users WHERE password = ?", password, (err, res) => {
      if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

User.findUserByName = (userName, result) => {
    connection.query("Select * from user where name = ?", userName, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        } else {
        console.log(res);
        result(null, res);
        }
    });
};

User.getUserById = (userId, result) => {
    connection.query("Select * from user where id = ? ", userId, (err,res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };

User.updateUserById = (userId, user, result) => {
  connection.query(
    "UPDATE user SET user = ? WHERE id = ?",
    [user, userId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
}; 

User.removeUser = (userId, result) => {
  connection.query("DELETE FROM user WHERE id = ?", userId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

//NOT WORKING
User.getUserByRole = (userRole, result) => {
  connection.query("SELECT FROM user WHERE role = ?", userRole.toString(), (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;