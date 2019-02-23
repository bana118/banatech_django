var controller;
var board;
onload = function () {
    var block;
    /*for (i = 0; i < 36; i++) {
        block = document.getElementById('b-' + i);
        if (i % 5 == 0) {
            fillRed(block);
        } else if (i % 5 == 1) {
            fillBlue(block);
        } else if (i % 5 == 2) {
            fillGreen(block);
        } else if (i % 5 == 3) {
            fillYellow(block);
        } else {
            fillPurple(block);
        }
    }*/
    controller = new Controller();
    board = new Board();
    board.paint();
};

const size = 40;
const margin = 4;
const boxSize = size * 6 + margin * 12 + 2;
document.onkeydown = keydown;

function keydown(event) {
    if (event.key == "d") {
        controller.moveRight();
    } else if (event.key == "a") {
        controller.moveLeft();
    } else if (event.key == "w") {
        controller.moveUp();
    } else if (event.key == "s") {
        controller.moveDown();
    } else if (event.key == "ArrowRight") {
        blockClockwise(controller.x, controller.y);
    }
}

function blockClockwise(controllerX, controllerY) {
    var duration = 100;
    var positionUpperLeft = 6 * controllerX + controllerY;
    var positionUpperRight = 6 * (controllerX + 1) + controllerY;
    var positionLowerLeft = 6 * controllerX + (controllerY + 1);
    var positionLowerRight = 6 * (controllerX + 1) + (controllerY + 1);
    var blockUpperLeft = document.getElementById("b-" + positionUpperLeft);
    var blockUpperRight = document.getElementById("b-" + positionUpperRight);
    var blockLowerLeft = document.getElementById("b-" + positionLowerLeft);
    var blockLowerRight = document.getElementById("b-" + positionLowerRight);
    var callbackUpperLeft = anime({
        targets: blockUpperLeft,
        translateX: size + margin * 2,
        duration:duration
    });
    var callbackUpperRight = anime({
        targets: blockUpperRight,
        translateY: size + margin * 2,
        duration:duration
    });
    var callbackLoweLeft = anime({
        targets: blockLowerLeft,
        translateY: -(size + margin * 2),
        duration:duration
    });
    var callbackLowerRight = anime({
        targets: blockLowerRight,
        translateX: -(size + margin * 2),
        duration:duration
    });
    callbackUpperLeft.complete = function () {
        $("#" + blockUpperLeft.id).removeAttr("style");
    };
    callbackUpperRight.complete = function () {
        $("#" + blockUpperRight.id).removeAttr("style");
    };
    callbackLoweLeft.complete = function () {
        $("#" + blockLowerLeft.id).removeAttr("style");
    };
    callbackLowerRight.complete = function () {
        $("#" + blockLowerRight.id).removeAttr("style");
    };
    board.boardClockwise(controllerX, controllerY);
    board.paint();
}

function blockCounterclockwise(controllerX, controllerY) {

}

class Board {
    constructor() {
        /* 縦横逆なことに注意 */
        this.array = [
            [1, 2, 3, 4, 5, 1],
            [2, 3, 4, 5, 1, 2],
            [3, 4, 5, 1, 2, 3],
            [4, 5, 1, 2, 3, 4],
            [5, 1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5, 1]
        ];
    }

    paint() {
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 6; j++) {
                var block = document.getElementById("b-" + (6 * i + j));
                if (this.array[i][j] == 1) {
                    fillRed(block);
                } else if (this.array[i][j] == 2) {
                    fillBlue(block);
                } else if (this.array[i][j] == 3) {
                    fillGreen(block);
                } else if (this.array[i][j] == 4) {
                    fillYellow(block);
                } else if (this.array[i][j] == 5) {
                    fillPurple(block);
                }
            }
        }
    }

    boardClockwise(controllerX, controllerY) {
        var temp = this.array[controllerX][controllerY];
        this.array[controllerX][controllerY] = this.array[controllerX][controllerY + 1];
        this.array[controllerX][controllerY + 1] = this.array[controllerX + 1][controllerY + 1];
        this.array[controllerX + 1][controllerY + 1] = this.array[controllerX + 1][controllerY];
        this.array[controllerX + 1][controllerY] = temp;
    }
}
class Controller {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.controller = document.getElementById('controller');
        this.ctx = this.controller.getContext('2d');
        this.position(this.x, this.y);
    }

    position(x, y) {
        const controllerSize = size * 2 + margin * 4;
        const controllerX = x * (size + margin * 2) + 1;
        const controllerY = y * (size + margin * 2) + 1;
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(controllerX, controllerY, controllerSize, controllerSize);
    }

    moveRight() {
        if (this.x < 4) {
            this.x = this.x + 1;
        }
        this.ctx.clearRect(0, 0, boxSize, boxSize);
        this.position(this.x, this.y);
    }

    moveLeft() {
        if (this.x > 0) {
            this.x = this.x - 1;
        }
        this.ctx.clearRect(0, 0, boxSize, boxSize);
        this.position(this.x, this.y);
    }

    moveUp() {
        if (this.y > 0) {
            this.y = this.y - 1;
        }
        this.ctx.clearRect(0, 0, boxSize, boxSize);
        this.position(this.x, this.y);
    }

    moveDown() {
        if (this.y < 4) {
            this.y = this.y + 1;
        }
        this.ctx.clearRect(0, 0, boxSize, boxSize);
        this.position(this.x, this.y);
    }
}

function fillRed(block) {
    if (!block || !block.getContext) {
        return false;
    }
    var ctx = block.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, size, size);
}

function fillBlue(block) {
    if (!block || !block.getContext) {
        return false;
    }
    var ctx = block.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, size, size);
}

function fillGreen(block) {
    if (!block || !block.getContext) {
        return false;
    }
    var ctx = block.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, size, size);
}

function fillYellow(block) {
    if (!block || !block.getContext) {
        return false;
    }
    var ctx = block.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    ctx.fillRect(0, 0, size, size);
}

function fillPurple(block) {
    if (!block || !block.getContext) {
        return false;
    }
    var ctx = block.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = 'purple';
    ctx.fillRect(0, 0, size, size);
}