const canvas = document.getElementById("canvas")
const c = canvas.getContext("2d")
const playerScoreDisplay = document.getElementById("playerScore")
const enemyScoreDisplay = document.getElementById("enemyScore")
const pauseBtn = document.getElementById("pauseBtn")
let isPaused = false
canvas.width = 1024
canvas.height = 576

let playerScore = 0
let enemyScore = 0

pauseBtn.addEventListener("click", pauseGame)

class Board{
    constructor(x, y){
        this.position = {
            x: x,
            y: y
        }
        this.height = 100
        this.width = 30
        this.velocity = 0
    }


    update(){
        this.draw()
        this.position.y += this.velocity
    }

    draw(){
        c.fillStyle = "black"
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}

class Ball{
    constructor(){
        this.position = {
            x: canvas.width / 2,
            y: canvas.height / 2
        }

        this.velocity = {
            x: 2,
            y: 2
        }
        this.radius = 5
    }

    update(){
        this.draw()

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if(
            this.position.y - this.radius <= 0 ||
            this.position.y + this.radius >= canvas.height
        ){
            this.velocity.y = -this.velocity.y
        }

        if(this.position.x + this.radius >= canvas.width){
            this.resetBall("left")
            playerScore++
            playerScoreDisplay.textContent = playerScore
        }

        if(this.position.x - this.radius <= 0){
            this.resetBall("right")
            enemyScore++
            enemyScoreDisplay.textContent = enemyScore
        }

        
        if(
            this.position.x - this.radius <= player.position.x + player.width &&
            this.position.x + this.radius >= player.position.x &&
            this.position.y - this.radius >= player.position.y &&
            this.position.y + this.radius <= player.position.y + player.height
        ){
            this.velocity.x = -this.velocity.x * 1.1
            this.velocity.y *= 1.1
        }

        if(
            this.position.x + this.radius >= enemy.position.x &&
            this.position.x - this.radius <= enemy.position.x + enemy.width &&
            this.position.y - this.radius >= enemy.position.y &&
            this.position.y + this.radius <= enemy.position.y + enemy.height
        ){
            this.velocity.x = -this.velocity.x * 1.1
            this.velocity.y *= 1.1
        }
    }

    draw(){
        c.beginPath()
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2,false)
        c.fillStyle = "darkblue"
        c.fill()
        c.closePath()
    }

    resetBall(xVelo){
        this.position.x = canvas.width / 2
        this.position.y = canvas.height / 2
        this.velocity.x = 0
        this.velocity.y = 0
        setTimeout(() =>{
            this.velocity.y = Math.random() * 2 + 1
            this.velocity.x = xVelo === "left" ? Math.random() * 2 + 1 : Math.random() * -2 - 1
        }, 1000)
    }
}


const player = new Board(30, canvas.height / 2 - 100 / 2)
const enemy = new Board(canvas.width - 60, canvas.height / 2 - 100 / 2)
const ball = new Ball()

const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    up:{
        pressed: false
    },
    down: {
        pressed: false
    }
}

function animate(){
    if(!isPaused){
        requestAnimationFrame(animate)
    c.fillStyle = "white"
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    enemy.update()
    ball.update()


    if(keys.w.pressed && player.position.y >= 0){
        player.velocity = -7
    }else if(keys.s.pressed && player.position.y + player.height <= canvas.height){
        player.velocity = 7
    }else{
        player.velocity = 0
    }

    if(keys.up.pressed && enemy.position.y >= 0){
        enemy.velocity = -7
    }else if(keys.down.pressed && enemy.position.y + enemy.height <= canvas.height){
        enemy.velocity = 7
    }else{
        enemy.velocity = 0
    }
    }
    
}

animate()

window.addEventListener("keydown", function(e){
    switch(e.key){
        case "w":
            keys.w.pressed = true
            break
        case "s":
            keys.s.pressed = true
            break 
        case "ArrowUp":
            keys.up.pressed = true
            break
        case "ArrowDown":
            keys.down.pressed = true
            break 
    }
})

window.addEventListener("keyup", function(e){
    switch(e.key){
        case "w":
            keys.w.pressed = false
            break
        case "s":
            keys.s.pressed = false
            break
        case "ArrowUp":
            keys.up.pressed = false
            break
        case "ArrowDown":
            keys.down.pressed = false
            break 
    }
})

function pauseGame(){
    isPaused = !isPaused
    animate()
}