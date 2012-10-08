var Class = require('../class.js');
var Game  = require('./serverGame.js');

var GameManager = Class.extend({
  init: function(nowjs) {
    this.nowjs = nowjs;
    this.players = [];
    this.gamesPending = [];
    this.games = {};
  },

  playerConnected: function (clientId) {
    var game;
    if (this.gamesPending[0] !== undefined) {
      console.log('Adding player to existing game');

      game = this.gamesPending[0];

      game.addPlayer(clientId);
      if (game.isReady) {
        game.start();
        this.gamesPending.splice(0, 1);
      }
    } else {
      console.log('Creating new game for player');

      group = this.nowjs.getGroup(Math.random().toString(36));
      game = new Game(this.nowjs, group);
      game.addPlayer(clientId);
      this.gamesPending.push(game);
    }

    this.games[game.gameId] = game;

    this.players[clientId] = game.groupId;
  },

  playerDisconnected: function(clientId) {
    var game = this.games[this.players[clientId]];

    var gameStarted = game.isStarted;

    game.playerLeft(clientId);

    if (gameStarted) {
      this.gamesPending.push(game);
    }
  }
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = GameManager; }