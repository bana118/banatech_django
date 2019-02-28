var controller;
var board;
onload = function () {
    controller = new Controller();
    board = new Board();
    board.paint();
};

const size = 40; //ブロックのサイズ
const margin = 4; //ブロックのマージン
const backgroundSize = size * 6 + margin * 12 + 2; //背景のサイズ
const controllerSize = size * 2 + margin * 4; //コントローラーのサイズ
const spanSize = 40; //コントローラーの隙間のサイズ

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
    } else if (event.key == "ArrowLeft") {
        blockCounterClockwise(controller.x, controller.y);
    }
}

function blockClockwise(controllerX, controllerY) {
    /*var duration = 1;
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
        duration: duration
    });
    var callbackUpperRight = anime({
        targets: blockUpperRight,
        translateY: size + margin * 2,
        duration: duration
    });
    var callbackLoweLeft = anime({
        targets: blockLowerLeft,
        translateY: -(size + margin * 2),
        duration: duration
    });
    var callbackLowerRight = anime({
        targets: blockLowerRight,
        translateX: -(size + margin * 2),
        duration: duration
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
    };*/
    board.boardClockwise(controllerX, controllerY);
    board.paint();
    /*anime({
        targets: controller.controller,
        rotate: [-90,0],
        duration: 300,
        /*update: function () {
            transform = controller.controller.style.transform;
            controller.controller.style.transform = transform.replace(/\d*deg/, '0deg');
        }*/
    //});


}

function blockCounterClockwise(controllerX, controllerY) {
    /*var duration = 1;
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
        duration: duration
    });
    var callbackUpperRight = anime({
        targets: blockUpperRight,
        translateY: size + margin * 2,
        duration: duration
    });
    var callbackLoweLeft = anime({
        targets: blockLowerLeft,
        translateY: -(size + margin * 2),
        duration: duration
    });
    var callbackLowerRight = anime({
        targets: blockLowerRight,
        translateX: -(size + margin * 2),
        duration: duration
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
    };*/
    board.boardCounterClockwise(controllerX, controllerY);
    board.paint();
    /*anime({
        targets: controller.controller,
        rotate: [-90,0],
        duration: 300,
        /*update: function () {
            transform = controller.controller.style.transform;
            controller.controller.style.transform = transform.replace(/\d*deg/, '0deg');
        }*/
    //});


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

    boardCounterClockwise(controllerX, controllerY) {
        var temp = this.array[controllerX][controllerY];
        this.array[controllerX][controllerY] = this.array[controllerX + 1][controllerY];
        this.array[controllerX + 1][controllerY] = this.array[controllerX + 1][controllerY + 1];
        this.array[controllerX + 1][controllerY + 1] = this.array[controllerX][controllerY + 1];
        this.array[controllerX][controllerY + 1] = temp;
    }
}
class Controller {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.deg = 0;
        //this.duration = 1;
        this.controller = document.getElementById('controller');
        this.ctx = this.controller.getContext('2d');
        this.position(this.x, this.y);
    }

    position(x, y) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(1, 1, controllerSize - 2, controllerSize - 2);
        this.ctx.clearRect(controllerSize / 2 - spanSize / 2, 0, spanSize, controllerSize);
        this.ctx.clearRect(0, controllerSize / 2 - spanSize / 2, controllerSize, spanSize);
    }

    moveRight() {
        if (this.x < 4) {
            this.x = this.x + 1;
            /*anime({
                targets: this.controller,
                translateX: (size + margin * 2) * this.x,
                duration: this.duration,
            });*/
            this.controller.style.left = this.x * (size + margin * 2) + "px";
        }
    }

    moveLeft() {
        if (this.x > 0) {
            this.x = this.x - 1;
            /*anime({
                targets: this.controller,
                translateX: (size + margin * 2) * this.x,
                duration: this.duration,
            });*/
            this.controller.style.left = this.x * (size + margin * 2) + "px";
        }
    }

    moveUp() {
        if (this.y > 0) {
            this.y = this.y - 1;
            /*anime({
                targets: this.controller,
                translateY: (size + margin * 2) * this.y,
                duration: this.duration
            });*/
            this.controller.style.top = this.y * (size + margin * 2) + "px";
        }
    }

    moveDown() {
        if (this.y < 4) {
            this.y = this.y + 1;
            /*var callbackMoveDown = anime({
                targets: this.controller,
                translateY: (size + margin * 2) * this.y,
                duration: this.duration
            });
            callbackMoveDown.begin = function () {
                transform = this.controller.style.transform;
                this.controller.style.transform = transform.replace(/\d*deg/, '0deg');
            };*/
            this.controller.style.top = this.y * (size + margin * 2) + "px";
        }
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