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
		self.superMoves = [];
		for (i=0; i<9; i++) {
			self.moves[i] = [];
		}

		self.playerTurn = 'x';
	},

	move: function(player, loc1, loc2) {
		if (this.playerTurn != player) {
			console.log("Player " + player + " cannot move, not their turn.");
			return false;
		}

		var move = {
			plr  : player,
			loc1 : loc1,
			loc2 : loc2
		};

		var moveNum = this.superMoves.push(move);

		move.num = moveNum;

		this.moves[loc1].push(move);
		this.moves[loc2].push(move);

		this.playerTurn = (this.playerTurn == 'x') ? 'o' : 'x';

		var collapse = this.hasCyclicEntanglement();
		
		var winner = this.hasWinner();
		if (winner) {
			console.log("We have a winner");
		}

		return true;
	},

	hasCyclicEntanglement: function() {
		var lastMove = this.superMoves[this.superMoves.length - 1];

		return this.locationsEntangled(lastMove.loc1, lastMove.loc2, lastMove);
	},

	locationsEntangled: function(loc1, loc2, exclude) {
		if (exclude === undefined) {
			exclude = false;
		}

		var nextLoc, mv,
			moves1 = this.moves[loc1],
			numLocMoves = moves1.length,
			isEntangled = false;

		if (numLocMoves > 1) {
			for (var i; i<numLocMoves; i++) {
				mv = moves1[i];
				
				if (exclude && exclude.num == mv.num) {
					continue;
				}

				if (mv.loc1 === loc2 || mv.loc2 === loc2) {
					isEntangled = true;
					break;
				}

				nextLoc = (mv.loc1 == loc1) ? mv.loc2 : mv.loc1;

				isEntangled = this.locationsEntangled(nextLoc, loc2);
			}
		}

		return isEntangled;
	},

	isLocCyclic: function(loc) {
		var move, locMoves = this.moves[loc];
		for (i = 0; i < locMoves.length; i++) {
			move = moves[i];
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

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Game; }