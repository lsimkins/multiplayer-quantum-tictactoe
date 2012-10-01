var Game = Class.extend({
	wins: [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,8],
		[1,4,7],
		[2,5,8],
		[0,4,8]
	],

	moves : [],

	init: function () {
		// Initialize the game.
		this.moves = [];
		for (i=0; i<9; i++) {
			this.moves[i] = i;
		}

		this.board = new Board();
	},

	move: function(player, location) {
		this.moves[location] = player;
		this.board.drawMove(player, location);

		var winner = this.hasWinner();
		if (winner) {
			console.log("We have a winner");
		}
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

var game = new Game();