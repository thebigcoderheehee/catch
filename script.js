const Ball = document.querySelector('.ball');
const Basket = document.querySelector('.basket');
const ScoreDisplay = document.querySelector('.score');
const MoveLeft = document.getElementById("move-left");
const MoveRight = document.getElementById("move-right");
const CatchSound = document.getElementById("catch-sound")
const GameOver = document.getElementById("game-over-sound")

let BasketPosition = 170;
let Score = 0;
let Missed = 0;

function MoveBasket(direction) {
    if (direction === 'left' && BasketPosition > 0) {
        BasketPosition -= 20
    } else if (direction === 'right' && BasketPosition < 340) {
        BasketPosition += 20
    }
    Basket.style.left = BasketPosition + 'px'

}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') MoveBasket("left")
    else if (event.key === 'ArrowRight') MoveBasket("right")
})
MoveLeft.addEventListener("click", () => MoveBasket('left'))
MoveRight.addEventListener("click", () => MoveBasket('right'))

function ResetBall() {
    Ball.style.top = '-50px'
    Ball.style.left = Math.random() * 370 + 'px'
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
            GameOver.play()
            alert("Game Over! Your Final Score Is: " + Score)
            location.reload()
        }
        ResetBall();
    }
    if (CollisionDetection()) {
        Score++;
        ScoreDisplay.textContent = 'Score: ' + Score;
        CatchSound.play()
        ResetBall();
    }
    requestAnimationFrame(GameLoop)
}
ResetBall()
GameLoop()