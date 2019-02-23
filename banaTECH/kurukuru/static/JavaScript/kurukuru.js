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
};
const size = 40;

function strokeController(x, y){
    
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