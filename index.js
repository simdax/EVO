// var express, app, http, io;

(function() {
  'use strict';

  var Hexagon = require('./src/game/Hexagon');
  var tools = require('./src/game/Tools');

  var express, app, http, io;

  function Game() {
    this.map = {};
    this.players = {};

  }


  Game.prototype.registerPlayer = function(socket, player) {
    player.socket = socket;
    this.players[socket.id] = player;
  };

  Game.prototype.removePlayer = function(socket) {
    delete this.players[socket.id];
  };

  Game.prototype.broadcastPlayersList = function() {
    var pId, playersName = [];
    for (pId in this.players) {
      playersName.push(this.players[pId].name);
    }

    for (pId in this.players) {
      this.players[pId].socket.emit('players-list', playersName);
    }
  };


  Game.prototype.initMap = function() {
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


    io.on('connection', function(socket) {
      console.log('user connected', socket.id);

      socket.on('disconnect', function() {
        console.log('user disconnect');
        game.removePlayer(socket);
      });

      socket.on('register-player', function(player, callback) {
        game.registerPlayer(socket, player);
        game.broadcastPlayersList();
        return callback && callback(null);
      });

      socket.on('get-game', function(callback) {
        return callback && callback(game);
      });
    });

  }

  setupExpress();


}());
