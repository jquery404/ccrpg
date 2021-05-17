var selectedRole;
var chatMessageRecords = "";
var sav = document.getElementById("sav");
var savCC = document.getElementById("sav_cc");
var playerMoney = document.getElementById("playerMoney");
var playerCoupon = document.getElementById("playerCoupon");
var spentMoney = document.getElementById("spentMoney");
var spentCoupon = document.getElementById("spentCoupon");

//listen the enter
listeningEnterSendMessage();

// The arguably best way to make a canvas 1x1 pixels is to ALWAYS USE CSS to 
// choose the size then write a tiny bit of JavaScript to make the number 
// of pixels match that size.
function resizeCanvasToDisplaySize(canvas) {
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // If it's resolution does not match change it
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
    }
    return false;
}

// Game Panel
var gameCanvas = document.getElementById("gameCanvas");
var ctx = gameCanvas.getContext("2d");
ctx.font = "10px Arial";
ctx.textAlign = "left";
ctx.textBaseline = "top";   // change baseline property

resizeCanvasToDisplaySize(gameCanvas);  //resize the canvas with pixels

var WIDTH = gameCanvas.width;
var HEIGHT = gameCanvas.height;

var TILE_SIZE = 16;


//load images
var img = {};
img.player = new Image();
img.player.src = "resources/sprite/cha1.png"; 

img.npc1 = new Image();
img.npc1.src = "resources/sprite/cha2.png";

img.npc2 = new Image();
img.npc2.src = "resources/sprite/cha3.png";

//Maps
Maps = function (id, imgSrc, grid) {
    var self = {
        id: id,
        image: new Image(),
        width: grid[0].length * TILE_SIZE,
        height: grid.length * TILE_SIZE,
        grid: grid,
    }
    self.image.src = imgSrc;

    self.isPositionWall = function (pt) {
        var gridX = Math.floor(pt.x / TILE_SIZE);
        var gridY = Math.floor(pt.y / TILE_SIZE);
        if (gridX < 0 || gridX >= self.grid[0].length)
            return true;
        if (gridY < 0 || gridY >= self.grid.length)
            return true;
        return self.grid[gridY][gridX];
    }

    self.draw = function () {
        ctx.drawImage(self.image, 0, 0, gameCanvas.width, gameCanvas.height);
    }
    return self;
}

var array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 423, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 423, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 423, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 0, 423, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 0, 0, 0, 423, 0, 0, 0, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 0, 423, 423, 423, 423, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 0, 423, 423, 423, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 0, 0, 0, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 0, 0, 423, 0, 0, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 0, 0, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 0, 0, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 0, 0, 0, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 423, 423, 0, 0, 0, 0, 0, 423, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 423, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 0, 0, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 423, 423, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 423, 423, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 423, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 423, 423, 423, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 423, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423, 423, 423, 423, 0, 0, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var array2D = [];
for (var i = 0; i < 40; i++) {
    array2D[i] = [];
    for (var j = 0; j < 64; j++) {
        array2D[i][j] = array[i * 64 + j];
    }
}

Maps.current = Maps('field', 'resources/sprite/Community.png', array2D);

//document.getElementById("demo").innerHTML = document.body.clientWidth;
//document.getElementById("demo2").innerHTML = document.body.clientHeight;


// UI functions
//sending message when press enter
function listeningEnterSendMessage() {
    var chatMessageCurrent = document.getElementById("inputMessageId");
    chatMessageCurrent.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("messageSendingButtonId").click();
        }
    });
}

//function for getting selectedRole from the homepage
function getSelectedRole() {
    selectedRole = sessionStorage.getItem("selectedRole");
}

// //function for chatting
function sendingChatMessage() {
    var chatMessageCurrent = document.getElementById("inputMessageId").value;
    document.getElementById("inputMessageId").value = "";
    var currentDate = new Date();
    var hour = currentDate.getHours();
    var min = currentDate.getMinutes();
    var sec = currentDate.getSeconds();
    var message = "[" + hour + ":" + min + ":" + sec + "] " + chatMessageCurrent;
    chatMessageRecords += "\n" + message;

    document.getElementById("messageDisplayArea").value = chatMessageRecords;

    //make sure it always see the bottom
    var textarea = document.getElementById('messageDisplayArea');
    textarea.scrollTop = textarea.scrollHeight;
}

