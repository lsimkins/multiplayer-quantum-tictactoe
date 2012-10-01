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
		var self = this;

		// Initialize the game.
		self.canvas = document.getElementById('myCanvas');
		self.ctx = self.canvas.getContext('2d');
		
		self.moves = [];
		for (i=0; i<9; i++) {
			self.moves[i] = i;
		}

		self.player = "o";

		self.canvas.addEventListener("click", function(e) {
			self.onClick(e);
		}, false);

		self.board = new Board(self.ctx);
	},

	onClick: function(e) {
		var mouseX, mouseY;

		if(e.offsetX) {
			mouseX = e.offsetX;
			mouseY = e.offsetY;
		}
		else if(e.layerX) {
			mouseX = e.layerX;
			mouseY = e.layerY;
		}

		this.move(this.player, this.board.getLocation(mouseX, mouseY));
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