const orm = require("../config/orm.js");

const burger = {
    selectAll: function(cb) {
      orm.selectAll("burgers", function(res) {
        cb(res);
      });
    },
    // The variables cols and vals are arrays.
    insertOne: function(columns, values, cb) {
        orm.insertOne("burgers", columns, values, function(res) {
        cb(res);
      });
    },
    updateOne: function(colVals, condition, cb) {
      orm.updateOne("burgers", colVals, condition, function(res) {
        cb(res);
      });
    }
  };
  
  // Export the database functions for the controller (burgers_controller.js).
  module.exports = burger;