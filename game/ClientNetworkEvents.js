var ClientNetworkEvents = {
	requestMove: function() {
		GameClient.clientId = clientId;
	},

	playerMoved: function(player, move) {
		client.move(player, move);
	}
};