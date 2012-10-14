var GameClient = Game.extend({
	MOVE_NONE : 0,
	MOVE_READY : 1,
	MOVE_STARTED : 2,

	init: function(now) {
		var self = this;
		self._super();

		self.now = now;

		self.now.playerMoved = self.playerMoved;
		self.now.playerJoined = self.playerJoined;
		self.now.setPlayer = self.setPlayer;
		self.now.startGame = function() {
			self.startGame();
		};

		self.moveState = this.MOVE_NONE;

		self.now.playerLeft = function() {
			self.reset();
		};
	},

	setupCanvas: function(initial) {
		var self = this;

		self.canvas = document.getElementById('myCanvas');
		self.ctx    = self.canvas.getContext('2d');
		self.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		self.board  = new Board(self.ctx);

		if (initial) {
			self.canvas.addEventListener("click", function(e) {
				self.onClick(e);
			}, false);
		}

		return this;
	},

	startGame: function() {
		console.log("Game starting!");
		if (this.player === 'x') {
			this.moveState = 1;
		}
	},

	onClick: function(e) {
		var mouseX, mouseY, self = this;

		if (self.moveState == self.MOVE_NONE) {
			console.log("It's not your turn!");
			return;
		}

		if(e.offsetX) {
			mouseX = e.offsetX;
			mouseY = e.offsetY;
		}
		else if(e.layerX) {
			mouseX = e.layerX;
			mouseY = e.layerY;
		}

		var loc = self.board.getLocation(mouseX, mouseY);

		if (this.moves[loc].length !== undefined && this.moves[loc].length < 9) {
			if (self.moveState == self.MOVE_READY) {
				console.log('Making move 1');
				self.moveState = self.MOVE_STARTED;
				self.move1 = loc;
				self.board.drawSmallMove(self.player, loc);
			} else if (self.move1 !== loc) {
				console.log('Making move 2');
				now.requestMove(now.core.clientId, self.player, self.move1, loc);
				self.moveState = self.MOVE_NONE;
			}
		} else {
			console.log('Cannot move there! Moves at that location are maxed out!');
		}
	},

	move: function(player, loc1, loc2) {
		this._super(player, loc1, loc2);

		this.moves[location] = player;
		this.board.drawSmallMove(player, loc2);

		if (player != this.player) {
			this.board.drawSmallMove(player, loc1);
			this.moveState = this.MOVE_READY;
		}
	},

	reset: function() {
		console.log("player disconnected, resetting game");

		this.setupCanvas(false);
		this.init(now);
	},

	echoId: function () {
		console.log(now.core.clientId);
	},

	requestMove: function() {
		client.clientId = clientId;
	},

	playerMoved: function(player, loc1, loc2) {
		client.move(player, loc1, loc2);
	},

	playerJoined: function(player) {
		if (player !== client.player) {
			console.log(player + " joined!");
		}
	},

	playerLeft: function() {
		this.reset();
	},

	setPlayer: function(player) {
		console.log("You are player " + player);
		client.player = player;
	},

	rejectRequest: function(type, data) {
		console.log('Server rejected request with data: ' + data);
	}
});

$(document).ready(function() {
	client = new GameClient(now)
		.setupCanvas(true);
});