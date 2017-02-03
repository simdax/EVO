

// var express, app, http, io;

(function() {
    'use strict';
    var User = require('./src/Main');

    // here is all require

    var express, app, http, io;


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


        /*this init all On Function of our incoming socket */

        io.on('connection', function (socket) {
            console.log('new connection');
            new User(socket,io);
        })

        // test ??


    }

    setupExpress();

    // var mongo=require('./mongo/test')
    // Use connect method to connect to the server
 
}());
