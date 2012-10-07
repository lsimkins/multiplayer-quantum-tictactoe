var Game = require('../game/game.js');

var ServerGame = Game.extend({
	init: function(nowjs, group) {
		this._super();
		this.group = group;
		this.nowjs = nowjs;
		this.players = {x: false, o: false};
		this.ready = false;
	},

	addPlayer: function(clientId) {
		var plr,
			players = this.players,
			self = this;

		if (players.x === false) {
			plr = 'x';
		} else if (players.o === false) {
			plr = 'o';
		} else {
			console.log("Full of players, cannot add another!");
			return false;
		}

		players[plr] = clientId;
		self.group.addUser(clientId);

		self.nowjs.getClient(clientId, function() {
			this.now.setPlayer(plr);
			self.group.now.playerJoined(plr);

			if (players.x !== false && players.y !== false) {
				self.ready = true;
			}
		});

	},

	start: function () {
		var self = this;

		if (this.ready) {
			console.log('Game starting');
			this.group.now.requestMove = function(playerId, player, location) {
				self.movePlayer(playerId, player, location);
			};
		} else {
			console.log("Error: Cannot start game " + this.group.groupName + ", game not ready");
		}
	},

	movePlayer: function(playerId, player, location) {
		if (this.players[player] !== playerId) {
			console.log('Error: Player ' + playerId + ' cannot move ' + player);
			return false;
		}

		console.log("moving " + player + " to " + location);
		var moveSuccessful = this.move(player, location);

		if (moveSuccessful) {
			this.group.now.playerMoved(player, location);
		}
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = ServerGame; }