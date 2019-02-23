var controller;
onload = function () {
    var block;
    for (i = 0; i < 36; i++) {
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
    }
    controller = new Controller();
};

const size = 40;
const margin = 4;
const boxSize = size * 6 + margin * 12 + 2;
document.onkeydown = keydown;

function keydown(event) {
    console.log(event.key);
    if (event.key == "d"){
        controller.moveRight();
    }else if(event.key == "a"){
        controller.moveLeft();
    }else if(event.key == "w"){
        controller.moveUp();
    }else if(event.key == "s"){
        controller.moveDown();
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

function strokeController(x, y) {
    var controller = document.getElementById('controller');
    var ctx = controller.getContext('2d');
    const controllerSize = size * 2 + margin * 4;
    const controllerX = x * (size + margin * 2) + 1;
    const controllerY = y * (size + margin * 2) + 1;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeRect(controllerX, controllerY, controllerSize, controllerSize);
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