var GameClient = Game.extend({

	init: function(now) {
		var self = this;
		self._super();

		self.now = now;
		self.now.playerMoved = self.playerMoved;
		self.now.playerJoined = self.playerJoined;
		self.now.setPlayer = self.setPlayer;

		self.canvas = document.getElementById('myCanvas');
		self.ctx    = self.canvas.getContext('2d');
		self.board  = new Board(self.ctx);

		self.canvas.addEventListener("click", function(e) {
			self.onClick(e);
		}, false);
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

		now.requestMove(now.core.clientId, this.player, this.board.getLocation(mouseX, mouseY));
	},

	move: function(player, location) {
		this._super(player, location);

		this.moves[location] = player;
		this.board.drawMove(player, location);

		now.move = location;
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

	setPlayer: function(player) {
		console.log("You are player " + player);
		client.player = player;
	}
});

$(document).ready(function() {
	client = new GameClient(now);
});