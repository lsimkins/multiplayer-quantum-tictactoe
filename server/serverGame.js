var Game = require('../game/game.js');

var ServerGame = Game.extend({
	init: function(nowjs, group) {
		this._super();
		this.group = group;
		this.nowjs = nowjs;

		if (this.players === undefined) {
			this.players = {x: false, o: false};
		}

		this.isReady = false;
		this.isStarted = false;
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
				self.isReady = true;
			}
		});

	},

	start: function () {
		var self = this;

		if (this.isReady) {
			console.log('Game starting');
			self.isStarted = true;
			this.group.now.startGame();
			this.group.now.requestMove = function(playerId, player, loc1, loc2) {
				console.log(loc1); console.log(loc2);
				var success = self.movePlayer(playerId, player, loc1, loc2);
				if (!success) {
					this.now.rejectRequest('move', '[error data]');
				}
			};
		} else {
			console.log("Error: Cannot start game " + this.group.groupName + ", game not ready");
		}
	},

	movePlayer: function(playerId, player, loc1, loc2) {
		if (this.players[player] !== playerId) {
			console.log('Error: Player ' + playerId + ' cannot move ' + player);
			return false;
		}

		console.log("moving " + player + " to " + loc1 + ' and ' + loc2);
		var moveSuccessful = this.move(player, loc1, loc2);

		if (moveSuccessful) {
			this.group.now.playerMoved(player, loc1, loc2);
		}

		return true;
	},

	playerLeft: function(playerId) {
		var players = this.players;

		if (players.x === playerId) {
			players.x = false;
		} else if (players.o === playerId) {
			players.o = false;
		} else {
			console.log("Error: player " + playerId + " is not a part of this game.");
			return false;
		}

		this.isReady = false;
		this.isStarted = false;

		this.group.now.playerLeft();

		this.init(this.nowjs, this.group);
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = ServerGame; }