// //function for selecting roles
function lockInCharactor(element) {
    if (selectedRole == null) {

    } else {
        selectedRole.style.border = "";
    }
    selectedRole = element;
    selectedRole.style.border = "8px solid green";

    var selectedRoleText = document.getElementById("selectedRoleInText");
    selectedRoleText.innerHTML = selectedRole.alt;
    //store selectedRole in the session
    sessionStorage.setItem("selectedRole", selectedRole.alt);
    //scroll to the bottom of the page
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
}

//open the offer list
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}

//close the offer list
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}

//open the shop
function shop_open() {
    document.getElementById("shopDivContainer").style.display = "block";
}

//close the shop
function shop_close() {
    document.getElementById("shopDivContainer").style.display = "none";

    // clean shoplist
    document.getElementById("shopItemContainer").innerHTML = "";
}

function playerbag_open() {
    document.getElementById("playerBagContainer").style.display = "block";
}

function playerbag_close() {
    document.getElementById("playerBagContainer").style.display = "none";
}

function summary_open() {
    var table = document.getElementById("summarytable");
    table.style.display = "block";
    table.style.width = "80%"
    // table.style.height = "200px";

    var tbody = document.getElementById("summaryTbody");
    var html = '';
    var _count1 = 0, _count2 = 0, count1 = 0,count2 = 0;
    var _countcc = 0, countcc = 0, countcc1 = 0,countcc2 = 0;
    _player.map((v, k) => {
        console.log(k, v.savings_cc, v.savings_cc - v._savings_cc);
        if (k <= 11){
            html += `<tr class="row100">
                <td class="column100 column1" data-column="column1">${v.occupation.toUpperCase()}</td>
                <td class="column100 column2" data-column="column2">${v._savings}</td>
                <td class="column100 column2" data-column="column2" id="tailor_bal">${v.savings}</td>

                <td class="column100 column3" data-column="column3">${v._savings_cc}</td>
                <td class="column100 column3" data-column="column3">${v._savings}</td>
                <td class="column100 column3" data-column="column3" id="tailor_c2">${v.savings_cc}</td>
                <td class="column100 column3" data-column="column3" id="tailor_c3">${v.savings_cc - Math.floor(Math.random()*2)}</td>
                <td class="column100 column3" data-column="column3" id="tailor_bal2">${v.savings}</td>
            </tr>`;
            _count1+=v._savings;
            count1+=v.savings;
            _countcc +=v._savings_cc;
            countcc +=v.savings_cc;
            if(k == 11){
                html += `<tr class="row100">
                    <td class="column100 column1" data-column="column1"></td>
                    <td class="column100 column2" data-column="column2">${_count1}</td>
                    <td class="column100 column2" data-column="column2" id="tailor_bal">${count1}</td>
                    <td class="column100 column3" data-column="column3">${v._savings_cc}</td>
                    <td class="column100 column3" data-column="column3">${v._savings}</td>
                    <td class="column100 column3" data-column="column3" id="tailor_c2">${v.savings_cc - v._savings_cc}</td>
                    <td class="column100 column3" data-column="column3" id="tailor_c3">${v.savings_cc}</td>
                    <td class="column100 column3" data-column="column3" id="tailor_bal2">${v.savings}</td>
                </tr>`;
            }
        }else if(k<14){
            _count2+=v._savings;
            count2+=v.savings;
            html += `<tr class="row100">
                <td class="column100 column1" data-column="column1">${v.occupation.toUpperCase()}</td>
                <td class="column100 column2" data-column="column2">${v._savings}</td>
                <td class="column100 column2" data-column="column2" id="tailor_bal">${v.savings}</td>
                <td class="column100 column3" data-column="column3">${v._savings_cc}</td>
                <td class="column100 column3" data-column="column3">${v._savings}</td>
                <td class="column100 column3" data-column="column3" id="tailor_c2"></td>
                <td class="column100 column3" data-column="column3" id="tailor_c3"></td>
                <td class="column100 column3" data-column="column3" id="tailor_bal2">${v._savings}</td>
            </tr>`;
            if(k == 13){
                html += `<tr class="row100">
                    <td class="column100 column1" data-column="column1"></td>
                    <td class="column100 column2" data-column="column2">${_count2}</td>
                    <td class="column100 column2" data-column="column2" id="tailor_bal">${count2}</td>
                    <td class="column100 column3" data-column="column3">${v._savings_cc}</td>
                    <td class="column100 column3" data-column="column3">${v._savings}</td>
                    <td class="column100 column3" data-column="column3" id="tailor_c2"></td>
                    <td class="column100 column3" data-column="column3" id="tailor_c3"></td>
                    <td class="column100 column3" data-column="column3" id="tailor_bal2">${count2}</td>
                </tr>`;
            }
        }


        
    });

    tbody.innerHTML = html;
    
    



}

