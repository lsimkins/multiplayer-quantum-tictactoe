var Class = require('../class.js');
var Game  = require('./serverGame.js');

var GameManager = Class.extend({
  init: function(nowjs) {
    this.nowjs = nowjs;
    this.players = [];
    this.gamesPending = [];
    this.gamesStarted = {};
  },

  playerConnected: function (clientId) {
    var game;
    if (this.gamesPending[0] !== undefined) {
      console.log('Adding player to existing game');

      game = this.gamesPending.splice(0, 1);
      game = game[0];

      game.addPlayer(clientId);
      game.start();
      this.gamesStarted[game.gameId] = game;
    } else {
      console.log('Creating new game for player');

      group = this.nowjs.getGroup(Math.random().toString(36));
      game = new Game(this.nowjs, group);
      game.addPlayer(clientId);
      this.gamesPending.push(game);
    }

    this.players[clientId] = game.groupId;
  }
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = GameManager; }