// var express, app, http, io;

(function() {
  'use strict';

  var express, app, http, io;


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

    // io.on('connection', function(s) {});

  }

  setupExpress();


}());
