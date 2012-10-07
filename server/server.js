var fs = require('fs');

var GameManager = new require('./gameManager.js');

var server = require('http').createServer(function(req, response){
  fs.readFile(__dirname+'/../game/game.html', function(err, data){
    response.writeHead(200, {'Content-Type':'text/html'});
    response.write(data);
    response.end();
  });
});
server.listen(8080);

var nowjs = require("now");
var everyone = nowjs.initialize(server);
var gm = new GameManager(nowjs);

nowjs.on("connect", function() {
  gm.playerConnected(this.user.clientId);
});

nowjs.on("disconnect", function(){
  console.log("Left: " + this.user.clientId);
  //gm.playerDisconnect(this.user.clientId);
});

/*everyone.now.requestMove = function(player, move) {
  everyone.now.playerMoved(players[this.user.clientId], move);
};

everyone.now.distributeMessage = function(message){
  everyone.now.receiveMessage(this.now.name, message);
};*/