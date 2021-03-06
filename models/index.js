'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}


// Add new models here
db['Availability'] = sequelize['import']('./Availability')
db['Delivery'] = sequelize['import']('./delivery-models/Delivery')
db['DeliveryStatus'] = sequelize['import']('./delivery-models/DeliveryStatus')
db['User'] = sequelize['import']('./User')


Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// sequelize.sync({ force: true })
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.loadFixtures = function(model, fixtures){
  // return a promise
  return model.bulkCreate(fixtures)
}

module.exports = db;
