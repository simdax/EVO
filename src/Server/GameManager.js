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

  var Game=function () {
    this.id= Math.random() // temp ID
  }// io

  function GameManager (){
      this.games=[]
  }
  GameManager.prototype={
    searchID:function (id) {
      this.games.forEach((game)=>{if(game.id==id){return game} })
    },
    assignGame:function (id,player,role) {
      player.game=this.searchID(id);
      player.role=role
    },
    createGame:function (player) {
      var game=new Game(player)
      this.games.push(game);
      // yes using id for refinding game with it is absurd, but more explicit ?
      //this.assignGame(game.id,player,"master")
      return game.id
    },
  }
  module.exports = GameManager

  }())
