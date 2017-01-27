// var express, app, http, io;

(function() {
  'use strict';

// here is all require
  var tools = require('./src/game/Tools');
  var PlayerRegister = require('./src/game/PlayerRegister');
  var Game= require('./src/game/Game');

  var express, app, http, io;


  //  global object that creates our server



/*setup express*/
  function setupExpress() {
    express = require('express');
    app = express();
    http = require('http').Server(app);
    io = require('socket.io')(http);
    io.set('transports', ['websocket']);

    /*is that necessary ?*/
    app.use(express.static('public'));

    http.listen(process.env.PORT || 3000, function() {
      console.log('listening on *:3000');
    });


/*init a map */
    var playerRegister = new PlayerRegister();
    var game=new Game();
    game.initMap();
    console.log(game.map);

/*on connect */
    io.on('connection', function(socket) {
      console.log('user connected', socket.id);

      socket.on('disconnect', function() {
        console.log('user disconnect');
        playerRegister.removePlayer(socket);
        playerRegister.broadcastPlayersList();
      });

      socket.on('register-player', function(player, callback) {
        playerRegister.registerPlayer(socket, player);
        playerRegister.broadcastPlayersList();
        return callback && callback(null);
      });

      socket.on('get-game', function(callback) {
        return callback && callback(game);
      });
    });

  }

  setupExpress();


}());