function summary_close() {
    document.getElementById("summarytable").style.display = "none";
}

//shopping panel
function onDragStart(event) {
    event
        .dataTransfer
        .setData('text/plain', event.target.id);

    event
        .currentTarget
        .style
        .backgroundColor = 'blue';

    var dropdownElement = document.getElementById(event.target.id).childNodes;
    dropdownElement[3].style.display = "none";
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    const id = event
        .dataTransfer
        .getData('text');

    let key = parseInt(id.substring(9, id.length));
    let role = document.getElementById(id).attributes.alt.value;
    purchase(role, key);

    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    dropzone.appendChild(draggableElement);

    draggableElement.style.background = '#754721';

    createShopItem(role, _player[role].sellable[key] + "(" + _player[role].sellable_price[key] + ")", key);
    playerMoney.innerHTML = _player[0].savings;
    playerCoupon.innerHTML = _player[0].savings_cc;
    spentMoney.innerHTML = _player[role].savings;
    spentCoupon.innerHTML = _player[role].savings_cc;

    event
        .dataTransfer
        .clearData();

    coinAnimation();
}



document.ondragstart = function (event) {
    if (event.target.className == "item") {
        event
            .dataTransfer
            .setData('text/plain', event.target.id);
        console.log(document.getElementById(event.target.id).attributes.alt.value);

        event
            .currentTarget
            .style
            .backgroundColor = 'blue';
    }
}

function createShopItem(role_id, txt, item_id) {
    var itemDiv = document.createElement("div");
    itemDiv.setAttribute("class", "item");
    itemDiv.setAttribute("id", "dragable-" + item_id);
    itemDiv.setAttribute("alt", role_id);
    itemDiv.setAttribute("draggable", "true");

    var span = document.createElement("span");
    var img = document.createElement("img");
    img.src = 'resources/cards/icons/'+_player[role_id].sellable[item_id]+'.png';
    img.style.width = "24px";
    var node = document.createTextNode(txt);
    
    span.appendChild(img);
    span.appendChild(node);

    itemDiv.appendChild(span);

    var shopItemContainer = document.getElementById("shopItemContainer");
    shopItemContainer.appendChild(itemDiv);
    playerMoney.innerHTML = _player[0].savings;
    playerCoupon.innerHTML = _player[0].savings_cc;
    spentMoney.innerHTML = _player[role_id].savings;
    spentCoupon.innerHTML = _player[role_id].savings_cc;
}



/* tooltips 
 */
let anim;

function showTooltips(txt, x, y, dir) {
    document.getElementById("shopTitleText").innerHTML = "<img width='24px' src='resources/cards/assets/"+txt+".png'/> "+ txt;

    var elem = document.getElementById("tooltips");
    clearTimeout(anim);

    elem.style.display = "flex";
    elem.style.left = Math.floor(x) - 50 + 'px';
    elem.style.top = Math.floor(y) - 100 + 'px';
    elem.innerHTML = txt;
    if (dir == 'back')
        elem.classList.add('bounce-1');
    else
        elem.classList.add('bounce-2');

    anim = setTimeout(() => {
        elem.style.display = "none";
        //coin.innerHTML=""; 
    }, 6500);

    // auto
    // var parent = document.getElementById("tooltips");
    // var elem = document.createElement("div");
    // elem.classList.add('tooltip');
    // elem.innerHTML = txt;
    // elem.style.display = 'flex';
    // elem.style.left = Math.floor(x) - 50 + 'px'; 
    // elem.style.top = Math.floor(y) - 100 + 'px';
    // if(dir == 'back')
    //     elem.classList.add('bounce-1');
    // else 
    //     elem.classList.add('bounce-2');
    // parent.appendChild(elem);
}

let coinanm;
function coinAnimation() {
    var coin = document.getElementById("coinfly");
    coin.innerHTML = '<img class="coinanim" src="./resources/coins_1.gif?id=' + Math.random() + '"/>';
    coinanm = setTimeout(() => {
        coin.innerHTML = "";
    }, 3000);
}

