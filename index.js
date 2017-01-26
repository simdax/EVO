// var express, app, http, io;

(function() {
  'use strict';

  var Hexagon = require('./src/game/Hexagon');
  var tools = require('./src/game/tools');

  var express, app, http, io;

  function Game() {
    this.map = {};
  }

  Game.prototype.initMap = function() {


    // var gen = require('src/game/gen/generate');
    // gen.createHexs();
    this.map = [new Hexagon(0, 0), new Hexagon(1, 0), new Hexagon(2, 0)];
  };



  function setupExpress() {
    express = require('express');
    app = express();
    http = require('http').Server(app);
    io = require('socket.io')(http);
    io.set('transports', ['websocket']);

    app.use(express.static('public'));

    http.listen(process.env.PORT || 3000, function() {
      console.log('listening on *:3000');
    });


    var game = new Game();
    game.initMap();
    console.log(game.map);  

    // console.log(tools.add(1, 3));

    io.on('connection', function(socket) {
      console.log('user connecter');
      socket.on('get-game', function(callback) {
        return callback && callback(game);
      });
    });

  }

  setupExpress();


}());
