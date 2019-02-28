var controller; //サークル型コントローラー
var board; //ゲームの盤面を2次元配列で記録
var score;
var time;
var mode; //ゲームを起動しているかどうか

onload = function () {
    mode = 0;
    controller = new Controller();
    board = new Board();
    score = 0;
    document.getElementById("score").innerHTML = "score: " + score;
    time = 60;
    document.getElementById("time").innerHTML = "time: " + time;
    board.paint();
};

const size = 40; //ブロックのサイズ
const margin = 4; //ブロックのマージン
const backgroundSize = size * 6 + margin * 12 + 2; //背景のサイズ
const controllerSize = size * 2 + margin * 4; //コントローラーのサイズ
const spanSize = 40; //コントローラーの隙間のサイズ

//初期状態に戻す
function reset() {
    mode = 0;
    controller.reset();
    board.reset();
    score = 0;
    document.getElementById("score").innerHTML = "score: " + score;
    time = 60;
    document.getElementById("time").innerHTML = "time: " + time;
}

//スコア加算
function scoreUp() {
    score += 100;
    document.getElementById("score").innerHTML = "score: " + score;
}

//ボタンからの操作
function buttonRight() {
    if (mode == 1) {
        controller.moveRight();
    }

}

function buttonLeft() {
    if (mode == 1) {
        controller.moveLeft();
    }
}

function buttonUp() {
    if (mode == 1) {
        controller.moveUp();
    }
}

function buttonDown() {
    if (mode == 1) {
        controller.moveDown();
    }
}

function buttonClockwise() {
    if (mode == 1) {
        blockClockwise(controller.x, controller.y);
    }
}

function buttonCounterClockwise() {
    if (mode == 1) {
        blockCounterClockwise(controller.x, controller.y);
    }
}

document.onkeydown = keydown;

function keydown(event) {
    if (mode == 1) {
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
}

function blockClockwise(controllerX, controllerY) {
    board.boardClockwise(controllerX, controllerY);
    board.judge();
    board.paint();
    anime({
        targets: controller.controller,
        rotate: [-90, 0],
        duration: 500,
    });

}

function blockCounterClockwise(controllerX, controllerY) {
    board.boardCounterClockwise(controllerX, controllerY);
    board.judge();
    board.paint();
    anime({
        targets: controller.controller,
        rotate: [90, 0],
        duration: 500,
    });


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

    //初期状態に戻す
    reset() {
        this.array = [
            [1, 2, 3, 4, 5, 1],
            [2, 3, 4, 5, 1, 2],
            [3, 4, 5, 1, 2, 3],
            [4, 5, 1, 2, 3, 4],
            [5, 1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5, 1]
        ];
        this.paint();
    }

    //ブロックが4つそろっているか判定
    judge() {
        var i, j;
        search:
            for (i = 0; i < 5; i++) {
                for (j = 0; j < 5; j++) {
                    if (this.array[i][j] == this.array[i][j + 1] && this.array[i][j] == this.array[i + 1][j] && this.array[i][j] == this.array[i + 1][j + 1]) {
                        this.array[i][j] = 0;
                        this.array[i][j + 1] = 0;
                        this.array[i + 1][j] = 0;
                        this.array[i + 1][j + 1] = 0;
                        scoreUp();
                    }
                }
            }

    }

    //盤面を画面に反映
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
                } else if (this.array[i][j] == 0) {
                    fillReset(i, j);
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
        this.controller = document.getElementById('controller');
        this.ctx = this.controller.getContext('2d');
        this.position(this.x, this.y);
    }

    //初期状態に戻す
    reset() {
        this.x = 0;
        this.y = 0;
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
            this.controller.style.left = this.x * (size + margin * 2) + "px";
        }
    }

    moveLeft() {
        if (this.x > 0) {
            this.x = this.x - 1;
            this.controller.style.left = this.x * (size + margin * 2) + "px";
        }
    }

    moveUp() {
        if (this.y > 0) {
            this.y = this.y - 1;
            this.controller.style.top = this.y * (size + margin * 2) + "px";
        }
    }

    moveDown() {
        if (this.y < 4) {
            this.y = this.y + 1;
            this.controller.style.top = this.y * (size + margin * 2) + "px";
        }
    }
}

//色を四方とかぶらないようにセット
function fillReset(i, j) {
    var block = document.getElementById("b-" + (6 * i + j));
    var colorList = [1, 2, 3, 4, 5]; //この中から色を選ぶ
    //四方との重複を削除
    if (i == 0) {
        colorList = colorList.filter(n => n !== board.array[i + 1][j]);
    } else if (i == 5) {
        colorList = colorList.filter(n => n !== board.array[i - 1][j]);
    } else {
        colorList = colorList.filter(n => n !== board.array[i + 1][j]);
        colorList = colorList.filter(n => n !== board.array[i - 1][j]);
    }
    if (j == 0) {
        colorList = colorList.filter(n => n !== board.array[i][j + 1]);
    } else if (j == 5) {
        colorList = colorList.filter(n => n !== board.array[i][j - 1]);
    } else {
        colorList = colorList.filter(n => n !== board.array[i][j + 1]);
        colorList = colorList.filter(n => n !== board.array[i][j - 1]);
    }
    //リストからランダムで選ぶ
    var color = colorList[Math.floor(Math.random() * colorList.length)];
    board.array[i][j] = color;
    if (color == 1) {
        fillRed(block);
    } else if (color == 2) {
        fillBlue(block);
    } else if (color == 3) {
        fillGreen(block);
    } else if (color == 4) {
        fillYellow(block);
    } else if (color == 5) {
        fillPurple(block);
    }
    anime({
        targets: block,
        scale: [0, 1],
        opacity: [0, 1],
        duration: 500,
    });
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