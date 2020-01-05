const connection = require("../config/connection.js");


// Object for all our SQL statement functions.
var orm = {
    // selectAll() 
    selectAll: function(tableName, cb) {
      var queryString = "SELECT * FROM " + tableName + ";";
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },

    // insertOne() 
    insertOne: function(table, columns, values, cb) {
      var queryString = `INSERT INTO ${table} (...${columns}) VALUES (...${values})`;  
      console.log(queryString);
  
      connection.query(queryString, values, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },

    // updateOne()
    updateOne: function(table, colVals, condition, cb) {

      colVals = objToSql(colVals);
      var queryString = `UPDATE ${table} SET ${colVals} WHERE ${condition}`;
  
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    }
};

function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}


// Export the ORM object in module.exports.
module.exports = orm;
