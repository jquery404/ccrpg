var player = playerCreator(450, 350);
var downArrow = document.getElementById("downArrow");
updateArrowPos();

var npc1StartingPosition = {
    x: 20,
    y: 240,
}
var npc2StartingPosition = {
    x: 660,
    y: 55,
}
var npc3StartingPosition = {
    x: 780,
    y: 580,
}
var npc4StartingPosition = {
    x: 820,
    y: 400,
}
var npc5StartingPosition = {
    x: 320,
    y: 400,
}
var npc6StartingPosition = {
    x: 520,
    y: 200,
}
var npc7StartingPosition = {
    x: 450,
    y: 520,
}

//Entity Generator
function entityGenerator(type, x, y, width, height, name, id, img) {
    var self = {
        type: type,
        x: x,
        y: y,
        width: width,
        height: height,
        name: name,
        id: id,
        img: img,
        lookAngle: 0,
        spriteAnimCounter: 0,
    };
    self.update = function () {
        self.updatePosition();
        self.draw();
    }
    self.updatePosition = function () {
        var oldX = self.x;
        var oldY = self.y;

        if (self.type === 'player') {
            if (self.pressingRight || self.pressingLeft || self.pressingDown || self.pressingUp)
                self.spriteAnimCounter += 0.3;

            var leftBumper = { x: self.x - 10, y: self.y };
            var rightBumper = { x: self.x + 10, y: self.y };
            var upBumper = { x: self.x, y: self.y - 2 };
            var downBumper = { x: self.x, y: self.y + 32 };

            if (Maps.current.isPositionWall(rightBumper)) {
                self.x -= 1;
            } else {
                if (self.pressingRight)
                    self.x += self.maxMoveSpd;
            }

            if (Maps.current.isPositionWall(leftBumper)) {
                self.x += 1;
            } else {
                if (self.pressingLeft)
                    self.x -= self.maxMoveSpd;
            }
            if (Maps.current.isPositionWall(downBumper)) {
                self.y -= 1;
            } else {
                if (self.pressingDown)
                    self.y += self.maxMoveSpd;
            }
            if (Maps.current.isPositionWall(upBumper)) {
                self.y += 1;
            } else {
                if (self.pressingUp)
                    self.y -= self.maxMoveSpd;
            }

            //isPositionValid
            if (self.x < self.width / 2)
                self.x = self.width / 2;
            if (self.x > WIDTH - self.width / 2)
                self.x = WIDTH - self.width / 2;
            if (self.y < self.height / 2)
                self.y = self.height / 2;
            if (self.y > HEIGHT - self.height / 2)
                self.y = HEIGHT - self.height / 2;
        }
        else if (self.type === 'npc') {
            if (self.x != oldX || self.y != oldY || self.isWalking === true)
                self.spriteAnimCounter += 0.2;

            if (self.x > oldX)
                self.lookAngle = 315;
            if (self.x < oldX)
                self.lookAngle = 135;
            if (self.y > oldY)
                self.lookAngle = 45;
            if (self.y < oldY)
                self.lookAngle = 225;
            if (self.y >= HEIGHT || self.y <= 0) {
                self.spdY = -self.spdY
            }
        }
    }
    self.draw = function () {
        var x = self.x - self.width / 2;
        var y = self.y - self.height / 2;

        var frameWidth = (self.img.width + 5) / 3;
        var frameHeight = self.img.height / 4;

        var lookAngle = self.lookAngle;
        if (lookAngle < 0)
            lookAngle = 360 + lookAngle;

        var directionMod = 2;
        if (lookAngle >= 45 && lookAngle < 135) //down
            directionMod = 0;
        else if (lookAngle >= 135 && lookAngle < 225)   //left
            directionMod = 1;
        else if (lookAngle >= 225 && lookAngle < 315)   //up
            directionMod = 3;

        var walkingMod = Math.floor(self.spriteAnimCounter) % 3; //0, 1, 2

        ctx.drawImage(self.img, walkingMod * frameWidth, directionMod * frameHeight, frameWidth, frameHeight, x, y, self.width, self.height);
    }
    self.getDistance = function (entity2) {   //return distance(number)
        var vx = self.x - entity2.x;
        var vy = self.y - entity2.y;
        return Math.sqrt(vx * vx + vy * vy);
    }
    self.testCollision = function (entity2) { //return true or false collision
        var rect1 = {
            x: self.x - self.width / 2,
            y: self.y - self.width / 2,
            width: self.width,
            height: self.height,
        }
        var rect2 = {
            x: entity2.x - entity2.width / 2,
            y: entity2.y - entity2.width / 2,
            width: entity2.width,
            height: entity2.height,
        }
        return testCollisionRect(rect1, rect2);
    }
    return self;
}

