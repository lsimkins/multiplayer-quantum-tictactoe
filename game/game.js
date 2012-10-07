var Game = Class.extend({
	wins: [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
	],

	init: function () {
		var self = this;

		// Initialize the game.
		self.moves = [];
		for (i=0; i<9; i++) {
			self.moves[i] = i;
		}

		self.playerTurn = 'x';
	},

	move: function(player, location) {
		if (this.playerTurn != player) {
			console.log("Player " + player + "cannot move, not their turn.");
			return false;
		}

		this.moves[location] = player;

		this.playerTurn = (this.playerTurn == 'x') ? 'o' : 'x';

		var winner = this.hasWinner();
		if (winner) {
			console.log("We have a winner");
		}

		return true;
	},

	hasWinner: function() {
		var player, set, i, winner = false;
		for (i=0; i<this.wins.length; i++) {
			set = this.wins[i];

			if (this.moves[set[0]] === this.moves[set[1]] && this.moves[set[0]] === this.moves[set[2]]) {
				console.log('winner');
				winner = this.moves[set[0]];
				break;
			}
		}

		if (winner) {
			this.triggerWin(winner);
		}
	},

	triggerWin: function(winner) {
		console.log("We have a winner! " + winner);
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Game; }