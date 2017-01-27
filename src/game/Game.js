(function () {
  'use strict'

  //var Hexagon = require('./src/game/Hexagon');

/*cconstructor*/
  var Game = function () {
  this.map = {};
  }


/*here begins logic*/
  Game.prototype.initMap = function() {
    console.log("salut mec, je créé une grosse map de porc");
    // this.map = [new Hexagon(0, 0), new Hexagon(1, 0), new Hexagon(2, 0)];
  };


  module.exports = Game;

}())
