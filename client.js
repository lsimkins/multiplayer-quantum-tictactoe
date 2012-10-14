var GameClient = Game.extend({
	MOVE_NONE : 0,
	MOVE_NOTSTARTED : 1,
	MOVE_STARTED : 2,

	init: function(now) {
		var self = this;
		self._super();

		self.now = now;

		self.now.playerMoved = self.playerMoved;
		self.now.playerJoined = self.playerJoined;
		self.now.setPlayer = self.setPlayer;

		self.moveState = this.MOVE_NONE;

		self.now.playerLeft = function() {
			self.reset();
		};
	},

	setupCanvas: function() {
		var self = this;

		self.canvas = document.getElementById('myCanvas');
		self.ctx    = self.canvas.getContext('2d');
		self.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		self.board  = new Board(self.ctx);

		self.canvas.addEventListener("click", function(e) {
			self.onClick(e);
		}, false);

		return this;
	},

	startGame: function() {
		if (this.player === 'x') {
			console.log("Game starting!");
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

		if (self.moveState == self.MOVE_NOTSTARTED) {
			self.moveState = self.MOVE_STARTED;
			self.move1 = loc;
			self.board.startMove(self.player, loc);
		} else {
			now.requestMove(now.core.clientId, self.player, self.move1, loc);
		}
	},

	move: function(player, location) {
		this._super(player, location);

		this.moves[location] = player;
		this.board.drawMove(player, location);

		now.move = location;
	},

	reset: function() {
		console.log("player disconnected, resetting game");

		this.setupCanvas();
		this.init(now);
	},

	echoId: function () {
		console.log(now.core.clientId);
	},

	requestMove: function() {
		client.clientId = clientId;
	},

	playerMoved: function(player, move) {
		client.move(player, move);
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
	}
});

$(document).ready(function() {
	client = new GameClient(now)
		.setupCanvas();
});