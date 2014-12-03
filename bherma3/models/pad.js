"use strict";

module.exports = function(sequelize, DataTypes) {
  var Pad = sequelize.define("Pad", {
    name: DataTypes.STRING,
    turn: DataTypes.STRING
  });
  return Pad;
};

