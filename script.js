const Ball = document.querySelector('.ball');
const Basket = document.querySelector('.basket');
const ScoreDisplay = document.querySelector('.score');

let BasketPosition = 170;
let Score = 0;
let Missed = 0;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && BasketPosition > 0) {
        BasketPosition -= 20
    } else if (event.key === 'ArrowRight' && BasketPosition < 340) {
        BasketPosition += 20
    }
    Basket.style.left = BasketPosition + 'px'
})

function ResetBall() {
    Ball.style.top = '-50px'
    Ball.style.left = Math.random() * 370  +'px'
}

function CollisionDetection() {
    const BasketRect = Basket.getBoundingClientRect();
    const BallRect = Ball.getBoundingClientRect();
    return !(
        BasketRect.top > BallRect.bottom ||
        BasketRect.bottom < BallRect.top ||
        BasketRect.left > BallRect.right ||
        BasketRect.right < BallRect.left
    );
}

function GameLoop() {
    let BallTop = parseInt(Ball.style.top || '-50')
    BallTop += 5
    Ball.style.top = BallTop + 'px'
    if (BallTop > 550) {
        Missed++
        if (Missed === 3) {
            alert("Game Over! Your Final Score Is: " + Score)
            location.reload()
        }
        ResetBall();
    }
    if (CollisionDetection()) {
        Score++;
        ScoreDisplay.textContent = 'Score: ' + Score;
        ResetBall();
    }
    requestAnimationFrame(GameLoop)
}
ResetBall()
GameLoop()