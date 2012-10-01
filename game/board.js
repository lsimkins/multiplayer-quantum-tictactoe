var Board = Class.extend({
	width: 500,
	gutter: 20,
	locations: {
		0 : [0,0],
		1 : [1,0],
		2 : [2,0],
		3 : [0,1],
		4 : [1,1],
		5 : [2,1],
		6 : [0,2],
		7 : [1,2],
		8 : [2,2]
	},

	init: function() {
		this.canvas = document.getElementById('myCanvas');
		this.ctx = this.canvas.getContext('2d');

		this.sectionWidth = this.width/3;
		this.drawGameBoard(this.ctx);
	},

	drawGameBoard: function (ctx) {
		var sectionWidth = this.sectionWidth;
		var gutter = this.gutter;

		ctx.beginPath();
		ctx.strokeStyle = '#ff0000';
		ctx.lineCap = 'round';
		ctx.lineWidth = 15;

		ctx.moveTo(gutter, sectionWidth + gutter);
		ctx.lineTo(this.width + gutter, sectionWidth + gutter);
		ctx.stroke();

		ctx.moveTo(gutter, sectionWidth * 2 + gutter);
		ctx.lineTo(this.width + gutter, sectionWidth * 2 + gutter);
		ctx.stroke();

		ctx.moveTo(sectionWidth + gutter, gutter);
		ctx.lineTo(sectionWidth + gutter, this.width + gutter);
		ctx.stroke();

		ctx.moveTo(sectionWidth * 2 + gutter, + gutter);
		ctx.lineTo(sectionWidth * 2 + gutter, this.width + gutter);
		ctx.stroke();
	},

	drawMove: function(player, loc) {
		var ctx = this.ctx;
		var drawLoc = this.locations[loc];
		var drawX = drawLoc[0] * this.sectionWidth; 
		var drawY = drawLoc[1] * this.sectionWidth;

		// 10% padding between boarder and move.
		var padding = this.sectionWidth * 0.10 + this.gutter;
		var drawWidth = this.sectionWidth * 0.8;

		ctx.strokeStyle = '#ff0000';
		ctx.lineCap = 'round';
		ctx.lineWidth = 15;

		if (player === 'x') {
			ctx.beginPath();
			ctx.moveTo(drawX + padding, drawY + padding);
			ctx.lineTo(drawX + drawWidth + padding, drawY + drawWidth + padding);
			ctx.moveTo(drawX + drawWidth + padding, drawY + padding);
			ctx.lineTo(drawX + padding, drawY + drawWidth + padding);
			ctx.stroke();
		} else {
			ctx.beginPath();
			ctx.arc(
				drawX + this.sectionWidth / 2 + this.gutter,
				drawY + this.sectionWidth / 2 + this.gutter,
				drawWidth / 2,
				0,
				2 * Math.PI,
				false
			);
			ctx.stroke();
		}
	}
});