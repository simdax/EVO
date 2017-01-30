/*
 ██████   █████  ███    ███ ███████ ███    ███  █████  ███    ██  █████   ██████  ███████ ██████
██       ██   ██ ████  ████ ██      ████  ████ ██   ██ ████   ██ ██   ██ ██       ██      ██   ██
██   ███ ███████ ██ ████ ██ █████   ██ ████ ██ ███████ ██ ██  ██ ███████ ██   ███ █████   ██████
██    ██ ██   ██ ██  ██  ██ ██      ██  ██  ██ ██   ██ ██  ██ ██ ██   ██ ██    ██ ██      ██   ██
 ██████  ██   ██ ██      ██ ███████ ██      ██ ██   ██ ██   ████ ██   ██  ██████  ███████ ██   ██

 a dictionary for handling player requests and game assignments
*/

(function(){
  'use strict'

  var Game=function (id,name,owner) {
    this.id= id;
    this.name= name;
    this.owner= owner;
    // for map generation
    this.seed=0;
    //nb joueurs 
    this.players=-1;
  }

  function GameManager (){
      this.games={}
  }
  GameManager.prototype={
    getGames:function () {
        var res=[];
        for(var id in this.games){res.push(this.games[id])}
          //console.log(res);
        return res;
    },
    createGame:function (playerID,name,playerName) {
      var game=new Game(playerID,name,playerName)
      this.games[playerID]=game;
      return game;
    },
    deleteGame:function (playerID) {
      delete this.games[playerID]
    },
  }
  module.exports = GameManager

  }())
