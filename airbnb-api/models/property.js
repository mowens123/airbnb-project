var connection = require("../database/database");

var Property = function(property) {
    this.title = property.title;
    this.location = property.location;
    this.description = property.description;
    this.numberOfPeople = property.numberOfPeople;
    this.pricePerNight = property.pricePerNight;
    this.hostID = property.hostID;
};

Property.getAllProperties = (result) => {
    connection.query("SELECT * FROM properties", (err, res) => {
        if(err) {
            console.log("error: ", err)
            result(err, null);
        } else {
            result(null, res);
        }
    });
 }
 
 
 Property.getPropertyByHostID = (hostID, result) => {
    connection.query("SELECT * FROM properties WHERE hostID = '?'", hostID, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
 };
 
 Property.createProperty = (newProperty, result) => {
    connection.query("INSERT INTO properties set ?", newProperty, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
 };
 
 Property.deleteProperty = (propertyID, result) => {
    connection.query("DELETE FROM properties WHERE id = ?", propertyID, (err, res) => {
        if(err) {
            console.log("error: ", err);
        result(err, null);
        } else {
            result(null, res);
        }
    });
 };

 Property.updateProperty = (property, result) => {
     connection.query("UPDATE properties SET title = ?, location = ?, description = ?, numberOfPeople = ?, pricePerNight = ?, hostID = ? WHERE id = ?", 
                        [property.title, property.location, property.description, property.numberOfPeople, property.pricePerNight, property.hostID, property.id], 
                        (err, res) => {
                            if(err) {
                                console.log("error: ", err);
                                result(err, null);
                            } else {
                                result(null, res);
                                }
                        });
 }

 module.exports = Property;