//player Generator
function playerCreator(x, y) {
    var self = entityGenerator("player", x, y, 30, 30, "p1", "player", img.player);

    self.pressingDown = false;
    self.pressingUp = false;
    self.pressingLeft = false;
    self.pressingRight = false;

    self.maxMoveSpd = 4;

    player = self;

    return player;
}

// arrow key for navigation -> onkeydown && looking angle
document.onkeydown = function (e) {
    if (e.keyCode === 39) {
        player.pressingRight = true; //d
        player.lookAngle = 315;
    }
    else if (e.keyCode === 40) { //s
        player.pressingDown = true;
        player.lookAngle = 45;
    }
    else if (e.keyCode === 37) { //a
        player.pressingLeft = true;
        player.lookAngle = 135;
    }
    else if (e.keyCode === 38) { //w
        player.pressingUp = true;
        player.lookAngle = 225;
    }
}

// arrow key for navigation -> onkeyup
document.onkeyup = function (e) {
    if (e.keyCode === 39) //right 
        player.pressingRight = false;
    else if (e.keyCode === 40) //down
        player.pressingDown = false;
    else if (e.keyCode === 37) //left
        player.pressingLeft = false;
    else if (e.keyCode === 38) //up
        player.pressingUp = false;
}

//left click for chaning looking direction
function getMousePosition(mouse) {
    var mouseX = mouse.clientX - gameCanvas.getBoundingClientRect().left;
    var mouseY = mouse.clientY - gameCanvas.getBoundingClientRect().top;

    mouseX -= WIDTH / 2;
    mouseY -= HEIGHT / 2;

    player.lookAngle = Math.atan2(mouseY, mouseX) / Math.PI * 180;
    console.log(player.lookAngle);
}

//npc list
var npcList = {};

//create pnc
npcCreator("npc1", npc1StartingPosition.x, npc1StartingPosition.y, img.npc1);
npcCreator("npc2", npc2StartingPosition.x, npc2StartingPosition.y, img.npc2);
npcCreator("npc3", npc3StartingPosition.x, npc3StartingPosition.y, img.npc1);
npcCreator("npc4", npc4StartingPosition.x, npc4StartingPosition.y, img.npc2);
npcCreator("npc5", npc5StartingPosition.x, npc5StartingPosition.y, img.npc1);
npcCreator("npc6", npc6StartingPosition.x, npc6StartingPosition.y, img.npc2);
npcCreator("npc7", npc7StartingPosition.x, npc7StartingPosition.y, img.npc1);

//npc creator with position and movement script
function npcCreator(id, x, y, img) {
    var self = entityGenerator("npc", x, y, 28, 28, "npc", id, img);
    self.isWalking = false;
    npcList[id] = self;
}

update = function () {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    Maps.current.draw();

    for (var npc in npcList) {
        npcList[npc].update();

        var isColliding = player.testCollision(npcList[npc]);
        if (isColliding) {
            console.log("Colliding!");
        }
    }

    downArrow.left = player.x;
    downArrow.top = player.y;

    player.update();
    updateArrowPos();
}

function testCollisionRect(rect1, rect2) {
    return rect1.x <= rect2.x + rect2.width && rect2.x <= rect1.x + rect1.width &&
        rect1.y <= rect2.y + rect2.height && rect2.y <= rect1.y + rect1.height;
}

