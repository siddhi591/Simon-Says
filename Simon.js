let para = document.querySelector('p');
let container = document.querySelector('.container');
let boxes = document.querySelectorAll('.box');
let level = 0;
let started = false;
let gameSeq = [];
let userSeq = [];
let highestScore = 0;

document.addEventListener('keypress', function () {
    // Optional: Allow manual start if they press a key before 3s?
    // For now, let's strictly follow the "auto start after 3s" request.
    if (!started) startGame();
});

window.addEventListener('load', function () {
    setTimeout(startGame, 3000);
});

function startGame() {
    if (started == false) {
        started = true;
        para.style.color = 'black';
        flash();
    }
}

let flash = () => {
    next = Math.floor(Math.random() * 4);
    setTimeout(() => {
        blink(boxes[next])
        level++;
        para.innerText = 'Level ' + level;
        gameSeq.push(boxes[next].id);

    }, 1000);
}

let blink = (ele) => {
    ele.classList.add('white');
    setTimeout(() => {
        ele.classList.remove('white')
    }, 200);
}

function check() {
    let idx = userSeq.length - 1;
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            flash();
            userSeq = [];
        }
    } else {
        document.body.classList.add('red')
        setTimeout(() => {
            document.body.classList.add('white')
        }, 250);
        displayScore();
        resetGame();
    }

}

btnPress = function () {
    blink(this);
    userSeq.push(this.id);
    check();
}

for (box of boxes) {
    box.addEventListener('click', btnPress)
}

function displayScore() {
    para.style.color = 'black';
    if (level > 0) {
        let score = ((level - 1) * 10);
        if (score < highestScore) {
            para.innerHTML = `Game Over! <br> <b>Your Score Is: ${score}</b>`;
        } else {
            highestScore = score;
            para.innerHTML = `Game Over! <br> <b>Score: ${highestScore}</b>`;
        }
    } else {
        para.innerText = 'Game Over! <br> Your Score Is: ' + (level * 10);
    }
}

function resetGame() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}
