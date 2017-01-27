(function () {
  'use strict'

  var Hexagon = require('./Hexagon');

/*cconstructor*/
  var Game = function () {
  this.map = {};
  }


/*here begins logic*/
  Game.prototype.initMap = function() {
     this.map = [new Hexagon(0, 0), new Hexagon(1, 0), new Hexagon(2, 0)];
  };


  module.exports = Game;

}())