//npc lookaround
var npcMoveTimer = 0;
lookAround = function () {
    npcMoveTimer += 1;
    if (npcMoveTimer < 5) {
        npcList['npc2'].lookAngle = 135;
        npcList['npc3'].lookAngle = 315;
        npcList['npc5'].lookAngle = 45;
    }
    else if (npcMoveTimer < 10) {
        npcList['npc2'].lookAngle = 45;
        npcList['npc3'].lookAngle = 135;
        npcList['npc5'].lookAngle = 315;
    }
    else if (npcMoveTimer < 15) {
        npcList['npc2'].lookAngle = 315;
        npcList['npc3'].lookAngle = 225;
        npcList['npc5'].lookAngle = 45;
        npcList['npc6'].lookAngle = 45;
    } else {
        npcList['npc2'].lookAngle = 225;
        npcList['npc3'].lookAngle = 45;
        npcList['npc5'].lookAngle = 135;
        npcList['npc6'].lookAngle = 45;

        if (npcMoveTimer > 20)
            npcMoveTimer = 0;
    }
}

walkingReturn = function () {
    npcList['npc1'].isWalking = true;
    if (npcMoveTimer < 10) {
        npcList['npc1'].lookAngle = 315;
        npcList['npc1'].x += 10;
        npcList['npc6'].lookAngle = 135;
    }
    else {
        npcList['npc1'].lookAngle = 135;
        npcList['npc1'].x -= 9;
        npcList['npc6'].lookAngle = 315;
    }
}

var walkingCircleTimer = 0;
walkingCircle = function () {
    walkingCircleTimer += 0.5;
    npcList['npc4'].isWalking = true;
    if (walkingCircleTimer < 10) {
        npcList['npc4'].lookAngle = 225;
        npcList['npc4'].y -= 5;
        npcList['npc7'].lookAngle = 225;
    } else if (walkingCircleTimer < 20) {
        npcList['npc4'].lookAngle = 315;
        npcList['npc4'].x += 5;
        npcList['npc7'].lookAngle = 45;
    } else if (walkingCircleTimer < 30) {
        npcList['npc4'].lookAngle = 45;
        npcList['npc4'].y += 5;
        npcList['npc7'].lookAngle = 135;
    } else {
        npcList['npc4'].lookAngle = 135;
        npcList['npc4'].x -= 5;
        npcList['npc7'].lookAngle = 315;
        if (walkingCircleTimer > 40)
            walkingCircleTimer = 0;
    }
}

document.onclick = function (event) {
    if (event.target.className == "clickArea") {
        var id = event.target.id;
        var realid = id.substring(0, id.length - 4);
        var alt = event.target.attributes.alt.value;

        var buildingWidth = event.target.clientWidth;
        var buildingHeight = event.target.clientHeight;

        var building = {
            x: event.x,
            y: event.y,
        }
        var distance = player.getDistance(building)

        showTooltips(alt, event.x, event.y, 'front');

        if (distance < 100) {
            shop_open(realid);
        }
    }
}

//open the shop
function shop_open(role) {
    document.getElementById("shopDivContainer").style.display = "block";

    if (role == 'vegeFarmer') populateShopPage(1);
    else if (role == 'riceFarmer') populateShopPage(2);
    else if (role == 'foodVendor') populateShopPage(3);
    else if (role == 'doctor') populateShopPage(4);
    else if (role == 'labourer') populateShopPage(5);
    else if (role == 'weaver') populateShopPage(6);
    else if (role == 'fisher') populateShopPage(7);
    else if (role == 'homemaker') populateShopPage(8);
    else if (role == 'fruitFarmer') populateShopPage(9);
    else if (role == 'mechanic') populateShopPage(10);
    else if (role == 'merchant') populateShopPage(11);
    else if (role == 'moneylender') populateShopPage(12);
    else if (role == 'outsider') populateShopPage(13);

}

function populateShopPage(plr) {

    if(plr == 12){
        purchase(12, 0);
        coinAnimation();
        shop_close();
    }else{
        _player[plr].sellable.map((v, k) => {
            createShopItem(plr, v + "(" + _player[plr].sellable_price[k] +"/"+_player[plr].sellable_price_cc[k]+ ")", k);
        });
    }
    

}

function updateArrowPos(){
    downArrow.style.left = parseInt(player.x -5) + 'px';
    downArrow.style.top = parseInt(player.y - 50) + 'px';
}

setInterval(update, 40);
setInterval(lookAround, 400);
setInterval(walkingReturn, 400);
setInterval(walkingCircle, 400);