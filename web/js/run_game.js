
// START GAME

console.log("Game.js got run!");

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

document.body.appendChild(canvas);
console.log("CTX is defined!");
canvas.width = 320;
canvas.height = 240;


// VARIABLES

// Character
var x = 320;
var y = 100;
var dir = 0;
var chSprite;
var inAir = true;
var vspeed = 0;

// View
var ViewX = 0;
var ViewY = 0;

// Room
var roomWidth = 640;
var roomHeight = 480;

// Keybaord input
var right = false;
var left = false;
var up = false;

//Double jumping variables
var jumpcounts = 0;

// Image loading & Animation
var framin = 0;
var frame = 0;
var loading = 0;


// INITIALIZE THE ROOM

// walls are solid objects
var walls = new Array();
function Wall(x,y,width,height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	walls.push(this);
}

Wall.prototype.draw = function() {
	ctx.fillStyle="#34495e";
	ctx.fillRect(this.x - ViewX,this.y - ViewY,this.width,this.height);
};

var Room = function() {
	new Wall(0,0,640, 16);
	new Wall()
	new Wall(0,0,16,360);
	new Wall(0, 360, 640, 16);
	new Wall(240, 224, 640-240, 16);
	new Wall(32,300,64,16);
	new Wall(640-16, 0, 16, 360);
	new Wall(480,176,64,16);
	new Wall(160, 256, 64, 16);
}

Room();


// IMAGE LOADING STUFF
var imageOnLoad = function() {
	console.log("Image loaded");
};

// dead code (for now) load character sprites

// var walkright = new Array(
// 	"smiley.svg",
// 	"smiley.svg",
// 	"smiley.svg",
// 	"smiley.svg"
// );
// var walkleft = new Array(
// 	"smiley.svg",
// 	"smiley.svg",
// 	"smiley.svg",
// 	"smiley.svg"
// );

// var rightw = new Array();

// for (var i=0; i < walkright.length; i++) {
// 	rightw.push(new Image());
// 	rightw[i].onload = imageOnLoad();
// 	rightw[i].src = walkright[i];
// }

// var leftw = new Array();

// for (var i=0; i < walkleft.length; i++) {
// 	leftw.push(new Image());
// 	leftw[i].onload = imageOnLoad();
// 	leftw[i].src = walkleft[i];
// }

// KEYBOARD INPUT
document.body.onkeydown = function() {
	console.log("Keydown: "+event.keyCode);
	if (event.keyCode == 39) {
		right = true;
	}
	if (event.keyCode == 38) {
		up = true;
	}
	if (event.keyCode == 37) {
		left = true;
	}
};
document.body.onkeyup = function() {
	if (event.keyCode == 39) {
		right = false;
	}
	if (event.keyCode == 38) {
		up = false;
	}
	if (event.keyCode == 37) {
		left = false;
	}
};

// FRAMES!!

var CheckCol = function(x,y,width,height) {
	for (var m = walls.length - 1; m >= 0; m-=1) {
		if ( ((walls[m].x <= x && walls[m].x+walls[m].width >= x) || (walls[m].x >= x && walls[m].x <= x+width))   &&   ((walls[m].y <= y && walls[m].y+walls[m].height >= y) || (walls[m].y >= y && walls[m].y <= y+height)) ) {
			return walls[m];
		}
	}
	return false;
}

setInterval("animate();", 30);

var animate = function() {

	// INPUT & MOVEMENT

	// jumping
	if (up && (jumpcounts < 3)) {
		y-=5;
		vspeed = -11;
		inAir = true;
		jumpcounts++;
		up = false;
	}

	// falling
	if (inAir) {
		y+=vspeed;
		vspeed += 1;
		var cc = CheckCol(x-4,y-32+vspeed,8, 32);
		if (cc != false) {
			if (y < cc.y+cc.height) {
				y = cc.y;
				inAir = false;
				jumpcounts = 0;
			}
			else {
				y = cc.y+cc.height+32;
			}
			vspeed = 0;
		}
	}
	else {
		var cc = CheckCol(x-4,y-31,8, 32);
		if (cc == false) {
			inAir = true;
		}
	}

	// move left and right
	if (left && !right && CheckCol(x-8,y-31,8, 30) == false) {
		x-=4;
		dir = 1;
	}
	else if (right && !left && CheckCol(x,y-31,8, 30) == false) {
		x+=4;
		dir = 0;
	}

	// SPRITES & FRAMES

	// if (!inAir) {
	// 	if (!left && !right) {
	// 		frame = 0;
	// 		framin = 3;
	// 	}
	// 	else {
	// 		framin += 1;
	// 		if (framin >=3) {
	// 			frame = (frame+1) % walkright.length;
	// 			framin = 0;
	// 		}
	// 	}
	// }
	// else {
	// 	frame = 1;
	// 	framin = 3;
	// }

	// if (dir) {
	// 	chSprite = leftw;
	// }
	// else {
	// 	chSprite = rightw;
	// }

	// Place the view
	if (x > (canvas.width / 2) && x <= roomWidth - canvas.width / 2) {
		ViewX = x - (canvas.width / 2);
	}
	if (y > (canvas.height / 2) && y <= roomHeight - canvas.height / 2) {
		ViewY = y - (canvas.height / 2);
	}

	// clean the canvas
	ctx.clearRect(0,0,canvas.width, canvas.height);
	// draw walls
	for (var i = walls.length - 1; i >= 0; i--) {
		walls[i].draw();
	};
	// draw the character
	ctx.fillStyle="#e74c3c";
	ctx.fillRect(x-4 - ViewX,y-32 - ViewY,8, 32);
};

